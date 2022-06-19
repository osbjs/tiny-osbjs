import { addCommandToCurrentObject } from 'context'
import { tryParseTimestamp } from 'tryParseTimestamp'
import { Command } from 'types/Command'
import { Easing } from 'types/Easing'
import { Timestamp } from 'types/Timestamp'

/**
 * Change the size of the object relative to its original size.
 *
 * @param startTime Time in milliseconds/timestamp indicate when the event will start.
 * @param endTime Time in milliseconds/timestamp indicate when the event will end.
 * @param startScale Scale factor at the start of the animation.
 * @param endScale Scale factor at the end of the animation.
 * @param easing How the command should "accelerate".
 */
export function scale(
	startTime: number | Timestamp,
	endTime: number | Timestamp,
	startScale: number,
	endScale: number,
	easing: Easing = Easing.Linear
) {
	addCommandToCurrentObject<Command>({
		__name__: 'Scale',
		type: 'S',
		easing,
		startTime: tryParseTimestamp(startTime),
		endTime: tryParseTimestamp(endTime),
		startValue: startScale,
		endValue: endScale,
	})
}

/**
 * Shorthand command for `scale` when `startTime` and `endTime` are equal.
 *
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * @param scale Scale factor at the given time.
 */
export function scaleAtTime(time: number | Timestamp, scale: number) {
	addCommandToCurrentObject<Command>({
		__name__: 'Scale',
		type: 'S',
		easing: Easing.Linear,
		startTime: tryParseTimestamp(time),
		endTime: tryParseTimestamp(time),
		startValue: scale,
		endValue: scale,
	})
}
