import { fade, move } from 'commands'
import { createContext, useContext } from 'context'
import { createAnimation } from 'createAnimation'
import { createBackground } from 'createBackground'
import { createSample, SampleLayer } from 'createSample'
import { createSprite } from 'createSprite'
import { createVideo } from 'createVideo'
import { generateStoryboardOsb } from 'generateStoryboardOsb'

describe('create object', () => {
	it('should be able to use a custom function component', () => {
		useContext(createContext())

		const customComponent = () => {
			createSprite('test.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
				fade(0, 1000, 0, 1)
				move(0, 1000, { x: 0, y: 0 }, { x: 100, y: 100 })
			})
		}

		customComponent()

		expect(generateStoryboardOsb()).toBe(
			'[Events]\n' +
				'//Background and Video events\n' +
				'//Storyboard Layer 0 (Background)\n' +
				'Sprite,Background,Centre,"test.png",320,240\n' +
				' F,0,0,1000,0,1\n' +
				' M,0,0,1000,0,0,100,100\n' +
				'//Storyboard Layer 1 (Fail)\n' +
				'//Storyboard Layer 2 (Pass)\n' +
				'//Storyboard Layer 3 (Foreground)\n' +
				'//Storyboard Layer 4 (Overlay)\n' +
				'//Storyboard Sound Samples\n'
		)
	})

	it('should sort storyboard layers correctly', () => {
		useContext(createContext())

		createBackground('test-bg.png')
		createVideo('test-vid.mp4', 1000)

		createSprite('test-sprite0.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {})
		createAnimation('test-animation0.png', 'Background', 'Centre', { x: 320, y: 240 }, 3, 300, 'LoopForever', () => {})

		createSprite('test-sprite1.png', 'Fail', 'Centre', { x: 320, y: 240 }, () => {})
		createAnimation('test-animation1.png', 'Fail', 'Centre', { x: 320, y: 240 }, 3, 300, 'LoopForever', () => {})

		createSprite('test-sprite2.png', 'Pass', 'Centre', { x: 320, y: 240 }, () => {})
		createAnimation('test-animation2.png', 'Pass', 'Centre', { x: 320, y: 240 }, 3, 300, 'LoopForever', () => {})

		createSprite('test-sprite3.png', 'Foreground', 'Centre', { x: 320, y: 240 }, () => {})
		createAnimation('test-animation3.png', 'Foreground', 'Centre', { x: 320, y: 240 }, 3, 300, 'LoopForever', () => {})

		createSprite('test-sprite4.png', 'Overlay', 'Centre', { x: 320, y: 240 }, () => {})
		createAnimation('test-animation4.png', 'Overlay', 'Centre', { x: 320, y: 240 }, 3, 300, 'LoopForever', () => {})

		createSample(1000, SampleLayer.Background, 'test-sample.ogg', 100)

		expect(generateStoryboardOsb()).toBe(
			'[Events]\n' +
				'//Background and Video events\n' +
				'0,0,"test-bg.png",0,0\n' +
				'Video,1000,"test-vid.mp4"\n' +
				'//Storyboard Layer 0 (Background)\n' +
				'Sprite,Background,Centre,"test-sprite0.png",320,240\n' +
				'Animation,Background,Centre,"test-animation0.png",320,240,3,300,LoopForever\n' +
				'//Storyboard Layer 1 (Fail)\n' +
				'Sprite,Fail,Centre,"test-sprite1.png",320,240\n' +
				'Animation,Fail,Centre,"test-animation1.png",320,240,3,300,LoopForever\n' +
				'//Storyboard Layer 2 (Pass)\n' +
				'Sprite,Pass,Centre,"test-sprite2.png",320,240\n' +
				'Animation,Pass,Centre,"test-animation2.png",320,240,3,300,LoopForever\n' +
				'//Storyboard Layer 3 (Foreground)\n' +
				'Sprite,Foreground,Centre,"test-sprite3.png",320,240\n' +
				'Animation,Foreground,Centre,"test-animation3.png",320,240,3,300,LoopForever\n' +
				'//Storyboard Layer 4 (Overlay)\n' +
				'Sprite,Overlay,Centre,"test-sprite4.png",320,240\n' +
				'Animation,Overlay,Centre,"test-animation4.png",320,240,3,300,LoopForever\n' +
				'//Storyboard Sound Samples\n' +
				'Sample,1000,0,"test-sample.ogg",100\n'
		)
	})
})
