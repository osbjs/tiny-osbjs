import { addCommandToCurrentObject } from 'src/context'
import { tryParseTimestamp } from 'src/tryParseTimestamp'
import { Command } from 'src/types/Command'
import { Easing } from 'src/types/Easing'
import { Timestamp } from 'src/types/Timestamp'

/**
 * Change the opacity of the object.
 *
 * @param startTime Time in milliseconds/timestamp indicate when the event will start.
 * @param endTime Time in milliseconds/timestamp indicate when the event will end.
 * @param startOpacity Opacity at the start of the animation.
 * @param endOpacity Opacity at the end of the animation.
 * @param easing How the command should "accelerate".
 */
export function fade(
	startTime: number | Timestamp,
	endTime: number | Timestamp,
	startOpacity: number,
	endOpacity: number,
	easing: Easing = Easing.Linear
) {
	addCommandToCurrentObject<Command>({
		__name__: 'Fade',
		type: 'F',
		easing,
		startTime: tryParseTimestamp(startTime),
		endTime: tryParseTimestamp(endTime),
		startValue: startOpacity,
		endValue: endOpacity,
	})
}

/**
 * Shorthand command for `fade` when `startTime` and `endTime` are equal.
 *
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * @param opacity Opacity at the given time.
 */
export function fadeAtTime(time: number | Timestamp, opacity: number) {
	addCommandToCurrentObject<Command>({
		__name__: 'Fade',
		type: 'F',
		easing: Easing.Linear,
		startTime: tryParseTimestamp(time),
		endTime: tryParseTimestamp(time),
		startValue: opacity,
		endValue: opacity,
	})
}
