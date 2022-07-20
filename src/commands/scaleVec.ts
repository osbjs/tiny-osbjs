import { addCommandToCurrentObject } from 'context'
import { Command } from 'types/Command'
import { Easing } from 'types/Easing'
import { TimePair } from 'types/TimePair'
import { Time } from 'types/Timestamp'
import { Vector2 } from 'types/Vector2'
import { defaultEasingIfUndefined, validateAndExtractTime, validateVector2Arguments } from './utils/extractCommandArguments'

/**
 * Change the size of the object relative to its original size, but X and Y scale separately.
 *
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * Pass in [startTime, endTime] if you want to make the object scales overtime.
 * @param startScaleVector Scale factor at the start of the animation.
 * @param endScaleVector Scale factor at the end of the animation.
 * @param easing How the command should "accelerate".
 */
export function scaleVec(time: Time | TimePair, startScaleVector: Vector2, endScaleVector: Vector2 = startScaleVector, easing?: Easing) {
	const [startTime, endTime] = validateAndExtractTime(time)
	const [startValue, endValue] = validateVector2Arguments(startScaleVector, endScaleVector, 'ScaleVector')

	addCommandToCurrentObject<Command>({
		__name__: 'ScaleVec',
		type: 'V',
		easing: defaultEasingIfUndefined(easing),
		startTime,
		endTime,
		startValue,
		endValue,
	})
}
