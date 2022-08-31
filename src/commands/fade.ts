import { addCommandToCurrentObject } from 'context'
import { Command } from 'types/Command'
import { Easing } from 'types/Easing'
import { TimeRange } from 'types/TimeRange'
import { Time } from 'types/Timestamp'
import { defaultEasingIfUndefined, validateAndExtractTime, validateNumericArguments } from './utils/extractCommandArguments'

/**
 * Change the opacity of the object.
 *
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * Pass in [startTime, endTime] if you want to make the opacity changes overtime.
 * @param startOpacity Opacity at the start of the animation.
 * @param endOpacity Opacity at the end of the animation.
 * @param easing How the command should "accelerate".
 */
export function fade(time: Time | TimeRange, startOpacity: number, endOpacity: number = startOpacity, easing?: Easing) {
	const [startTime, endTime] = validateAndExtractTime(time)
	const [startValue, endValue] = validateNumericArguments(startOpacity, endOpacity, 'Opacity')

	addCommandToCurrentObject<Command>({
		__name__: 'Fade',
		type: 'F',
		easing: defaultEasingIfUndefined(easing),
		startTime,
		endTime,
		startValue,
		endValue,
	})
}
