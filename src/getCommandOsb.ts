import { isCommand, isLoopCommand, isParameterCommand, isTriggerCommand } from 'checkCommandType'
import { isValidColor, isValidVector2 } from 'isValidParams'
import { Command, LoopCommand, ParameterCommand, TriggerCommand } from 'types/Command'

export function getCommandsOsb(commands: (Command | ParameterCommand | LoopCommand | TriggerCommand)[], depth: 1 | 2 = 1): string {
	return commands
		.map((command) =>
			isCommand(command)
				? getCommandOsb(command, depth)
				: isParameterCommand(command)
				? getParameterCommandOsb(command, depth)
				: isLoopCommand(command)
				? getLoopCommandOsb(command)
				: isTriggerCommand(command)
				? getTriggerCommandOsb(command)
				: ''
		)
		.join('')
}

export function getCommandOsb(command: Command, depth: 1 | 2): string {
	const { type, startTime, endTime, startValue, endValue, easing } = command
	const prefix = depth === 1 ? ' ' : '  '

	if (isValidColor(startValue) && isValidColor(endValue)) {
		const [startR, startG, startB] = startValue
		const [endR, endG, endB] = endValue

		const endValueStr = startR === endR && startG === endG && startB === endB ? '' : `,${endR},${endG},${endB}`

		return prefix + [type, easing, startTime, endTime === startTime ? '' : endTime, startR, startG, startB].join(',') + endValueStr + '\n'
	} else if (isValidVector2(startValue) && isValidVector2(endValue)) {
		const [startX, startY] = startValue
		const [endX, endY] = endValue

		const endValueStr = startX === endX && startY === endY ? '' : `,${endX},${endY}`

		return prefix + [type, easing, startTime, endTime === startTime ? '' : endTime, startX, startY].join(',') + endValueStr + '\n'
	} else {
		const endValueStr = startValue === endValue ? '' : `,${endValue}`

		return prefix + [type, easing, startTime, endTime === startTime ? '' : endTime, startValue].join(',') + endValueStr + '\n'
	}
}

export function getParameterCommandOsb(parameterCommand: ParameterCommand, depth: 1 | 2): string {
	const { type, easing, startTime, endTime, parameter } = parameterCommand

	return (depth === 1 ? ' ' : '  ') + [type, easing, startTime, endTime, parameter].join(',') + '\n'
}

export function getLoopCommandOsb(loopCommand: LoopCommand): string {
	const { type, startTime, count, commands } = loopCommand

	return ' ' + [type, startTime, count].join(',') + '\n' + getCommandsOsb(commands, 2)
}

export function getTriggerCommandOsb(triggerCommand: TriggerCommand): string {
	const { type, triggerType, startTime, endTime, commands } = triggerCommand

	return ' ' + [type, triggerType, startTime, endTime].join(',') + '\n' + getCommandsOsb(commands, 2)
}
