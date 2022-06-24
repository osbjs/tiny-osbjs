import { addObject, isInvokingCommand, isInvokingLoop, isInvokingTrigger } from 'context'
import { AudioPath } from 'types/AudioPath'

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
 *
 * @param startTime Time in milliseconds/timestamp that the sound should start playing.
 * @param layer The layer you want the sound to be on.
 * @param path Path to the audio file relative to the beatmap folder.
 * @param volume Volume (1-100) of the sound file.
 */
export function createSample(startTime: number, layer: SampleLayer, path: AudioPath, volume: number) {
	if (![0, 1, 2, 3].includes(layer)) throw new TypeError(layer + ' is not a valid sample layer. Use `SampleLayer` enum instead.')
	if (typeof path !== 'string') throw new TypeError('Path must be a string.')
	if (typeof volume !== 'number') throw new TypeError('Volume must be a number.')
	if (volume < 1 || volume > 100) throw new Error('Volume must be between 1 and 100.')
	if (isInvokingCommand() || isInvokingLoop() || isInvokingTrigger())
	throw new Error("Do not call `createSample` inside an invoke function of other `createSprite` or `createAnimation`'s method")

	addObject<Sample>({
		type: 'Sample',
		layer,
		path,
		volume,
		startTime,
	})
}
