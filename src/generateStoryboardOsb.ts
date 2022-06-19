import { isCommand, isParameterCommand, isLoopCommand, isTriggerCommand } from './checkCommandType'
import { isSprite, isAnimation, isSample } from './checkObjectType'
import { getObjects } from './context'
import { Animation } from './createAnimation'
import { Sample } from './createSample'
import { Sprite } from './createSprite'
import { Color } from './types/Color'
import { Command, LoopCommand, ParameterCommand, TriggerCommand } from './types/Command'
import { Vector2 } from './types/Vector2'

/**
 * Generated osb string
 */
export function generateStoryboardOsb(): string {
	return getObjects()
		.map((object) =>
			isSprite(object) ? getSpriteOsb(object) : isAnimation(object) ? getAnimationOsb(object) : isSample(object) ? getSampleOsb(object) : ''
		)
		.join('\n')
}

export function getSpriteOsb({ type, layer, origin, path, initialPosition, commands }: Sprite): string {
	return [type, layer, origin, `"${path}"`, initialPosition.x, initialPosition.y].join(',').concat('\n').concat(translateCommandsToOsb(commands))
}

export function getAnimationOsb({ type, layer, origin, path, initialPosition, commands, frameCount, frameDelay, loopType }: Animation): string {
	return [type, layer, origin, `"${path}"`, initialPosition.x, initialPosition.y, frameCount, frameDelay, loopType]
		.join(',')
		.concat('\n')
		.concat(translateCommandsToOsb(commands))
}

export function getSampleOsb({ type, layer, path, volume, startTime }: Sample): string {
	return [type, startTime, layer, `"${path}"`, volume].join(',').concat('\n')
}

export function translateCommandsToOsb(commands: (Command | ParameterCommand | LoopCommand | TriggerCommand)[], depth: 1 | 2 = 1): string {
	return commands
		.map((command) =>
			isCommand(command)
				? translateCommandToOsb(command, depth)
				: isParameterCommand(command)
				? translateParameterCommandToOsb(command, depth)
				: isLoopCommand(command)
				? translateLoopCommandToOsb(command)
				: isTriggerCommand(command)
				? translateTriggerCommandToOsb(command)
				: ''
		)
		.join('\n')
}

export function translateCommandToOsb({ type, startTime, endTime, startValue, endValue, easing }: Command, depth: 1 | 2): string {
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

export function translateParameterCommandToOsb(parameterCommand: ParameterCommand, depth: 1 | 2): string {
	const { type, easing, startTime, endTime, parameter } = parameterCommand

	return [depth === 1 ? ' ' : '  ', type, easing, startTime, endTime, parameter].join(',')
}

export function translateLoopCommandToOsb(loopCommand: LoopCommand): string {
	const { type, startTime, count, commands } = loopCommand

	return [type, startTime, count].join(',').concat('\n').concat(translateCommandsToOsb(commands, 2))
}

export function translateTriggerCommandToOsb(triggerCommand: TriggerCommand): string {
	const { type, triggerName, startTime, endTime, commands } = triggerCommand

	return [type, triggerName, startTime, endTime].join(',').concat('\n').concat(translateCommandsToOsb(commands, 2))
}
