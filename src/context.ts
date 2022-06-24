import { isLoopCommand, isTriggerCommand } from 'checkCommandType'
import { isAnimation, isSprite } from 'checkObjectType'
import { Animation } from 'createAnimation'
import { Background } from 'createBackground'
import { Sample } from 'createSample'
import { Sprite } from 'createSprite'
import { Video } from 'createVideo'
import { isValidContext } from 'isValidParams'
import { Command, LoopCommand, ParameterCommand, TriggerCommand } from 'types/Command'

export type Context = {
	objects: (Sprite | Animation | Sample | Video | Background)[]
	isInvokingCommand: boolean
	isInvokingLoop: boolean
	isInvokingTrigger: boolean
	warnsEmptyObjects: boolean
}

let STORYBOARD_CONTEXT: Context | null = null

/**
 * Create a new context.
 * @returns The created context
 */
export function createContext(): Context {
	return {
		objects: [],
		isInvokingCommand: false,
		isInvokingLoop: false,
		isInvokingTrigger: false,
		warnsEmptyObjects: false,
	}
}

/**
 * Specify the context of the storyboard.
 * @param context Context
 */
export function useContext(context: Context): void {
	if (!context || !isValidContext(context)) throw new TypeError('You must use the context returned from `createContext()`.')

	const isInvokingCommand =
		STORYBOARD_CONTEXT != null &&
		(STORYBOARD_CONTEXT.isInvokingCommand || STORYBOARD_CONTEXT.isInvokingLoop || STORYBOARD_CONTEXT.isInvokingTrigger)

	if (isInvokingCommand) throw new Error("You can't set the context inside an invoke function.")

	STORYBOARD_CONTEXT = context
}

export function getContext(): Context {
	if (!STORYBOARD_CONTEXT) throw new Error('Context has not been set.')

	return STORYBOARD_CONTEXT
}

export function getObjects(): (Sprite | Animation | Sample | Video | Background)[] {
	return getContext().objects
}

export function addObject<T extends Sprite | Animation | Sample | Video | Background>(object: T) {
	return getContext().objects.push(object)
}

export function addCommandToCurrentObject<T extends Command | ParameterCommand | LoopCommand | TriggerCommand>(command: T) {
	const currentObject = getObjects()[getObjects().length - 1]

	if (!getObjects().length || !getContext().isInvokingCommand || (!isSprite(currentObject) && !isAnimation(currentObject)))
		throw new Error(`${command.__name__} command must be called inside an invoke function.`)

	if (getContext().isInvokingLoop) {
		const currentLoopCommand = currentObject.commands[currentObject.commands.length - 1]

		if (isLoopCommand(currentLoopCommand) && !isLoopCommand(command) && !isTriggerCommand(command)) {
			currentLoopCommand.commands.push(command)
		} else {
			throw new Error(`${command.__name__} command must not be called inside a loop command.`)
		}
	} else if (getContext().isInvokingTrigger) {
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
	getContext().isInvokingCommand = value
}

export function isInvokingCommand() {
	return getContext().isInvokingCommand
}

export function setIsInvokingLoop(value: boolean) {
	getContext().isInvokingLoop = value
}

export function isInvokingLoop() {
	return getContext().isInvokingLoop
}

export function setIsInvokingTrigger(value: boolean) {
	getContext().isInvokingTrigger = value
}

export function isInvokingTrigger() {
	return getContext().isInvokingTrigger
}

/**
 * Warns empty sprite & animation objects.
 */
export function warnsEmptyObjects() {
	getContext().warnsEmptyObjects = true
}

export function doesWarnEmptyObject() {
	return getContext().warnsEmptyObjects
}
