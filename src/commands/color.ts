import { addCommandToCurrentObject } from 'context'
import { Color } from 'types/Color'
import { Command } from 'types/Command'
import { Easing } from 'types/Easing'
import { TimePair } from 'types/TimePair'
import { Time } from 'types/Timestamp'
import { defaultEasingIfUndefined, validateAndExtractTime, validateColorArguments } from './utils/extractCommandArguments'

/**
 * The virtual light source colour on the object. The colours of the pixels on the object are determined subtractively.
 * Sprites with [255,255,255] will be their original colour and sprites with [0,0,0] will be totally black.
 * Anywhere in between will result in subtractive colouring.
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * Pass in [startTime, endTime] if you want to make the color changes overtime.
 * @param startColor Color at the start of the animation.
 * A valid Color is an array contains 3 numbers [r,g,b] respectively.
 * @param endColor Color at the end of the animation.
 * A valid Color is an array contains 3 numbers [r,g,b] respectively.
 * @param easing How the command should "accelerate".
 */
export function color(time: Time | TimePair, startColor: Color, endColor: Color = startColor, easing?: Easing) {
	const [startTime, endTime] = validateAndExtractTime(time)
	const [startValue, endValue] = validateColorArguments(startColor, endColor)

	addCommandToCurrentObject<Command>({
		__name__: 'Color',
		type: 'C',
		easing: defaultEasingIfUndefined(easing),
		startTime,
		endTime,
		startValue,
		endValue,
	})
}
