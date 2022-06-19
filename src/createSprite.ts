import { addObject, getObjects, setIsInvokingCommand } from './context'
import { isValidLayer, isValidOrigin, isValidVector2 } from './isValidParams'
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
	if (!isValidLayer(layer)) throw new TypeError(`${layer} is not a valid layer.`)
	if (!isValidOrigin(origin)) throw new TypeError(`${origin} is not a valid origin.`)
	if (!isValidVector2(initialPosition)) throw new TypeError('Initial position must be a Vector2.')

	addObject<Sprite>({
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

	if (isSpriteEmpty()) console.warn('The sprite is empty.')
}

function isSpriteEmpty(): boolean {
	const currentSprite = getObjects()[getObjects().length - 1] as Sprite

	return currentSprite.commands.length === 0
}
