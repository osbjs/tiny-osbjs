import { addCommandToCurrentObject } from 'src/context'
import { tryParseTimestamp } from 'src/tryParseTimestamp'
import { Parameter, ParameterCommand } from 'src/types/Command'
import { Easing } from 'src/types/Easing'

/**
 * Unlike the other commands, which can be seen as setting endpoints along continually-tracked values,
 * the `parameter` command apply ONLY while they are active,
 * i.e.,you can't put a command from timestamps 1000 to 2000 and expect the value to apply at time 3000,
 * even if the object's other commands aren't finished by that point.
 *
 * @param startTime Time in milliseconds/timestamp indicate when the event will start.
 * @param endTime Time in milliseconds/timestamp indicate when the event will end.
 * @param parameter `Parameter` to apply.
 */
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
