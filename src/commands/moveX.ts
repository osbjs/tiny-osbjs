import { addCommandToCurrentObject } from 'src/context'
import { tryParseTimestamp } from 'src/tryParseTimestamp'
import { Command } from 'src/types/Command'
import { Easing } from 'src/types/Easing'
import { Timestamp } from 'src/types/Timestamp'

export function moveX(startTime: number | Timestamp, endTime: number | Timestamp, startX: number, endX: number, easing: Easing = Easing.Linear) {
	addCommandToCurrentObject<Command>({
		__name__: 'MoveX',
		type: 'MX',
		easing,
		startTime: tryParseTimestamp(startTime),
		endTime: tryParseTimestamp(endTime),
		startValue: startX,
		endValue: endX,
	})
}

export function moveXAtTime(time: number | Timestamp, x: number) {
	addCommandToCurrentObject<Command>({
		__name__: 'MoveX',
		type: 'MX',
		easing: Easing.Linear,
		startTime: tryParseTimestamp(time),
		endTime: tryParseTimestamp(time),
		startValue: x,
		endValue: x,
	})
}
