import { addCommandToCurrentObject } from 'context'
import { Command } from 'types/Command'
import { TimePair } from 'types/CommandValue'
import { Easing } from 'types/Easing'
import { Time } from 'types/Timestamp'
import { Vector2 } from 'types/Vector2'
import { defaultEasingIfUndefined, validateAndExtractTime, validateVector2Arguments } from './utils/extractCommandArguments'

/**
 * Change the location of the object in the play area.
 *
 * @param time Time in milliseconds/timestamp indicates when the event will occur.
 * Pass in [startTime, endTime] if you want to make the location of the object changes overtime.
 * @param startPosition Position at the start of the animation.
 * @param endPosition Position at the end of the animation.
 * @param easing How the command should "accelerate".
 */
export function move(time: Time | TimePair, startPosition: Vector2, endPosition: Vector2 = startPosition, easing?: Easing) {
	const [startTime, endTime] = validateAndExtractTime(time)
	const [startValue, endValue] = validateVector2Arguments(startPosition, endPosition, 'Position')

	addCommandToCurrentObject<Command>({
		__name__: 'Move',
		type: 'M',
		easing: defaultEasingIfUndefined(easing),
		startTime,
		endTime,
		startValue,
		endValue,
	})
}
