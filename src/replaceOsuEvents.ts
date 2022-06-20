import { generateStoryboardEventsWithBreakPeriods } from 'generateStoryboardOsb'

/**
 * Returns .osu file after replacing [Events] section with events generated from storyboard.
 * @param parsedOsuDifficulty Parsed .osu file
 */
export function replaceOsuEvents(parsedOsuDifficulty: string): string {
	const pattern =
		/\[Events\]\n\/\/Background and Video events\n(.*\n)*\/\/Break Periods\n(2,\d+,\d+\n)*\/\/Storyboard Layer 0 \(Background\)\n(.*\n)*\/\/Storyboard Layer 1 \(Fail\)\n(.*\n)*\/\/Storyboard Layer 2 \(Pass\)\n(.*\n)*\/\/Storyboard Layer 3 \(Foreground\)\n(.*\n)*\/\/Storyboard Layer 4 \(Overlay\)\n(.*\n)*\/\/Storyboard Sound Samples\n(Sample,\d+,\d+,\".+\",\d+\n)*/g

	const breakPeriods = parsedOsuDifficulty.match(/\/\/Break Periods\n(2,\d+,\d+\n)*/g) as string[]

	const osbToReplace = generateStoryboardEventsWithBreakPeriods(breakPeriods.toString())

	return parsedOsuDifficulty.replace(pattern, osbToReplace)
}
