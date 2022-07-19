import { addCommandToCurrentObject } from 'context'
import { isValidEasing } from 'isValidParams'
import { tryParseTimestamp } from 'tryParseTimestamp'
import { Command } from 'types/Command'
import { NumericCommandValue, TimeValue } from 'types/CommandValue'
import { Easing } from 'types/Easing'
import { round } from 'utils/round'

/**
 * Change the size of the object relative to its original size.
 *
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * Pass in [startTime, endTime] if you want to make the object scales overtime.
 * @param scaleFactor Scale factor at the given time.
 * Pass in [startValue, endValue] if you want to make the object scales overtime.
 * @param easing How the command should "accelerate".
 */
export function scale(time: TimeValue, scaleFactor: NumericCommandValue, easing?: Easing) {
	let startTime: number, endTime: number, startValue: number, endValue: number

	if (scaleFactor instanceof Array) {
		if (!(time instanceof Array)) throw new Error('A value cannot be changed if start time and end time are equal.')
		startValue = scaleFactor[0]
		endValue = scaleFactor[1]

		if (typeof startValue != 'number') throw new Error('`startValue` must be a number.')
		if (typeof endValue != 'number') throw new Error('`endValue` must be a number.')

		startValue = round(startValue)
		endValue = round(endValue)
	} else {
		if (typeof scaleFactor != 'number') throw new Error('`scaleFactor` must be a number, or an array consists of 2 numbers.')

		startValue = endValue = round(scaleFactor)
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
		__name__: 'Scale',
		type: 'S',
		easing,
		startTime,
		endTime,
		startValue,
		endValue,
	})
}
