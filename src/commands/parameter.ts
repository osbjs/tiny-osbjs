import { addCommandToCurrentObject } from 'context'
import { Parameter, ParameterCommand } from 'types/Command'
import { TimePair } from 'types/CommandValue'
import { Easing } from 'types/Easing'
import { validateAndExtractTime } from './utils/extractCommandArguments'

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
		startTime,
		endTime,
		parameter,
	})
}

/**
 * Use additive-colour blending instead of alpha-blending.
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * Pass in [startTime, endTime] if you want the effect to only apply during a specific period.
 */
export function additiveBlending(time: TimePair) {
	const [startTime, endTime] = validateAndExtractTime(time)

	parameter(startTime, endTime, Parameter.AdditiveBlending)
}

/**
 * Flip the image horizontally.
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * Pass in [startTime, endTime] if you want the effect to only apply during a specific period.
 */
export function flipHorizontal(time: TimePair) {
	const [startTime, endTime] = validateAndExtractTime(time)

	parameter(startTime, endTime, Parameter.FlipHorizontal)
}

/**
 * Flip the image vertically.
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * Pass in [startTime, endTime] if you want the effect to only apply during a specific period.
 */
export function flipVertical(time: TimePair) {
	const [startTime, endTime] = validateAndExtractTime(time)

	parameter(startTime, endTime, Parameter.FlipVertical)
}
