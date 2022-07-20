import { addCommandToCurrentObject } from 'context'
import { Command } from 'types/Command'
import { Easing } from 'types/Easing'
import { TimePair } from 'types/TimePair'
import { Time } from 'types/Timestamp'
import { defaultEasingIfUndefined, validateAndExtractTime, validateNumericArguments } from './utils/extractCommandArguments'

/**
 * Change the amount an object is rotated from its original image, in radians, clockwise.
 *
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * Pass in [startTime, endTime] if you want to make the object rotates overtime.
 * @param startAngle Angle to rotate by in radians at the start of the animation.
 * @param endAngle Angle to rotate by in radians at the end of the animation.
 * @param easing How the command should "accelerate".
 */
export function rotate(time: Time | TimePair, startAngle: number, endAngle: number = startAngle, easing?: Easing) {
	const [startTime, endTime] = validateAndExtractTime(time)
	const [startValue, endValue] = validateNumericArguments(startAngle, endAngle, 'Angle')

	addCommandToCurrentObject<Command>({
		__name__: 'Rotate',
		type: 'R',
		easing: defaultEasingIfUndefined(easing),
		startTime,
		endTime,
		startValue,
		endValue,
	})
}
