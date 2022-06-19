import { addCommandToCurrentObject } from 'src/context'
import { tryParseTimestamp } from 'src/tryParseTimestamp'
import { Command } from 'src/types/Command'
import { Easing } from 'src/types/Easing'
import { Timestamp } from 'src/types/Timestamp'

/**
 * Change the X coordinate of the object.
 *
 * @param startTime Time in milliseconds/timestamp indicate when the event will start.
 * @param endTime Time in milliseconds/timestamp indicate when the event will end.
 * @param startX X coordinate at the start of the animation.
 * @param endX X coordinate at the end of the animation.
 * @param easing How the command should "accelerate".
 */
export function moveX(startTime: number | Timestamp, endTime: number | Timestamp, startX: number, endX: number, easing: Easing = Easing.Linear) {
	addCommandToCurrentObject<Command>({
		__name__: 'MoveX',
		type: 'MX',
		easing,
		startTime: tryParseTimestamp(startTime),
		endTime: tryParseTimestamp(endTime),
		startValue: startX,
		endValue: endX,
	})
}

/**
 * Shorthand command for `moveX` when `startTime` and `endTime` are equal.
 *
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * @param x X coordinate at the given time.
 */
export function moveXAtTime(time: number | Timestamp, x: number) {
	addCommandToCurrentObject<Command>({
		__name__: 'MoveX',
		type: 'MX',
		easing: Easing.Linear,
		startTime: tryParseTimestamp(time),
		endTime: tryParseTimestamp(time),
		startValue: x,
		endValue: x,
	})
}
