import { Easing } from 'types/Easing'
import { toEasingFn } from './easingFunctions'

/**
 * Map a value from an input range to an output range. This will clamp the input if it's outside of the input range.
 *
 * @param input input value to interpolate
 * @param inputRange range of values that you expect the input to assume
 * @param outputRange range of output values that you want the input to map to
 * @param easing type of easing
 */
export function interpolate(input: number, inputRange: [number, number], outputRange: [number, number], easing: Easing = Easing.Linear): number {
	const [inputMin, inputMax] = inputRange
	const [outputMin, outputMax] = outputRange
	const easingFn = toEasingFn(easing)

	if (input < inputMin) return inputMin
	if (input > inputMax) return inputMax
	if (outputMin === outputMax) return outputMin

	return easingFn((input - inputMin) / (inputMax - inputMin)) * (outputMax - outputMin) + outputMin
}
