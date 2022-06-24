import { addObject, isInvokingCommand, isInvokingLoop, isInvokingTrigger } from 'context'

/**
 * Create a new Video.
 *
 * @param path Path to the video file
 * @param offset Offset of the video
 */
export function createVideo(path: string, offset: number) {
	if (isInvokingCommand() || isInvokingLoop() || isInvokingTrigger())
		throw new Error("Do not call `createVideo` inside an invoke function of other `createSprite` or `createAnimation`'s method")

	addObject<Video>({
		type: 'Video',
		path,
		offset,
	})
}

export type Video = {
	type: 'Video'
	path: string
	offset: number
}
