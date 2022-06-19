import { addObject } from 'context'

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
