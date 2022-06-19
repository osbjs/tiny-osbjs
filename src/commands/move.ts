import { addCommandToCurrentObject } from 'context'
import { isValidEasing } from 'isValidParams'
import { tryParseTimestamp } from 'tryParseTimestamp'
import { Command } from 'types/Command'
import { Easing } from 'types/Easing'
import { Timestamp } from 'types/Timestamp'
import { Vector2 } from 'types/Vector2'

/**
 * Change the location of the object in the play area.
 *
 * @param startTime Time in milliseconds/timestamp indicate when the event will start.
 * @param endTime Time in milliseconds/timestamp indicate when the event will end.
 * @param startPosition Position at the start of the animation.
 * @param endPosition Position at the end of the animation.
 * @param easing How the command should "accelerate".
 */
export function move(
	startTime: number | Timestamp,
	endTime: number | Timestamp,
	startPosition: Vector2,
	endPosition: Vector2,
	easing: Easing = Easing.Linear
) {
	if (!isValidEasing(easing)) throw new Error(easing + ' is not a valid easing. Use `Easing` enum instead')

	addCommandToCurrentObject<Command>({
		__name__: 'Move',
		type: 'M',
		easing,
		startTime: tryParseTimestamp(startTime),
		endTime: tryParseTimestamp(endTime),
		startValue: startPosition,
		endValue: endPosition,
	})
}

/**
 * Shorthand command for `move` when `startTime` and `endTime` are equal.
 *
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * @param position Position at the given time.
 */
export function moveAtTime(time: number | Timestamp, position: Vector2) {
	addCommandToCurrentObject<Command>({
		__name__: 'Move',
		type: 'M',
		easing: Easing.Linear,
		startTime: tryParseTimestamp(time),
		endTime: tryParseTimestamp(time),
		startValue: position,
		endValue: position,
	})
}
