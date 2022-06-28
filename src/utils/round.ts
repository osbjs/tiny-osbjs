import { Vector2 } from 'types/Vector2'

const DECIMAL_DIGITS = 5

export function round(x: number): number {
	return parseFloat(x.toFixed(DECIMAL_DIGITS))
}

export function roundVec(v: Vector2): Vector2 {
	return {
		x: round(v.x),
		y: round(v.y),
	}
}
