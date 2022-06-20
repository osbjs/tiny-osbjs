import { fade, loop } from 'commands'
import { createContext, useContext } from 'context'
import { createSprite } from 'createSprite'
import { getReportForOverlappingCommands } from 'getReportForOverlappingCommands'

describe('get report for overlapping commands', () => {
	it('should log every object with overlapping commands', () => {
		useContext(createContext())

		createSprite('sprites/overlap.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
			fade(0, 1000, 0, 1)
			fade(500, 2000, 1, 0)
		})

		createSprite('sprites/not-overlap.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
			fade(0, 1000, 0, 1)
			fade(1000, 2000, 1, 0)
		})

		createSprite('sprites/overlap-in-loop.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
			loop(5000, 3, () => {
				fade(0, 1000, 0, 1)
				fade(500, 2000, 1, 0)
			})
		})

		const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {})

		getReportForOverlappingCommands()

		expect(consoleWarn).toHaveBeenCalledWith('Sprite "sprites/overlap.png" has overlapping commands.')
		expect(consoleWarn).toHaveBeenCalledWith('Sprite "sprites/overlap-in-loop.png" has overlapping commands.')

		consoleWarn.mockRestore()
	})
})
