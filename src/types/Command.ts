import { Color } from './Color'
import { Easing } from './Easing'
import { TriggerType } from './TriggerType'
import { Vector2 } from './Vector2'

export type Command = {
	__name__: string
	type: CommandType
	easing: Easing
	startTime: number
	endTime: number
	startValue: number | Color | Vector2
	endValue: number | Color | Vector2
}

export type CommandType = 'F' | 'M' | 'MX' | 'MY' | 'S' | 'V' | 'R' | 'C'

export type ParameterCommand = {
	__name__: 'Parameter'
	type: 'P'
	easing: Easing
	startTime: number
	endTime: number
	parameter: Parameter
}

export enum Parameter {
	FlipHorizontal = 'H',
	FlipVertical = 'V',
	AdditiveBlending = 'A',
}

export type LoopCommand = {
	__name__: 'Loop'
	type: 'L'
	startTime: number
	count: number
	commands: (Command | ParameterCommand)[]
}

export type TriggerCommand = {
	__name__: 'Trigger'
	type: 'T'
	triggerType: TriggerType
	startTime: number
	endTime: number
	commands: (Command | ParameterCommand)[]
}
