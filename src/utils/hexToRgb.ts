import { Color } from 'types/Color'

/**
 * Convert hex color code to RGB color.
 * @param hex Hex represents a color.
 */
export function hexToRgb(hex: string): Color {
	const trimmed = hex.replace('#', '')
	const r = parseInt('0x' + trimmed[0] + trimmed[1]) | 0,
		g = parseInt('0x' + trimmed[2] + trimmed[3]) | 0,
		b = parseInt('0x' + trimmed[4] + trimmed[5]) | 0

	return [r, g, b]
}
