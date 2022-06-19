import { Animation } from 'createAnimation'
import { Background } from 'createBackground'
import { Sample } from 'createSample'
import { Sprite } from 'createSprite'
import { Video } from 'createVideo'

export function isSprite(o: Sprite | Animation | Sample | Video | Background): o is Sprite {
	return o.type === 'Sprite'
}

export function isAnimation(o: Sprite | Animation | Sample | Video | Background): o is Animation {
	return o.type === 'Animation'
}

export function isSample(o: Sprite | Animation | Sample | Video | Background): o is Sample {
	return o.type === 'Sample'
}

export function isBackground(o: Sprite | Animation | Sample | Video | Background): o is Background {
	return o.type === 'Background'
}

export function isVideo(o: Sprite | Animation | Sample | Video | Background): o is Video {
	return o.type === 'Video'
}
