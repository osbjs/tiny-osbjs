/**
 * Convert an angle from degrees to radians.
 * @param deg The angle in degrees.
 */
export function degToRad(deg: number): number {
	return (deg * Math.PI) / 180
}

/**
 * Convert an angle from radians to degrees.
 * @param rad The angle in radians.
 */
export function radToDeg(rad: number): number {
	return (rad * 180) / Math.PI
}
