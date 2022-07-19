import { addCommandToCurrentObject } from 'context'
import { isValidEasing, isValidVector2 } from 'isValidParams'
import { tryParseTimestamp } from 'tryParseTimestamp'
import { Command } from 'types/Command'
import { TimeValue, Vector2CommandValue } from 'types/CommandValue'
import { Easing } from 'types/Easing'
import { Vector2 } from 'types/Vector2'
import { roundVec } from 'utils/round'

/**
 * Change the location of the object in the play area.
 *
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * Pass in [startTime, endTime] if you want to make the location of the object changes overtime.
 * @param position Position at the given time.
 * Pass in [startValue, endValue] if you want to make the location of the object changes overtime.
 * @param easing How the command should "accelerate".
 */
export function move(time: TimeValue, position: Vector2CommandValue, easing?: Easing) {
	let startTime: number, endTime: number, startValue: Vector2, endValue: Vector2

	if (position instanceof Array) {
		if (!(time instanceof Array)) throw new Error('A value cannot be changed if start time and end time are equal.')
		startValue = position[0]
		endValue = position[1]

		if (!isValidVector2(startValue)) throw new Error('`startValue` is not a valid `Vector2` object.')
		if (!isValidVector2(endValue)) throw new Error('`endValue` is not a valid `Vector2` object.')

		startValue = roundVec(startValue)
		endValue = roundVec(endValue)
	} else {
		if (!isValidVector2(position)) throw new Error('`position` must be a valid `Vector2` object, or an array consists of 2 `Vector2` objects.')

		startValue = endValue = roundVec(position)
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
		__name__: 'Move',
		type: 'M',
		easing,
		startTime,
		endTime,
		startValue,
		endValue,
	})
}
