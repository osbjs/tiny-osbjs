import { addCommandToCurrentObject } from 'src/context'
import { tryParseTimestamp } from 'src/tryParseTimestamp'
import { Command } from 'src/types/Command'
import { Easing } from 'src/types/Easing'
import { Timestamp } from 'src/types/Timestamp'
import { Vector2 } from 'src/types/Vector2'

export function scaleVec(
	startTime: number | Timestamp,
	endTime: number | Timestamp,
	startScale: Vector2,
	endScale: Vector2,
	easing: Easing = Easing.Linear
) {
	addCommandToCurrentObject<Command>({
		__name__: 'Scale',
		type: 'V',
		easing,
		startTime: tryParseTimestamp(startTime),
		endTime: tryParseTimestamp(endTime),
		startValue: startScale,
		endValue: endScale,
	})
}

export function scaleVecAtTime(time: number | Timestamp, position: Vector2) {
	addCommandToCurrentObject<Command>({
		__name__: 'Scale',
		type: 'V',
		easing: Easing.Linear,
		startTime: tryParseTimestamp(time),
		endTime: tryParseTimestamp(time),
		startValue: position,
		endValue: position,
	})
}
