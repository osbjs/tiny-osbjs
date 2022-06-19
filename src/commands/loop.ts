import { addCommandToCurrentObject, setIsInvokingLoop } from 'src/context'
import { tryParseTimestamp } from 'src/tryParseTimestamp'
import { LoopCommand } from 'src/types/Command'
import { Timestamp } from 'src/types/Timestamp'

export function loop(startTime: number | Timestamp, loopCount: number, invokeFunction: () => void) {
	addCommandToCurrentObject<LoopCommand>({
		__name__: 'Loop',
		type: 'L',
		startTime: tryParseTimestamp(startTime),
		count: loopCount,
		commands: [],
	})
	setIsInvokingLoop(true)
	invokeFunction()
	setIsInvokingLoop(false)
}
