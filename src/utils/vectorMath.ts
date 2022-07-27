import { Vector2 } from 'types/Vector2'

export function addVec(v1: Vector2, v2: Vector2): Vector2 {
	return [v1[0] + v2[0], v1[1] + v2[1]]
}

export function subVec(v1: Vector2, v2: Vector2): Vector2 {
	return [v1[0] - v2[0], v1[1] - v2[1]]
}

export function mulVecScalar(v: Vector2, s: number): Vector2 {
	return [v[0] * s, v[1] * s]
}

export function mulVec(v1: Vector2, v2: Vector2): Vector2 {
	return [v1[0] * v2[0], v1[1] * v2[1]]
}

export function addVecScalar(v: Vector2, s: number): Vector2 {
	return [v[0] + s, v[1] + s]
}

export function dotVec(v1: Vector2, v2: Vector2): number {
	return v1[0] * v2[0] + v1[1] * v2[1]
}

export function crossVec(v1: Vector2, v2: Vector2): number {
	return v1[0] * v2[1] - v1[1] * v2[0]
}

export function lengthSqrVec(v: Vector2): number {
	return v[0] * v[0] + v[1] * v[1]
}

export function lengthVec(v: Vector2): number {
	return Math.sqrt(lengthSqrVec(v))
}

export function areEqualVecs(v1: Vector2, v2: Vector2): boolean {
	return v1[0] === v2[0] && v1[1] === v2[1]
}

export function cloneVec(v: Vector2): Vector2 {
	return [v[0], v[1]]
}

export function normalizeVec(v: Vector2): Vector2 {
	return mulVecScalar(v, 1 / lengthVec(v))
}
