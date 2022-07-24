// Taken from Remotion https://github.com/remotion-dev/remotion/blob/main/packages/core/src/random.ts

function mulberry32(a: number) {
	let t = a + 0x6d2b79f5
	t = Math.imul(t ^ (t >>> 15), t | 1)
	t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
	return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

function hashCode(str: string) {
	let i = 0
	let chr = 0
	let hash = 0

	for (i = 0; i < str.length; i++) {
		chr = str.charCodeAt(i)
		hash = (hash << 5) - hash + chr
		hash |= 0 // Convert to 32bit integer
	}

	return hash
}

function random(seed: number | string | null): number {
	if (typeof seed === 'string') {
		return mulberry32(hashCode(seed))
	} else if (typeof seed === 'number') {
		return mulberry32(seed * 10000000000)
	} else if (seed === null) {
		return Math.random()
	} else {
		throw new Error('Random seed must either be a number, string or null.')
	}
}

/**
 * Random integer in the interval [min, max].
 * @param min Min value.
 * @param max Max value
 * @param seed Random seed. The same seed will always return the same value. Pass in null if you want a true random value.
 */
export function randInt(min: number, max: number, seed: number | string | null = 'default') {
	return min + Math.floor(random(seed) * (max - min))
}

/**
 * Random float in the interval [min, max].
 * @param min Min value.
 * @param max Max value
 * @param seed Random seed. The same seed will always return the same value. Pass in null if you want a true random value.
 */
export function randFloat(min: number, max: number, seed: number | string | null = 'default') {
	return min + random(seed) * (max - min)
}
