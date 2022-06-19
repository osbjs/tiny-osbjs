import { addObject } from 'context'

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
