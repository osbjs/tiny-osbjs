import {
	color,
	colorAtTime,
	fade,
	fadeAtTime,
	loop,
	move,
	moveAtTime,
	moveX,
	moveXAtTime,
	moveY,
	moveYAtTime,
	rotate,
	rotateAtTime,
	scale,
	scaleAtTime,
	scaleVec,
	scaleVecAtTime,
	trigger,
} from 'commands'
import { createContext, useContext } from 'context'
import { createSprite } from 'createSprite'
import { generateStoryboardOsb } from 'generateStoryboardOsb'

describe('command', () => {
	it('should throw error when command is called outside of invoke function', () => {
		expect(() => {
			useContext(createContext())

			color(0, 1000, { r: 255, g: 255, b: 255 }, { r: 0, g: 0, b: 0 })
		}).toThrowError(`Color command must be called inside an invoke function.`)
	})

	it('should generate every command correctly', () => {
		useContext(createContext())

		createSprite('test.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
			color(0, 1000, { r: 255, g: 255, b: 255 }, { r: 0, g: 0, b: 0 })
			colorAtTime(2000, { r: 100, g: 100, b: 100 })
			fade(0, 1000, 0, 1)
			fadeAtTime(2000, 0.5)
			move(0, 1000, { x: 0, y: 0 }, { x: 100, y: 100 })
			moveAtTime(2000, { x: 200, y: 200 })
			moveX(0, 1000, 0, 100)
			moveXAtTime(2000, 200)
			moveY(0, 1000, 0, 100)
			moveYAtTime(2000, 200)
			rotate(0, 1000, 0, Math.PI / 2)
			rotateAtTime(2000, Math.PI)
			scale(0, 1000, 1, 2)
			scaleAtTime(2000, 3)
			scaleVec(0, 1000, { x: 1, y: 1 }, { x: 100, y: 100 })
			scaleVecAtTime(2000, { x: 200, y: 200 })

			loop(3000, 5, () => {
				color(0, 1000, { r: 255, g: 255, b: 255 }, { r: 0, g: 0, b: 0 })
				colorAtTime(2000, { r: 100, g: 100, b: 100 })
				fade(0, 1000, 0, 1)
				fadeAtTime(2000, 0.5)
				move(0, 1000, { x: 0, y: 0 }, { x: 100, y: 100 })
				moveAtTime(2000, { x: 200, y: 200 })
				moveX(0, 1000, 0, 100)
				moveXAtTime(2000, 200)
				moveY(0, 1000, 0, 100)
				moveYAtTime(2000, 200)
				rotate(0, 1000, 0, Math.PI / 2)
				rotateAtTime(2000, Math.PI)
				scale(0, 1000, 1, 2)
				scaleAtTime(2000, 3)
				scaleVec(0, 1000, { x: 1, y: 1 }, { x: 100, y: 100 })
				scaleVecAtTime(2000, { x: 200, y: 200 })
			})

			trigger('HitSound', 5000, 10000, () => {
				color(0, 1000, { r: 255, g: 255, b: 255 }, { r: 0, g: 0, b: 0 })
				colorAtTime(2000, { r: 100, g: 100, b: 100 })
				fade(0, 1000, 0, 1)
				fadeAtTime(2000, 0.5)
				move(0, 1000, { x: 0, y: 0 }, { x: 100, y: 100 })
				moveAtTime(2000, { x: 200, y: 200 })
				moveX(0, 1000, 0, 100)
				moveXAtTime(2000, 200)
				moveY(0, 1000, 0, 100)
				moveYAtTime(2000, 200)
				rotate(0, 1000, 0, Math.PI / 2)
				rotateAtTime(2000, Math.PI)
				scale(0, 1000, 1, 2)
				scaleAtTime(2000, 3)
				scaleVec(0, 1000, { x: 1, y: 1 }, { x: 100, y: 100 })
				scaleVecAtTime(2000, { x: 200, y: 200 })
			})

			expect(generateStoryboardOsb()).toBe(
				'[Events]\n' +
					'//Background and Video events\n' +
					'//Storyboard Layer 0 (Background)\n' +
					'Sprite,Background,Centre,"test.png",320,240\n' +
					' C,0,0,1000,255,255,255,0,0,0\n' +
					' C,0,2000,,100,100,100\n' +
					' F,0,0,1000,0,1\n' +
					' F,0,2000,,0.5\n' +
					' M,0,0,1000,0,0,100,100\n' +
					' M,0,2000,,200,200\n' +
					' MX,0,0,1000,0,100\n' +
					' MX,0,2000,,200\n' +
					' MY,0,0,1000,0,100\n' +
					' MY,0,2000,,200\n' +
					` R,0,0,1000,0,${Math.PI / 2}\n` +
					` R,0,2000,,${Math.PI}\n` +
					' S,0,0,1000,1,2\n' +
					' S,0,2000,,3\n' +
					' V,0,0,1000,1,1,100,100\n' +
					' V,0,2000,,200,200\n' +
					// loop
					' L,3000,5\n' +
					'  C,0,0,1000,255,255,255,0,0,0\n' +
					'  C,0,2000,,100,100,100\n' +
					'  F,0,0,1000,0,1\n' +
					'  F,0,2000,,0.5\n' +
					'  M,0,0,1000,0,0,100,100\n' +
					'  M,0,2000,,200,200\n' +
					'  MX,0,0,1000,0,100\n' +
					'  MX,0,2000,,200\n' +
					'  MY,0,0,1000,0,100\n' +
					'  MY,0,2000,,200\n' +
					`  R,0,0,1000,0,${Math.PI / 2}\n` +
					`  R,0,2000,,${Math.PI}\n` +
					'  S,0,0,1000,1,2\n' +
					'  S,0,2000,,3\n' +
					'  V,0,0,1000,1,1,100,100\n' +
					'  V,0,2000,,200,200\n' +
					// trigger
					' T,HitSound,5000,10000\n' +
					'  C,0,0,1000,255,255,255,0,0,0\n' +
					'  C,0,2000,,100,100,100\n' +
					'  F,0,0,1000,0,1\n' +
					'  F,0,2000,,0.5\n' +
					'  M,0,0,1000,0,0,100,100\n' +
					'  M,0,2000,,200,200\n' +
					'  MX,0,0,1000,0,100\n' +
					'  MX,0,2000,,200\n' +
					'  MY,0,0,1000,0,100\n' +
					'  MY,0,2000,,200\n' +
					`  R,0,0,1000,0,${Math.PI / 2}\n` +
					`  R,0,2000,,${Math.PI}\n` +
					'  S,0,0,1000,1,2\n' +
					'  S,0,2000,,3\n' +
					'  V,0,0,1000,1,1,100,100\n' +
					'  V,0,2000,,200,200\n' +
					'//Storyboard Layer 1 (Foreground)\n' +
					'//Storyboard Layer 2 (Fail)\n' +
					'//Storyboard Layer 3 (Pass)\n' +
					'//Storyboard Layer 4 (Overlay)\n' +
					'//Storyboard Sound Samples\n'
			)
		})
	})

	it('should be able to use a custom expression', () => {
		useContext(createContext())

		const customExpression = () => {
			fade(0, 1000, 0, 1)
			move(0, 1000, { x: 0, y: 0 }, { x: 100, y: 100 })
		}

		createSprite('test.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
			customExpression()
		})

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
})
