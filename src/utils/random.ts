/**
 * Random integer in the interval [min, max].
 * @param min Min value.
 * @param max Max value
 */
export function randInt(min: number, max: number) {
	return min + Math.floor(Math.random() * (max - min))
}

/**
 * Random float in the interval [min, max].
 * @param min Min value.
 * @param max Max value
 */
export function randFloat(min: number, max: number) {
	return min + Math.random() * (max - min)
}
