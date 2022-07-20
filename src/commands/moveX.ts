import { addCommandToCurrentObject } from 'context'
import { Command } from 'types/Command'
import { Easing } from 'types/Easing'
import { TimePair } from 'types/TimePair'
import { Time } from 'types/Timestamp'
import { defaultEasingIfUndefined, validateAndExtractTime, validateNumericArguments } from './utils/extractCommandArguments'

/**
 * Change the X coordinate of the object.
 *
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * Pass in [startTime, endTime] if you want to make the X coordinate of the object changes overtime.
 * @param startX X coordinate at the start of the animation.
 * @param endX X coordinate at the end of the animation.
 * @param easing How the command should "accelerate".
 */
export function moveX(time: Time | TimePair, startX: number, endX: number = startX, easing?: Easing) {
	const [startTime, endTime] = validateAndExtractTime(time)
	const [startValue, endValue] = validateNumericArguments(startX, endX, 'X')

	addCommandToCurrentObject<Command>({
		__name__: 'MoveX',
		type: 'MX',
		easing: defaultEasingIfUndefined(easing),
		startTime,
		endTime,
		startValue,
		endValue,
	})
}
