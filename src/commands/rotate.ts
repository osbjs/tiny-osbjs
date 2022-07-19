import { addCommandToCurrentObject } from 'context'
import { isValidEasing } from 'isValidParams'
import { tryParseTimestamp } from 'tryParseTimestamp'
import { Command } from 'types/Command'
import { NumericCommandValue, TimeValue } from 'types/CommandValue'
import { Easing } from 'types/Easing'
import { round } from 'utils/round'

/**
 * Change the amount an object is rotated from its original image, in radians, clockwise.
 *
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * Pass in [startTime, endTime] if you want to make the object rotates overtime.
 * @param angle Angle to rotate by in radians at the given time.
 * Pass in [startValue, endValue] if you want to make the object rotates overtime.
 * @param easing How the command should "accelerate".
 */
export function rotate(time: TimeValue, angle: NumericCommandValue, easing?: Easing) {
	let startTime: number, endTime: number, startValue: number, endValue: number

	if (angle instanceof Array) {
		if (!(time instanceof Array)) throw new Error('A value cannot be changed if start time and end time are equal.')
		startValue = angle[0]
		endValue = angle[1]

		if (typeof startValue != 'number') throw new Error('`startValue` must be a number.')
		if (typeof endValue != 'number') throw new Error('`endValue` must be a number.')

		startValue = round(startValue)
		endValue = round(endValue)
	} else {
		if (typeof angle != 'number') throw new Error('`angle` must be a number, or an array consists of 2 numbers.')

		startValue = endValue = round(angle)
	}

	if (time instanceof Array) {
		startTime = tryParseTimestamp(time[0])
		endTime = tryParseTimestamp(time[1])
	} else {
		startTime = endTime = tryParseTimestamp(time)
	}

	if (typeof easing == 'undefined') easing = Easing.Linear

	if (!isValidEasing(easing)) throw new Error(easing + ' is not a valid easing. Use `Easing` enum instead')

	addCommandToCurrentObject<Command>({
		__name__: 'Rotate',
		type: 'R',
		easing,
		startTime,
		endTime,
		startValue,
		endValue,
	})
}
