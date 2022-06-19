import { addCommandToCurrentObject } from 'src/context'
import { tryParseTimestamp } from 'src/tryParseTimestamp'
import { Parameter, ParameterCommand } from 'src/types/Command'
import { Easing } from 'src/types/Easing'

export function parameter(startTime: number, endTime: number, parameter: Parameter, easing: Easing) {
	addCommandToCurrentObject<ParameterCommand>({
		__name__: 'Parameter',
		type: 'P',
		easing,
		startTime: tryParseTimestamp(startTime),
		endTime: tryParseTimestamp(endTime),
		parameter,
	})
}
