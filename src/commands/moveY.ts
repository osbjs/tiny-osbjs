import { addCommandToCurrentObject } from 'context'
import { isValidEasing } from 'isValidParams'
import { tryParseTimestamp } from 'tryParseTimestamp'
import { Command } from 'types/Command'
import { NumericCommandValue, TimeValue } from 'types/CommandValue'
import { Easing } from 'types/Easing'
import { round } from 'utils/round'

/**
 * Change the Y coordinate of the object.
 *
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * Pass in [startTime, endTime] if you want to make the Y coordinate of the object changes overtime.
 * @param y Y coordinate at the given time.
 * Pass in [startValue, endValue] if you want to make the Y coordinate of the object changes overtime.
 * @param easing How the command should "accelerate".
 */
export function moveY(time: TimeValue, y: NumericCommandValue, easing?: Easing) {
	let startTime: number, endTime: number, startValue: number, endValue: number

	if (y instanceof Array) {
		if (!(time instanceof Array)) throw new Error('A value cannot be changed if start time and end time are equal.')
		startValue = y[0]
		endValue = y[1]

		if (typeof startValue != 'number') throw new Error('`startValue` must be a number.')
		if (typeof endValue != 'number') throw new Error('`endValue` must be a number.')

		startValue = round(startValue)
		endValue = round(endValue)
	} else {
		if (typeof y != 'number') throw new Error('`y` must be a number, or an array consists of 2 numbers.')

		startValue = endValue = round(y)
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
		__name__: 'MoveX',
		type: 'MY',
		easing,
		startTime,
		endTime,
		startValue,
		endValue,
	})
}
