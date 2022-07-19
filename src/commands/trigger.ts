import { addCommandToCurrentObject, setIsInvokingTrigger } from 'context'
import { isValidTriggerType } from 'isValidParams'
import { tryParseTimestamp } from 'tryParseTimestamp'
import { TriggerCommand, TriggerType } from 'types/Command'
import { Timestamp } from 'types/Timestamp'

/**
 * Create a trigger group.
 *
 * Trigger loops can be used to trigger animations based on play-time events.
 * Although called loops, trigger loops only execute once when triggered.
 * Trigger loops are zero-based similar to normal loops.
 * If two overlap, the first will be halted and replaced by a new loop from the beginning.
 * If they overlap any existing storyboarded events, they will not trigger until those transformations are no in effect.
 *
 * @param triggerType The trigger condition, see https://osu.ppy.sh/wiki/en/Storyboard/Scripting/Compound_Commands#trigger-(t)-command.
 * @param time [startTime, endTime] time in milliseconds/timestamp at which the trigger is valid.
 * @param invokeFunction The commands that should be run when the trigger group is created.
 */
export function trigger(time: [number | Timestamp, number | Timestamp], triggerType: TriggerType, invokeFunction: () => void) {
	if (!isValidTriggerType(triggerType)) throw new Error(`${triggerType} is not a valid trigger type.`)

	let startTime: number, endTime: number

	if (time instanceof Array) {
		startTime = tryParseTimestamp(time[0])
		endTime = tryParseTimestamp(time[1])
	} else {
		startTime = endTime = tryParseTimestamp(time)
	}

	addCommandToCurrentObject<TriggerCommand>({
		__name__: 'Trigger',
		type: 'T',
		triggerType,
		startTime,
		endTime,
		commands: [],
	})
	setIsInvokingTrigger(true)
	invokeFunction()
	setIsInvokingTrigger(false)
}
