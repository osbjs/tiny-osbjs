import { addObject, isInvokingCommand, isInvokingLoop, isInvokingTrigger } from 'context'

/**
 * Create a new background.
 *
 * @param path Path to the image file
 */
export function createBackground(path: string) {
	if (isInvokingCommand() || isInvokingLoop() || isInvokingTrigger())
		throw new Error("Do not call `createBackground` inside an invoke function of other `createSprite` or `createAnimation`'s method")

	addObject<Background>({
		type: 'Background',
		path,
	})
}

export type Background = {
	type: 'Background'
	path: string
}
