import { isCommand, isParameterCommand, isLoopCommand, isTriggerCommand } from 'checkCommandType'
import { Color } from 'types/Color'
import { Command, ParameterCommand, LoopCommand, TriggerCommand } from 'types/Command'
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
		.join('\n')
}

export function getCommandOsb({ type, startTime, endTime, startValue, endValue, easing }: Command, depth: 1 | 2): string {
	function isValueVector2(value: number | Vector2 | Color): value is Vector2 {
		return type === 'M' || type === 'V'
	}

	function isValueColor(value: number | Vector2 | Color): value is Color {
		return type === 'C'
	}

	if (isValueColor(startValue) && isValueColor(endValue)) {
		return [
			depth === 1 ? ' ' : '  ',
			type,
			startTime,
			endTime,
			startValue.r,
			startValue.g,
			startValue.b,
			endValue.r,
			endValue.g,
			endValue.b,
			easing,
		].join(',')
	} else if (isValueVector2(startValue) && isValueVector2(endValue)) {
		return [type, startTime, endTime, startValue.x, startValue.y, endValue.x, endValue.y, easing].join(',').concat('\n')
	} else {
		return [type, startTime, endTime, startValue, endValue, easing].join(',').concat('\n')
	}
}

export function getParameterCommandOsb(parameterCommand: ParameterCommand, depth: 1 | 2): string {
	const { type, easing, startTime, endTime, parameter } = parameterCommand

	return [depth === 1 ? ' ' : '  ', type, easing, startTime, endTime, parameter].join(',')
}

export function getLoopCommandOsb(loopCommand: LoopCommand): string {
	const { type, startTime, count, commands } = loopCommand

	return [type, startTime, count].join(',').concat('\n').concat(getCommandsOsb(commands, 2))
}

export function getTriggerCommandOsb(triggerCommand: TriggerCommand): string {
	const { type, triggerName, startTime, endTime, commands } = triggerCommand

	return [type, triggerName, startTime, endTime].join(',').concat('\n').concat(getCommandsOsb(commands, 2))
}
