import { addCommandToCurrentObject } from 'context'
import { isValidEasing } from 'isValidParams'
import { tryParseTimestamp } from 'tryParseTimestamp'
import { Command } from 'types/Command'
import { Easing } from 'types/Easing'
import { Timestamp } from 'types/Timestamp'

/**
 * Change the Y coordinate of the object.
 *
 * @param startTime Time in milliseconds/timestamp indicate when the event will start.
 * @param endTime Time in milliseconds/timestamp indicate when the event will end.
 * @param startY Y coordinate at the start of the animation.
 * @param endY Y coordinate at the end of the animation.
 * @param easing How the command should "accelerate".
 */
export function moveY(startTime: number | Timestamp, endTime: number | Timestamp, startY: number, endY: number, easing: Easing = Easing.Linear) {
	if (!isValidEasing(easing)) throw new Error(easing + ' is not a valid easing. Use `Easing` enum instead')

	addCommandToCurrentObject<Command>({
		__name__: 'MoveX',
		type: 'MY',
		easing,
		startTime: tryParseTimestamp(startTime),
		endTime: tryParseTimestamp(endTime),
		startValue: startY,
		endValue: endY,
	})
}

/**
 * Shorthand command for `moveY` when `startTime` and `endTime` are equal.
 *
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * @param y Y coordinate at the given time.
 */
export function moveYAtTime(time: number | Timestamp, y: number) {
	if (typeof y != 'number') throw new TypeError('y must be number.')

	addCommandToCurrentObject<Command>({
		__name__: 'MoveX',
		type: 'MY',
		easing: Easing.Linear,
		startTime: tryParseTimestamp(time),
		endTime: tryParseTimestamp(time),
		startValue: y,
		endValue: y,
	})
}
