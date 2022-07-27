import { isValidColor, isValidEasing, isValidTime, isValidTimePair, isValidVector2 } from 'isValidParams'
import { tryParseTimestamp } from 'tryParseTimestamp'
import { Color } from 'types/Color'
import { Easing } from 'types/Easing'
import { TimePair } from 'types/TimePair'
import { Time } from 'types/Timestamp'
import { Vector2 } from 'types/Vector2'
import { round, roundColor, roundVec } from 'utils/round'

export function validateAndExtractTime(time: Time | TimePair): [number, number] {
	if (isValidTimePair(time)) {
		return [tryParseTimestamp(time[0]), tryParseTimestamp(time[1])]
	} else {
		if (!isValidTime(time)) throw new TypeError('`time` must be a number or an osu timestamp, ex: 00:01:300.')

		return [tryParseTimestamp(time), tryParseTimestamp(time)]
	}
}

export function validateColorArguments(startValue: Color, endValue: Color): [Color, Color] {
	if (!isValidColor(startValue)) throw new TypeError('`startColor` must be a valid `Color` array.')
	if (!isValidColor(endValue)) throw new TypeError('`endColor` must be a valid `Color` array.')

	return [roundColor(startValue), roundColor(endValue)]
}

export function validateVector2Arguments(startValue: Vector2, endValue: Vector2, parameterName: string): [Vector2, Vector2] {
	if (!isValidVector2(startValue)) throw new TypeError('`start' + parameterName + '` must be a valid `Vector2` array.')
	if (!isValidVector2(endValue)) throw new TypeError('`end' + parameterName + '` must be a valid `Vector2` array.')

	return [roundVec(startValue), roundVec(endValue)]
}

export function validateNumericArguments(startValue: number, endValue: number, parameterName: string): [number, number] {
	if (typeof startValue != 'number') throw new TypeError('`start' + parameterName + '` must be a number.')
	if (typeof endValue != 'number') throw new TypeError('`end' + parameterName + '` must be a number.')

	return [round(startValue), round(endValue)]
}

export function defaultEasingIfUndefined(easing?: Easing): Easing {
	if (typeof easing == 'undefined') return Easing.Linear

	if (!isValidEasing(easing)) throw new TypeError('Invalid easing. Use `Easing` enum instead.')

	return easing
}
