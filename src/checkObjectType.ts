import { Animation } from 'src/createAnimation'
import { Sample } from 'src/createSample'
import { Sprite } from 'src/createSprite'

export function isSprite(o: Sprite | Animation | Sample): o is Sprite {
	return o.type === 'Sprite'
}

export function isAnimation(o: Animation | Sprite | Sample): o is Animation {
	return o.type === 'Animation'
}

export function isSample(o: Sprite | Animation | Sample): o is Sample {
	return o.type === 'Sample'
}
