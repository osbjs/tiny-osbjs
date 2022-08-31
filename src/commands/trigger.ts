import { addCommandToCurrentObject, setIsInvokingTrigger } from 'context'
import { isValidTriggerType } from 'isValidParams'
import { TriggerCommand } from 'types/Command'
import { TimeRange } from 'types/TimeRange'
import { Addition, SampleSet, TriggerType } from 'types/TriggerType'
import { validateAndExtractTime } from './utils/extractCommandArguments'

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
 * You can use `makeTriggerType` helper if you are unsure about the syntax.
 * @param time [startTime, endTime] time in milliseconds/timestamp at which the trigger is valid.
 * @param invokeFunction The commands that should be run when the trigger group is created.
 */
export function trigger(time: TimeRange, triggerType: TriggerType, invokeFunction: () => void) {
	if (!isValidTriggerType(triggerType)) throw new Error(`${triggerType} is not a valid trigger type.`)

	const [startTime, endTime] = validateAndExtractTime(time)

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

/**
 * Helper to create `TriggerType`
 * @param sampleSet All / Normal / Soft / Drum
 * @param additionsSampleSet All / Normal / Soft / Drum
 * @param addition Whistle / Finish / Clap
 * @param customSampleSet Custom sample number
 */
export function makeTriggerType(sampleSet: SampleSet, additionsSampleSet: SampleSet, addition: Addition, customSampleSet?: number): TriggerType {
	return `HitSound${sampleSet}${additionsSampleSet}${addition}${customSampleSet ?? ''}`
}
