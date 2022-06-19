import { color } from 'commands/color'

it('should throw error when command is called outside of invoke function', () => {
	expect(() => {
		color(0, 1000, { r: 255, g: 255, b: 255 }, { r: 0, g: 0, b: 0 })
	}).toThrowError(`Color command must be called inside an invoke function.`)
})
