import { isLoopCommand, isTriggerCommand } from 'checkCommandType'
import { isSprite, isAnimation } from 'checkObjectType'
import { Animation } from 'createAnimation'
import { Background } from 'createBackground'
import { Sample } from 'createSample'
import { Sprite } from 'createSprite'
import { Video } from 'createVideo'
import { Command, ParameterCommand, LoopCommand, TriggerCommand } from 'types/Command'

const STORYBOARD_CONTEXT: Context = {
	objects: [],
	isInvokingCommand: false,
	isInvokingLoop: false,
	isInvokingTrigger: false,
}

export type Context = {
	objects: (Sprite | Animation | Sample | Video | Background)[]
	isInvokingCommand: boolean
	isInvokingLoop: boolean
	isInvokingTrigger: boolean
}

export function getObjects(): (Sprite | Animation | Sample | Video | Background)[] {
	return STORYBOARD_CONTEXT.objects
}

export function addObject<T extends Sprite | Animation | Sample | Video | Background>(object: T) {
	return STORYBOARD_CONTEXT.objects.push(object)
}

export function addCommandToCurrentObject<T extends Command | ParameterCommand | LoopCommand | TriggerCommand>(command: T) {
	const currentObject = STORYBOARD_CONTEXT.objects[STORYBOARD_CONTEXT.objects.length - 1]

	if (!STORYBOARD_CONTEXT.isInvokingCommand || (!isSprite(currentObject) && !isAnimation(currentObject)))
		throw new Error(`${command.__name__} command must be called inside an invoke function.`)

	if (STORYBOARD_CONTEXT.isInvokingLoop) {
		const currentLoopCommand = currentObject.commands[currentObject.commands.length - 1]

		if (isLoopCommand(currentLoopCommand) && !isLoopCommand(command) && !isTriggerCommand(command)) {
			currentLoopCommand.commands.push(command)
		} else {
			throw new Error(`${command.__name__} command must not be called inside a loop command.`)
		}
	} else if (STORYBOARD_CONTEXT.isInvokingTrigger) {
		const currentTriggerCommand = currentObject.commands[currentObject.commands.length - 1]

		if (isTriggerCommand(currentTriggerCommand) && !isLoopCommand(command) && !isTriggerCommand(command)) {
			currentTriggerCommand.commands.push(command)
		} else {
			throw new Error(`${command.__name__} command must not be called inside a trigger command.`)
		}
	} else {
		currentObject.commands.push(command)
	}
}

export function setIsInvokingCommand(value: boolean) {
	STORYBOARD_CONTEXT.isInvokingCommand = value
}

export function setIsInvokingLoop(value: boolean) {
	STORYBOARD_CONTEXT.isInvokingLoop = value
}

export function setIsInvokingTrigger(value: boolean) {
	STORYBOARD_CONTEXT.isInvokingTrigger = value
}
