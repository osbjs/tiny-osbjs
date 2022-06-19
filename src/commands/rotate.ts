import { addCommandToCurrentObject } from 'src/context'
import { tryParseTimestamp } from 'src/tryParseTimestamp'
import { Command } from 'src/types/Command'
import { Easing } from 'src/types/Easing'
import { Timestamp } from 'src/types/Timestamp'

export function rotate(
	startTime: number | Timestamp,
	endTime: number | Timestamp,
	startAngle: number,
	endAngle: number,
	easing: Easing = Easing.Linear
) {
	addCommandToCurrentObject<Command>({
		__name__: 'Rotate',
		type: 'R',
		easing,
		startTime: tryParseTimestamp(startTime),
		endTime: tryParseTimestamp(endTime),
		startValue: startAngle,
		endValue: endAngle,
	})
}

export function rotateAtTime(time: number | Timestamp, angle: number) {
	addCommandToCurrentObject<Command>({
		__name__: 'Rotate',
		type: 'R',
		easing: Easing.Linear,
		startTime: tryParseTimestamp(time),
		endTime: tryParseTimestamp(time),
		startValue: angle,
		endValue: angle,
	})
}
