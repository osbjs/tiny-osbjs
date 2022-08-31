import { addCommandToCurrentObject } from 'context'
import { Command } from 'types/Command'
import { Easing } from 'types/Easing'
import { TimeRange } from 'types/TimeRange'
import { Time } from 'types/Timestamp'
import { defaultEasingIfUndefined, validateAndExtractTime, validateNumericArguments } from './utils/extractCommandArguments'

/**
 * Change the Y coordinate of the object.
 *
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * Pass in [startTime, endTime] if you want to make the Y coordinate of the object changes overtime.
 * @param startY Y coordinate at the start of the animation.
 * @param endY Y coordinate at the end of the animation.
 * @param easing How the command should "accelerate".
 */
export function moveY(time: Time | TimeRange, startY: number, endY: number = startY, easing?: Easing) {
	const [startTime, endTime] = validateAndExtractTime(time)
	const [startValue, endValue] = validateNumericArguments(startY, endY, 'Y')

	addCommandToCurrentObject<Command>({
		__name__: 'MoveY',
		type: 'MY',
		easing: defaultEasingIfUndefined(easing),
		startTime,
		endTime,
		startValue,
		endValue,
	})
}
