import { Vector2 } from 'types/Vector2'

export function addVec(v1: Vector2, v2: Vector2): Vector2 {
	return { x: v1.x + v2.x, y: v1.y + v2.y }
}

export function subVec(v1: Vector2, v2: Vector2): Vector2 {
	return { x: v1.x - v2.x, y: v1.y - v2.y }
}

export function mulVecScalar(v: Vector2, s: number): Vector2 {
	return { x: v.x * s, y: v.y * s }
}

export function mulVec(v1: Vector2, v2: Vector2): Vector2 {
	return { x: v1.x * v2.x, y: v1.y * v2.y }
}

export function addVecScalar(v: Vector2, s: number): Vector2 {
	return { x: v.x + s, y: v.y + s }
}

export function dotVec(v1: Vector2, v2: Vector2): number {
	return v1.x * v2.x + v1.y * v2.y
}

export function crossVec(v1: Vector2, v2: Vector2): number {
	return v1.x * v2.y - v1.y * v2.x
}

export function lengthSqrVec(v: Vector2): number {
	return v.x * v.x + v.y * v.y
}

export function lengthVec(v: Vector2): number {
	return Math.sqrt(lengthSqrVec(v))
}

export function areEqualVecs(v1: Vector2, v2: Vector2): boolean {
	return v1.x === v2.x && v1.y === v2.y
}
