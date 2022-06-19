import { addCommandToCurrentObject } from 'src/context'
import { tryParseTimestamp } from 'src/tryParseTimestamp'
import { Command } from 'src/types/Command'
import { Easing } from 'src/types/Easing'
import { Timestamp } from 'src/types/Timestamp'
import { Vector2 } from 'src/types/Vector2'

/**
 * Change the size of the object relative to its original size, but X and Y scale separately.
 *
 * @param startTime Time in milliseconds/timestamp indicate when the event will start.
 * @param endTime Time in milliseconds/timestamp indicate when the event will end.
 * @param startScale Scale vector at the start of the animation.
 * @param endScale Scale vector at the end of the animation.
 * @param easing How the command should "accelerate".
 */
export function scaleVec(
	startTime: number | Timestamp,
	endTime: number | Timestamp,
	startScale: Vector2,
	endScale: Vector2,
	easing: Easing = Easing.Linear
) {
	addCommandToCurrentObject<Command>({
		__name__: 'Scale',
		type: 'V',
		easing,
		startTime: tryParseTimestamp(startTime),
		endTime: tryParseTimestamp(endTime),
		startValue: startScale,
		endValue: endScale,
	})
}

/**
 * Shorthand command for `ScaleVec` when `startTime` and `endTime` are equal.
 *
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * @param scale Scale vector at the given time.
 */
export function scaleVecAtTime(time: number | Timestamp, position: Vector2) {
	addCommandToCurrentObject<Command>({
		__name__: 'Scale',
		type: 'V',
		easing: Easing.Linear,
		startTime: tryParseTimestamp(time),
		endTime: tryParseTimestamp(time),
		startValue: position,
		endValue: position,
	})
}
