import { color } from 'commands'
import { Context, createContext, useContext } from 'context'
import { createSprite } from 'createSprite'

describe('context', () => {
	it('should throw error when context is invalid', () => {
		expect(() => {
			useContext({} as Context)
		}).toThrowError('You must use the context returned from `createContext()`.')
	})

	it('should throw error when create object before context is set', () => {
		expect(() => {
			createSprite('test.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
				color(0, 1000, { r: 255, g: 255, b: 255 }, { r: 0, g: 0, b: 0 })
			})
		}).toThrowError(`Context has not been set.`)
	})

	it('should throw error when called called `useContext` inside an invoke function', () => {
		expect(() => {
			useContext(createContext())

			createSprite('test.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
				useContext(createContext())
			})
		}).toThrowError(`You can't set the context inside an invoke function.`)
	})
})
