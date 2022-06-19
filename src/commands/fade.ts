import { addCommandToCurrentObject } from 'src/context'
import { tryParseTimestamp } from 'src/tryParseTimestamp'
import { Command } from 'src/types/Command'
import { Easing } from 'src/types/Easing'
import { Timestamp } from 'src/types/Timestamp'

export function fadeAtTime(time: number | Timestamp, opacity: number) {
	addCommandToCurrentObject<Command>({
		__name__: 'Fade',
		type: 'F',
		easing: Easing.Linear,
		startTime: tryParseTimestamp(time),
		endTime: tryParseTimestamp(time),
		startValue: opacity,
		endValue: opacity,
	})
}

export function fade(
	startTime: number | Timestamp,
	endTime: number | Timestamp,
	startOpacity: number,
	endOpacity: number,
	easing: Easing = Easing.Linear
) {
	addCommandToCurrentObject<Command>({
		__name__: 'Fade',
		type: 'F',
		easing,
		startTime: tryParseTimestamp(startTime),
		endTime: tryParseTimestamp(endTime),
		startValue: startOpacity,
		endValue: endOpacity,
	})
}
