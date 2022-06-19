import { addCommandToCurrentObject } from 'src/context'
import { tryParseTimestamp } from 'src/tryParseTimestamp'
import { Color } from 'src/types/Color'
import { Command } from 'src/types/Command'
import { Easing } from 'src/types/Easing'
import { Timestamp } from 'src/types/Timestamp'

export function color(
	startTime: number | Timestamp,
	endTime: number | Timestamp,
	startColor: Color,
	endColor: Color,
	easing: Easing = Easing.Linear
) {
	addCommandToCurrentObject<Command>({
		__name__: 'Color',
		type: 'C',
		easing,
		startTime: tryParseTimestamp(startTime),
		endTime: tryParseTimestamp(endTime),
		startValue: startColor,
		endValue: endColor,
	})
}

export function colorAtTime(time: number | Timestamp, color: Color) {
	addCommandToCurrentObject<Command>({
		__name__: 'Color',
		type: 'C',
		easing: Easing.Linear,
		startTime: tryParseTimestamp(time),
		endTime: tryParseTimestamp(time),
		startValue: color,
		endValue: color,
	})
}
