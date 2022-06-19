import { addCommandToCurrentObject } from 'src/context'
import { tryParseTimestamp } from 'src/tryParseTimestamp'
import { Command } from 'src/types/Command'
import { Easing } from 'src/types/Easing'
import { Timestamp } from 'src/types/Timestamp'

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
	addCommandToCurrentObject<Command>({
		__name__: 'Rotate',
		type: 'R',
		easing,
		startTime: tryParseTimestamp(startTime),
		endTime: tryParseTimestamp(endTime),
		startValue: startAngle,
		endValue: endAngle,
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
		startValue: angle,
		endValue: angle,
	})
}
