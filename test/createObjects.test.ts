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
				'//Storyboard Layer 1 (Foreground)\n' +
				'//Storyboard Layer 2 (Fail)\n' +
				'//Storyboard Layer 3 (Pass)\n' +
				'//Storyboard Layer 4 (Overlay)\n' +
				'//Storyboard Sound Samples\n'
		)
	})

	it('should sort storyboard layers correctly', () => {
		expect(() => {
			useContext(createContext())

			createBackground('test-bg.png')
			createVideo('test-vid.mp4', 1000)

			createSprite('test-sprite1.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {})
			createAnimation('test-animation1.png', 'Background', 'Centre', { x: 320, y: 240 }, 3, 300, 'LoopForever', () => {})

			createSprite('test-sprite2.png', 'Foreground', 'Centre', { x: 320, y: 240 }, () => {})
			createAnimation('test-animation2.png', 'Foreground', 'Centre', { x: 320, y: 240 }, 3, 300, 'LoopForever', () => {})

			createSprite('test-sprite3.png', 'Fail', 'Centre', { x: 320, y: 240 }, () => {})
			createAnimation('test-animation3.png', 'Fail', 'Centre', { x: 320, y: 240 }, 3, 300, 'LoopForever', () => {})

			createSprite('test-sprite4.png', 'Pass', 'Centre', { x: 320, y: 240 }, () => {})
			createAnimation('test-animation4.png', 'Pass', 'Centre', { x: 320, y: 240 }, 3, 300, 'LoopForever', () => {})

			createSprite('test-sprite5.png', 'Overlay', 'Centre', { x: 320, y: 240 }, () => {})
			createAnimation('test-animation5.png', 'Overlay', 'Centre', { x: 320, y: 240 }, 3, 300, 'LoopForever', () => {})

			createSample(SampleLayer.Background, 'test-sample.ogg', 100, 1000)

			expect(generateStoryboardOsb()).toBe(
				'[Events]\n' +
					'//Background and Video events\n' +
					'0,0,"test-bg.png",0,0\n' +
					'Video,"test.mp4",1000\n' +
					'//Storyboard Layer 0 (Background)\n' +
					'Sprite,Background,Centre,"test.png",320,240\n' +
					'Animation,Background,Centre,"test.png",320,240,3,300,LoopForever\n' +
					'//Storyboard Layer 1 (Foreground)\n' +
					'Sprite,Background,Centre,"test.png",320,240\n' +
					'Animation,Background,Centre,"test.png",320,240,3,300,LoopForever\n' +
					'//Storyboard Layer 2 (Fail)\n' +
					'Sprite,Background,Centre,"test.png",320,240\n' +
					'Animation,Background,Centre,"test.png",320,240,3,300,LoopForever\n' +
					'//Storyboard Layer 3 (Pass)\n' +
					'Sprite,Background,Centre,"test.png",320,240\n' +
					'Animation,Background,Centre,"test.png",320,240,3,300,LoopForever\n' +
					'//Storyboard Layer 4 (Overlay)\n' +
					'Sprite,Background,Centre,"test.png",320,240\n' +
					'Animation,Background,Centre,"test.png",320,240,3,300,LoopForever\n' +
					'//Storyboard Sound Samples\n' +
					'Sample,Background,test.ogg,100,1000\n'
			)
		})
	})
})
