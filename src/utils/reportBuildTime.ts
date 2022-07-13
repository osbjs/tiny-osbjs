/**
 * Print to console how long it takes to generate the storyboard.
 * @param sb Your storyboard
 * @example
 * ```ts
 * reportBuildTime(() => {
 * 		useContext(createContext())
 *
 * 		createSprite('bg.jpg', 'Background', 'Centre', { x: 320, y: 240 }, () => {
 *			fade(0, 300, 0, 1)
 *			scaleAtTime(0, 854 / 1920)
 *		})
 *
 * 		generateStoryboardOsb()
 * })
 * ```
 */
export function reportBuildTime(sb: () => void) {
	const startTime = Date.now()

	sb()

	console.log(`Done in ${(Date.now() - startTime) / 1000} s.`)
}
