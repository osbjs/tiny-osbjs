import { addCommandToCurrentObject, setIsInvokingTrigger } from 'src/context'
import { tryParseTimestamp } from 'src/tryParseTimestamp'
import { TriggerCommand, TriggerType } from 'src/types/Command'
import { Timestamp } from 'src/types/Timestamp'

export function trigger(triggerName: TriggerType, startTime: number | Timestamp, endTime: number | Timestamp, invokeFunction: () => void) {
	addCommandToCurrentObject<TriggerCommand>({
		__name__: 'Trigger',
		type: 'T',
		triggerName,
		startTime: tryParseTimestamp(startTime),
		endTime: tryParseTimestamp(endTime),
		commands: [],
	})
	setIsInvokingTrigger(true)
	invokeFunction()
	setIsInvokingTrigger(false)
}
