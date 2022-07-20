import { Context, createContext, useContext } from 'context'
import { createSprite } from 'createSprite'
import { Layer, Origin } from 'index'

describe('context', () => {
	it('should throw error when context is invalid', () => {
		expect(() => {
			useContext({} as Context)
		}).toThrowError('You must use the context returned from `createContext()`.')
	})

	it('should throw error when create object before context is set', () => {
		expect(() => {
			createSprite('test.png', Layer.Background, Origin.Centre, [320, 240], () => {})
		}).toThrowError(`Context has not been set.`)
	})

	it('should throw error when called called `useContext` inside an invoke function', () => {
		expect(() => {
			useContext(createContext())

			createSprite('test.png', Layer.Background, Origin.Centre, [320, 240], () => {
				useContext(createContext())
			})
		}).toThrowError(`You can't set the context inside an invoke function.`)
	})
})
