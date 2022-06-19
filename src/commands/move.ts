import { addCommandToCurrentObject } from 'src/context'
import { tryParseTimestamp } from 'src/tryParseTimestamp'
import { Command } from 'src/types/Command'
import { Easing } from 'src/types/Easing'
import { Timestamp } from 'src/types/Timestamp'
import { Vector2 } from 'src/types/Vector2'

export function move(
	startTime: number | Timestamp,
	endTime: number | Timestamp,
	startPosition: Vector2,
	endPosition: Vector2,
	easing: Easing = Easing.Linear
) {
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
