import { addObject, setIsInvokingCommand } from './context'
import { Command, LoopCommand, ParameterCommand, TriggerCommand } from './types/Command'
import { Layer } from './types/Layer'
import { Origin } from './types/Origin'
import { Vector2 } from './types/Vector2'

export type Sprite = {
	type: 'Sprite'
	path: string
	layer: Layer
	origin: Origin
	initialPosition: Vector2
	commands: (Command | ParameterCommand | LoopCommand | TriggerCommand)[]
}

/**
 * Create a new sprite.
 *
 * @param path Path to the image file relative to the beatmap folder.
 * @param layer The layer the object appears on.
 * @param origin is where on the image should osu! consider that image's origin (coordinate) to be.
 * This affects the (x) and (y) values, as well as several other command-specific behaviours.
 * For example, choosing (origin) = TopLeft will let the (x),(y) values determine,
 * where the top left corner of the image itself should be on the screen.
 * @param initialPosition Where the sprite should be by default.
 * @param invokeFunction The commands that should be run when the sprite is created.
 */
export function createSprite(path: string, layer: Layer, origin: Origin, initialPosition: Vector2, invokeFunction: () => void) {
	if (typeof path !== 'string') throw new TypeError('Path must be a string.')

	addObject({
		type: 'Sprite',
		path,
		layer,
		origin,
		initialPosition,
		commands: [],
	})
	setIsInvokingCommand(true)
	invokeFunction()
	setIsInvokingCommand(false)
}
