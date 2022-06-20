import { addObject } from 'context'

/**
 * Create a new background.
 *
 * @param path Path to the image file
 */
export function createBackground(path: string) {
	addObject<Background>({
		type: 'Background',
		path,
	})
}

export type Background = {
	type: 'Background'
	path: string
}
