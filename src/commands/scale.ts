import { addCommandToCurrentObject } from 'src/context'
import { tryParseTimestamp } from 'src/tryParseTimestamp'
import { Command } from 'src/types/Command'
import { Easing } from 'src/types/Easing'
import { Timestamp } from 'src/types/Timestamp'

export function scale(
	startTime: number | Timestamp,
	endTime: number | Timestamp,
	startScale: number,
	endScale: number,
	easing: Easing = Easing.Linear
) {
	addCommandToCurrentObject<Command>({
		__name__: 'Scale',
		type: 'S',
		easing,
		startTime: tryParseTimestamp(startTime),
		endTime: tryParseTimestamp(endTime),
		startValue: startScale,
		endValue: endScale,
	})
}

export function scaleAtTime(time: number | Timestamp, scale: number) {
	addCommandToCurrentObject<Command>({
		__name__: 'Scale',
		type: 'S',
		easing: Easing.Linear,
		startTime: tryParseTimestamp(time),
		endTime: tryParseTimestamp(time),
		startValue: scale,
		endValue: scale,
	})
}
