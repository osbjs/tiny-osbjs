import { addCommandToCurrentObject } from 'context'
import { Command } from 'types/Command'
import { Easing } from 'types/Easing'
import { TimePair } from 'types/TimePair'
import { Time } from 'types/Timestamp'
import { defaultEasingIfUndefined, validateAndExtractTime, validateNumericArguments } from './utils/extractCommandArguments'

/**
 * Change the size of the object relative to its original size.
 *
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * Pass in [startTime, endTime] if you want to make the object scales overtime.
 * @param startScaleFactor Scale factor at the start of the animation.
 * @param endScaleFactor Scale factor at the end of the animation.
 * @param easing How the command should "accelerate".
 */
export function scale(time: Time | TimePair, startScaleFactor: number, endScaleFactor: number = startScaleFactor, easing?: Easing) {
	const [startTime, endTime] = validateAndExtractTime(time)
	const [startValue, endValue] = validateNumericArguments(startScaleFactor, endScaleFactor, 'ScaleFactor')

	addCommandToCurrentObject<Command>({
		__name__: 'Scale',
		type: 'S',
		easing: defaultEasingIfUndefined(easing),
		startTime,
		endTime,
		startValue,
		endValue,
	})
}
