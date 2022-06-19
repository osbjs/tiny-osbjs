import { addObject } from './context'

export type Sample = {
	type: 'Sample'
	layer: SampleLayer
	path: string
	volume: number
	startTime: number
}

export enum SampleLayer {
	Background,
	Fail,
	Pass,
	Foreground,
}

/**
 * Create a storyboard audio sample.
 * @param startTime Time in milliseconds/timestamp that the sound should start playing.
 * @param layer The layer you want the sound to be on.
 * @param path Path to the audio file relative to the beatmap folder.
 * @param volume Volume (1-100) of the sound file.
 */
export function createSample(layer: SampleLayer, path: string, volume: number, startTime: number) {
	if (![0, 1, 2, 3].includes(layer)) throw new TypeError('Use `SampleLayer` enum to specify layer instead.')
	if (volume < 1 || volume > 100) throw new Error('Volume must be between 1 and 100.')

	addObject({
		type: 'Sample',
		layer,
		path,
		volume,
		startTime,
	})
}
