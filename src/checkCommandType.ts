import { Command, ParameterCommand, LoopCommand, TriggerCommand } from 'types/Command'

export function isCommand(c: Command | ParameterCommand | LoopCommand | TriggerCommand): c is Command {
	return ['F', 'M', 'MX', 'MY', 'S', 'V', 'R', 'C'].includes(c.type)
}

export function isParameterCommand(c: Command | ParameterCommand | LoopCommand | TriggerCommand): c is ParameterCommand {
	return c.type === 'P'
}

export function isLoopCommand(c: Command | ParameterCommand | LoopCommand | TriggerCommand): c is LoopCommand {
	return c.type === 'L'
}

export function isTriggerCommand(c: Command | ParameterCommand | LoopCommand | TriggerCommand): c is TriggerCommand {
	return c.type === 'T'
}
