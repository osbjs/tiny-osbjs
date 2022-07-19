import { addCommandToCurrentObject } from 'context'
import { tryParseTimestamp } from 'tryParseTimestamp'
import { Parameter, ParameterCommand } from 'types/Command'
import { Easing } from 'types/Easing'

/**
 * Unlike the other commands, which can be seen as setting endpoints along continually-tracked values,
 * the `parameter` command apply ONLY while they are active,
 * i.e.,you can't put a command from timestamps 1000 to 2000 and expect the value to apply at time 3000,
 * even if the object's other commands aren't finished by that point.
 *
 * @param startTime Time in milliseconds/timestamp indicate when the event will start.
 * @param endTime Time in milliseconds/timestamp indicate when the event will end.
 * @param parameter `Parameter` to apply.
 */
function parameter(startTime: number, endTime: number, parameter: Parameter) {
	addCommandToCurrentObject<ParameterCommand>({
		__name__: 'Parameter',
		type: 'P',
		easing: Easing.Linear,
		startTime: tryParseTimestamp(startTime),
		endTime: tryParseTimestamp(endTime),
		parameter,
	})
}

/**
 * Use additive-colour blending instead of alpha-blending.
 * @param startTime Time in milliseconds/timestamp indicate when the event will start.
 * @param endTime Time in milliseconds/timestamp indicate when the event will end.
 */
export function additiveBlending(startTime: number, endTime: number) {
	parameter(startTime, endTime, Parameter.AdditiveBlending)
}

/**
 * Flip the image horizontally.
 * @param startTime Time in milliseconds/timestamp indicate when the event will start.
 * @param endTime Time in milliseconds/timestamp indicate when the event will end.
 */
export function flipHorizontal(startTime: number, endTime: number) {
	parameter(startTime, endTime, Parameter.FlipHorizontal)
}

/**
 * Flip the image vertically.
 * @param startTime Time in milliseconds/timestamp indicate when the event will start.
 * @param endTime Time in milliseconds/timestamp indicate when the event will end.
 */
export function flipVertical(startTime: number, endTime: number) {
	parameter(startTime, endTime, Parameter.FlipVertical)
}
