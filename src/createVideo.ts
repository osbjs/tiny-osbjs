import { addObject } from 'context'

/**
 * Create a new Video.
 *
 * @param path Path to the video file
 * @param offset Offset of the video
 */
export function createVideo(path: string, offset: number) {
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
