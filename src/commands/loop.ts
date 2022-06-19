import { addCommandToCurrentObject, setIsInvokingLoop } from 'src/context'
import { tryParseTimestamp } from 'src/tryParseTimestamp'
import { LoopCommand } from 'src/types/Command'
import { Timestamp } from 'src/types/Timestamp'

/**
 * Create a loop group.
 *
 * Loops can be defined to repeat a set of events constantly for a set number of iterations.
 * Note that events inside a loop should be timed with a zero-base.
 * This means that you should start from 0ms for the inner event's timing and work up from there.
 * The loop event's start time will be added to this value at game runtime.
 *
 * @param startTime Time in milliseconds/timestamp at which the loop begins.
 * @param count The number of times the loop executes before stopping.
 * @param invokeFunction The commands that should be run when the trigger group is created.
 */
export function loop(startTime: number | Timestamp, count: number, invokeFunction: () => void) {
	addCommandToCurrentObject<LoopCommand>({
		__name__: 'Loop',
		type: 'L',
		startTime: tryParseTimestamp(startTime),
		count,
		commands: [],
	})
	setIsInvokingLoop(true)
	invokeFunction()
	setIsInvokingLoop(false)
}
