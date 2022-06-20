import { isCommand, isLoopCommand, isParameterCommand, isTriggerCommand } from 'checkCommandType'
import { isAnimation, isSprite } from 'checkObjectType'
import { getObjects } from 'context'
import { Animation } from 'createAnimation'
import { Sprite } from 'createSprite'
import { Command, CommandType, LoopCommand, ParameterCommand, TriggerCommand } from 'types/Command'

/**
 * Get a report for each object that has overlapping commands.
 */
export function getReportForOverlappingCommands() {
	const objects = getObjects().filter((object): object is Sprite | Animation => isSprite(object) || isAnimation(object))

	objects.forEach((object) => {
		let hasOverlap
		const nonLoopCommand = object.commands.filter(
			(command): command is Command | ParameterCommand => isCommand(command) || isParameterCommand(command)
		)

		hasOverlap = (['F', 'M', 'MX', 'MY', 'S', 'V', 'R', 'C', 'P'] as (CommandType | 'P')[]).some((type) =>
			hasOverlappingCommands(nonLoopCommand, type)
		)

		if (hasOverlap) {
			console.warn(`${object.type} "${object.path}" has overlapping commands.`)
			return
		}

		const loopAndTriggerCommands = object.commands.filter(
			(command): command is LoopCommand | TriggerCommand => isLoopCommand(command) || isTriggerCommand(command)
		)

		hasOverlap = loopAndTriggerCommands.some((command) =>
			(['F', 'M', 'MX', 'MY', 'S', 'V', 'R', 'C', 'P'] as (CommandType | 'P')[]).some((type) => hasOverlappingCommands(command.commands, type))
		)

		if (hasOverlap) {
			console.warn(`${object.type} "${object.path}" has overlapping commands.`)
			return
		}
	})
}

export function hasOverlappingCommands(commands: (Command | ParameterCommand | LoopCommand | TriggerCommand)[], type: CommandType | 'P'): boolean {
	const filteredCommands = commands.filter((command): command is Command | ParameterCommand => command.type === type)

	if (filteredCommands.length > 1) {
		for (let i = 0; i < filteredCommands.length; i++) {
			const currentCommand = filteredCommands[i]
			for (let j = i + 1; j < filteredCommands.length; j++) {
				const toBeComparedCommand = filteredCommands[j]

				if (
					(toBeComparedCommand.startTime > currentCommand.startTime && toBeComparedCommand.startTime < currentCommand.endTime) ||
					(toBeComparedCommand.endTime < currentCommand.startTime && toBeComparedCommand.endTime > currentCommand.endTime)
				)
					return true
			}
		}
	}

	return false
}
