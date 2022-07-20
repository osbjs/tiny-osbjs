import { Animation } from 'createAnimation'
import { Background } from 'createBackground'
import { Sample } from 'createSample'
import { Sprite } from 'createSprite'
import { Video } from 'createVideo'
import { getCommandsOsb } from 'getCommandOsb'

export function getSpriteOsb({ type, layer, origin, path, initialPosition, commands }: Sprite): string {
	const [x, y] = initialPosition
	return [type, layer, origin, `"${path}"`, x, y].join(',').concat('\n').concat(getCommandsOsb(commands))
}

export function getAnimationOsb({ type, layer, origin, path, initialPosition, commands, frameCount, frameDelay, loopType }: Animation): string {
	const [x, y] = initialPosition

	return [type, layer, origin, `"${path}"`, x, y, frameCount, frameDelay, loopType].join(',').concat('\n').concat(getCommandsOsb(commands))
}

export function getSampleOsb({ type, layer, path, volume, startTime }: Sample): string {
	return [type, startTime, layer, `"${path}"`, volume].join(',').concat('\n')
}

export function getBackgroundOsb({ path }: Background): string {
	return `0,0,"${path}",0,0\n`
}

export function getVideoOsb({ type, path, offset }: Video): string {
	return `${type},${offset},"${path}"\n`
}
