import { addCommandToCurrentObject } from 'src/context'
import { tryParseTimestamp } from 'src/tryParseTimestamp'
import { Color } from 'src/types/Color'
import { Command } from 'src/types/Command'
import { Easing } from 'src/types/Easing'
import { Timestamp } from 'src/types/Timestamp'

/**
 * The virtual light source colour on the object. The colours of the pixels on the object are determined subtractively.
 *
 * @param startTime Time in milliseconds/timestamp indicate when the event will start.
 * @param endTime Time in milliseconds/timestamp indicate when the event will end.
 * @param startColor Color at the start of the animation.
 * Sprites with (255,255,255) will be their original colour and sprites with (0,0,0) will be totally black.
 * Anywhere in between will result in subtractive colouring.
 * @param endColor Color at the start of the animation.
 * Sprites with (255,255,255) will be their original colour and sprites with (0,0,0) will be totally black.
 * Anywhere in between will result in subtractive colouring.
 * @param easing How the command should "accelerate".
 */
export function color(
	startTime: number | Timestamp,
	endTime: number | Timestamp,
	startColor: Color,
	endColor: Color,
	easing: Easing = Easing.Linear
) {
	addCommandToCurrentObject<Command>({
		__name__: 'Color',
		type: 'C',
		easing,
		startTime: tryParseTimestamp(startTime),
		endTime: tryParseTimestamp(endTime),
		startValue: startColor,
		endValue: endColor,
	})
}

/**
 * Shorthand command for `color` when `startTime` and `endTime` are equal.
 *
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * @param color Color at the given time.
 * Sprites with (255,255,255) will be their original colour and sprites with (0,0,0) will be totally black.
 * Anywhere in between will result in subtractive colouring.
 */
export function colorAtTime(time: number | Timestamp, color: Color) {
	addCommandToCurrentObject<Command>({
		__name__: 'Color',
		type: 'C',
		easing: Easing.Linear,
		startTime: tryParseTimestamp(time),
		endTime: tryParseTimestamp(time),
		startValue: color,
		endValue: color,
	})
}
