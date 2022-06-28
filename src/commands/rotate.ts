import { addCommandToCurrentObject } from 'context'
import { isValidEasing } from 'isValidParams'
import { tryParseTimestamp } from 'tryParseTimestamp'
import { Command } from 'types/Command'
import { Easing } from 'types/Easing'
import { Timestamp } from 'types/Timestamp'
import { round } from 'utils/round'

/**
 * Change the amount an object is rotated from its original image, in radians, clockwise.
 *
 * @param startTime Time in milliseconds/timestamp indicate when the event will start.
 * @param endTime Time in milliseconds/timestamp indicate when the event will end.
 * @param startAngle Angle to rotate by in radians at the start of the animation.
 * @param endAngle Angle to rotate by in radians at the end of the animation.
 * @param easing How the command should "accelerate".
 */
export function rotate(
	startTime: number | Timestamp,
	endTime: number | Timestamp,
	startAngle: number,
	endAngle: number,
	easing: Easing = Easing.Linear
) {
	if (!isValidEasing(easing)) throw new Error(easing + ' is not a valid easing. Use `Easing` enum instead')

	addCommandToCurrentObject<Command>({
		__name__: 'Rotate',
		type: 'R',
		easing,
		startTime: tryParseTimestamp(startTime),
		endTime: tryParseTimestamp(endTime),
		startValue: round(startAngle),
		endValue: round(endAngle),
	})
}

/**
 * Shorthand command for `rotate` when `startTime` and `endTime` are equal.
 *
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * @param angle Angle to rotate by in radians at the given time.
 */
export function rotateAtTime(time: number | Timestamp, angle: number) {
	addCommandToCurrentObject<Command>({
		__name__: 'Rotate',
		type: 'R',
		easing: Easing.Linear,
		startTime: tryParseTimestamp(time),
		endTime: tryParseTimestamp(time),
		startValue: round(angle),
		endValue: round(angle),
	})
}
