import { addObject, setIsInvokingCommand } from './context'
import { Command, LoopCommand, ParameterCommand, TriggerCommand } from './types/Command'
import { Layer } from './types/Layer'
import { Origin } from './types/Origin'
import { Vector2 } from './types/Vector2'

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
	addObject({
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
}
