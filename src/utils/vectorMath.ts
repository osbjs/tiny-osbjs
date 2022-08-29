import { Vector2 } from 'types/Vector2'

/**
 * Adds 2 vectors and returns a new vector.
 */
export function addVec(v1: Vector2, v2: Vector2): Vector2 {
	return [v1[0] + v2[0], v1[1] + v2[1]]
}

/**
 * Adds a scalar to both x and y and returns a new vector.
 */
export function addVecScalar(v: Vector2, s: number): Vector2 {
	return [v[0] + s, v[1] + s]
}

/**
 * Subtracts 2nd vector from 1st vector and returns a new vector.
 */
export function subVec(v1: Vector2, v2: Vector2): Vector2 {
	return [v1[0] - v2[0], v1[1] - v2[1]]
}

/**
 * Multiplies both x and y with a specified scalar and returns a new vector.
 */
export function mulVecScalar(v: Vector2, s: number): Vector2 {
	return [v[0] * s, v[1] * s]
}

/**
 * Multiplies 2 vectors and returns a new vector.
 */
export function mulVec(v1: Vector2, v2: Vector2): Vector2 {
	return [v1[0] * v2[0], v1[1] * v2[1]]
}

/**
 * Returns the dot product of 2 vectors.
 */
export function dotVec(v1: Vector2, v2: Vector2): number {
	return v1[0] * v2[0] + v1[1] * v2[1]
}

/**
 * Returns the cross product of 2 vectors.
 */
export function crossVec(v1: Vector2, v2: Vector2): number {
	return v1[0] * v2[1] - v1[1] * v2[0]
}

/**
 * Returns the length squared of the vector.
 */
export function lengthSqrVec(v: Vector2): number {
	return v[0] * v[0] + v[1] * v[1]
}

/**
 * Returns the length of the vector.
 */
export function lengthVec(v: Vector2): number {
	return Math.sqrt(lengthSqrVec(v))
}

/**
 * Check if 2 vectors are equals.
 */
export function areEqualVecs(v1: Vector2, v2: Vector2): boolean {
	return v1[0] === v2[0] && v1[1] === v2[1]
}

/**
 * Return a new Vector with the same x and y with the specified vector.
 */
export function cloneVec(v: Vector2): Vector2 {
	return [v[0], v[1]]
}

/**
 * Return a vector with the same direction but its length equals 1.
 */
export function normalizeVec(v: Vector2): Vector2 {
	return mulVecScalar(v, 1 / lengthVec(v))
}

/**
 * Performs a linear interpolation between two vectors based on the given weighting,
 * alpha = 0 will be v1 and alpha = 1 will be v2.
 */
export function interpolateVec(v1: Vector2, v2: Vector2, alpha: number): Vector2 {
	return [v1[0] + (v2[0] - v1[0]) * alpha, v1[1] + (v2[1] - v1[1]) * alpha]
}
