import { isAnimation, isBackground, isSample, isSprite, isVideo } from 'checkObjectType'
import { getObjects } from 'context'
import { Animation } from 'createAnimation'
import { Background } from 'createBackground'
import { Sample } from 'createSample'
import { Sprite } from 'createSprite'
import { Video } from 'createVideo'
import { getAnimationOsb, getBackgroundOsb, getSampleOsb, getSpriteOsb, getVideoOsb } from 'getObjectOsb'

/**
 * Generate osb string that can be used to create osb file or replace [Events] section in osu file.
 */
export function generateStoryboardOsb(): string {
	const objects = getObjects()

	const { backgroundAndVideo, background, foreground, fail, pass, overlay, sample } = extractStoryboardLayers(objects)

	return (
		'[Events]\n' +
		'//Background and Video events\n' +
		backgroundAndVideo.map((object) => (isBackground(object) ? getBackgroundOsb(object) : isVideo(object) ? getVideoOsb(object) : '')).join('') +
		'//Storyboard Layer 0 (Background)\n' +
		background.map((object) => (isSprite(object) ? getSpriteOsb(object) : isAnimation(object) ? getAnimationOsb(object) : '')).join('') +
		'//Storyboard Layer 1 (Foreground)\n' +
		foreground.map((object) => (isSprite(object) ? getSpriteOsb(object) : isAnimation(object) ? getAnimationOsb(object) : '')).join('') +
		'//Storyboard Layer 2 (Fail)\n' +
		fail.map((object) => (isSprite(object) ? getSpriteOsb(object) : isAnimation(object) ? getAnimationOsb(object) : '')).join('') +
		'//Storyboard Layer 3 (Pass)\n' +
		pass.map((object) => (isSprite(object) ? getSpriteOsb(object) : isAnimation(object) ? getAnimationOsb(object) : '')).join('') +
		'//Storyboard Layer 4 (Overlay)\n' +
		overlay.map((object) => (isSprite(object) ? getSpriteOsb(object) : isAnimation(object) ? getAnimationOsb(object) : '')).join('') +
		'//Storyboard Sound Samples\n' +
		sample.map((object) => (isSample(object) ? getSampleOsb(object) : '')).join('')
	)
}

export type StoryboardLayers = {
	backgroundAndVideo: (Background | Video)[]
	background: (Sprite | Animation)[]
	foreground: (Sprite | Animation)[]
	fail: (Sprite | Animation)[]
	pass: (Sprite | Animation)[]
	overlay: (Sprite | Animation)[]
	sample: Sample[]
}

export function extractStoryboardLayers(objects: (Sprite | Animation | Sample | Video | Background)[]): StoryboardLayers {
	return {
		backgroundAndVideo: objects.filter((object): object is Background | Video => isBackground(object) || isVideo(object)),
		background: objects.filter(
			(object): object is Animation | Sprite => (isAnimation(object) || isSprite(object)) && object.layer === 'Background'
		),
		foreground: objects.filter(
			(object): object is Animation | Sprite => (isAnimation(object) || isSprite(object)) && object.layer === 'Foreground'
		),
		fail: objects.filter((object): object is Animation | Sprite => (isAnimation(object) || isSprite(object)) && object.layer === 'Fail'),
		pass: objects.filter((object): object is Animation | Sprite => (isAnimation(object) || isSprite(object)) && object.layer === 'Pass'),
		overlay: objects.filter((object): object is Animation | Sprite => (isAnimation(object) || isSprite(object)) && object.layer === 'Overlay'),
		sample: objects.filter((object): object is Sample => isSample(object)),
	}
}
