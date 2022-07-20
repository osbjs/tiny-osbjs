import { Color } from 'types/Color'
import { Vector2 } from 'types/Vector2'

const DECIMAL_DIGITS = 5

export function round(x: number): number {
	return parseFloat(x.toFixed(DECIMAL_DIGITS))
}

export function roundVec(v: Vector2): Vector2 {
	return [round(v[0]), round(v[1])]
}

export function roundColor(c: Color): Color {
	return [round(c[0]), round(c[1]), round(c[2])]
}
