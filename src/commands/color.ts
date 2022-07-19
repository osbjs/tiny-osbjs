import { addCommandToCurrentObject } from 'context'
import { isValidColor, isValidEasing } from 'isValidParams'
import { tryParseTimestamp } from 'tryParseTimestamp'
import { Color } from 'types/Color'
import { Command } from 'types/Command'
import { ColorCommandValue, TimeValue } from 'types/CommandValue'
import { Easing } from 'types/Easing'
import { roundColor } from 'utils/round'

/**
 * The virtual light source colour on the object. The colours of the pixels on the object are determined subtractively.
 *
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * Pass in [startTime, endTime] if you want to make the color changes overtime.
 * @param color Color at the given time.
 * Pass in [startValue, endValue] if you want to make the color changes overtime.
 * Sprites with (255,255,255) will be their original colour and sprites with (0,0,0) will be totally black.
 * Anywhere in between will result in subtractive colouring.
 * @param easing How the command should "accelerate".
 */
export function color(time: TimeValue, color: ColorCommandValue, easing?: Easing) {
	let startTime: number, endTime: number, startValue: Color, endValue: Color

	if (color instanceof Array) {
		if (!(time instanceof Array)) throw new Error('A value cannot be changed if start time and end time are equal.')
		startValue = color[0]
		endValue = color[1]

		if (!isValidColor(startValue)) throw new Error('`startValue` is not a valid `Color` object.')
		if (!isValidColor(endValue)) throw new Error('`endValue` is not a valid `Color` object.')

		startValue = roundColor(startValue)
		endValue = roundColor(endValue)
	} else {
		if (!isValidColor(color)) throw new Error('`color` must be a valid `Color` object, or an array consists of 2 `Color` objects.')

		startValue = endValue = color
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
		__name__: 'Color',
		type: 'C',
		easing,
		startTime,
		endTime,
		startValue,
		endValue,
	})
}
