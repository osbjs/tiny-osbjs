import { isCommand, isLoopCommand, isParameterCommand, isTriggerCommand } from 'checkCommandType'
import { Color } from 'types/Color'
import { Command, LoopCommand, ParameterCommand, TriggerCommand } from 'types/Command'
import { Vector2 } from 'types/Vector2'

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

export function getCommandOsb({ type, startTime, endTime, startValue, endValue, easing }: Command, depth: 1 | 2): string {
	function isValueVector2(value: number | Vector2 | Color): value is Vector2 {
		return type === 'M' || type === 'V'
	}

	function isValueColor(value: number | Vector2 | Color): value is Color {
		return type === 'C'
	}

	const prefix = depth === 1 ? ' ' : '  '

	if (isValueColor(startValue) && isValueColor(endValue)) {
		const endValueStr =
			startValue.r === endValue.r && startValue.g === endValue.g && startValue.b === endValue.b
				? ''
				: `,${endValue.r},${endValue.g},${endValue.b}`

		return (
			prefix +
			[type, easing, startTime, endTime === startTime ? '' : endTime, startValue.r, startValue.g, startValue.b].join(',') +
			endValueStr +
			'\n'
		)
	} else if (isValueVector2(startValue) && isValueVector2(endValue)) {
		const endValueStr = startValue.x === endValue.x && startValue.y === endValue.y ? '' : `,${endValue.x},${endValue.y}`

		return prefix + [type, easing, startTime, endTime === startTime ? '' : endTime, startValue.x, startValue.y].join(',') + endValueStr + '\n'
	} else {
		const endValueStr = startValue === endValue ? '' : `,${endValue}`

		return prefix + [type, easing, startTime, endTime === startTime ? '' : endTime, startValue].join(',') + endValueStr + '\n'
	}
}

export function getParameterCommandOsb(parameterCommand: ParameterCommand, depth: 1 | 2): string {
	const { type, easing, startTime, endTime, parameter } = parameterCommand

	return depth === 1 ? ' ' : '  ' + [type, easing, startTime, endTime, parameter].join(',')
}

export function getLoopCommandOsb(loopCommand: LoopCommand): string {
	const { type, startTime, count, commands } = loopCommand

	return ' ' + [type, startTime, count].join(',') + '\n' + getCommandsOsb(commands, 2)
}

export function getTriggerCommandOsb(triggerCommand: TriggerCommand): string {
	const { type, triggerType: triggerName, startTime, endTime, commands } = triggerCommand

	return ' ' + [type, triggerName, startTime, endTime].join(',') + '\n' + getCommandsOsb(commands, 2)
}
