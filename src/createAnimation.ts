import { addObject, getObjects, setIsInvokingCommand } from 'context'
import { Sprite } from 'createSprite'
import { isValidAnimationLoopType, isValidLayer, isValidOrigin, isValidVector2 } from 'isValidParams'
import { Command, LoopCommand, ParameterCommand, TriggerCommand } from 'types/Command'
import { Layer } from 'types/Layer'
import { Origin } from 'types/Origin'
import { Vector2 } from 'types/Vector2'

export type Animation = {
	type: 'Animation'
	path: string
	layer: Layer
	origin: Origin
	initialPosition: Vector2
	commands: (Command | ParameterCommand | LoopCommand | TriggerCommand)[]
	frameCount: number
	frameDelay: number
	loopType: AnimationLoopType
}

export type AnimationLoopType = 'LoopForever' | 'LoopOnce'

/**
 * Create a new Animation.
 *
 * @param path Path to the image file relative to the beatmap folder.
 * For example, specify a filename like "sliderball.png", and name your files "sliderball0.png" to "sliderball9.png" for a 10 frame animation.
 * @param layer The layer the object appears on.
 * @param initialPosition Where the sprite should be by default.
 * @param origin is where on the image should osu! consider that image's origin (coordinate) to be.
 * This affects the (x) and (y) values, as well as several other command-specific behaviours.
 * For example, choosing (origin) = TopLeft will let the (x),(y) values determine,
 * where the top left corner of the image itself should be on the screen.
 * @param frameCount number of frames in the animation.
 * @param frameDelay delay in milliseconds between each frame.
 * @param invokeFunction The commands that should be run when the sprite is created.
 */
export function createAnimation(
	path: string,
	layer: Layer,
	origin: Origin,
	initialPosition: Vector2,
	frameCount: number,
	frameDelay: number,
	loopType: AnimationLoopType,
	invokeFunction: () => void
) {
	if (typeof path !== 'string') throw new TypeError('Path must be a string.')
	if (!isValidLayer(layer)) throw new TypeError(`${layer} is not a valid layer.`)
	if (!isValidOrigin(origin)) throw new TypeError(`${origin} is not a valid origin.`)
	if (!isValidVector2(initialPosition)) throw new TypeError('Initial position must be a Vector2.')
	if (typeof frameCount !== 'number') throw new TypeError('Frame count must be a number.')
	if (typeof frameDelay !== 'number') throw new TypeError('Frame delay must be a number.')
	if (!isValidAnimationLoopType(loopType)) throw new TypeError(`${loopType} is not a valid loop type.`)

	addObject<Animation>({
		type: 'Animation',
		path,
		layer,
		origin,
		initialPosition,
		frameCount,
		frameDelay,
		loopType,
		commands: [],
	})
	setIsInvokingCommand(true)
	invokeFunction()
	setIsInvokingCommand(false)

	if (isAnimationEmpty()) console.warn('The animation is empty.')
}

function isAnimationEmpty(): boolean {
	const currentSprite = getObjects()[getObjects().length - 1] as Sprite

	return currentSprite.commands.length === 0
}
