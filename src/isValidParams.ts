import { Context } from 'context'
import { AudioPath } from 'types/AudioPath'
import { Color } from 'types/Color'
import { Parameter } from 'types/Command'
import { Easing } from 'types/Easing'
import { Layer } from 'types/Layer'
import { LoopType } from 'types/LoopType'
import { Origin } from 'types/Origin'
import { TimePair } from 'types/TimePair'
import { Time } from 'types/Timestamp'
import { TriggerType } from 'types/TriggerType'
import { Vector2 } from 'types/Vector2'

export function isValidLayer(layer: any): layer is Layer {
	return typeof layer == 'string' && ['Background', 'Foreground', 'Fail', 'Pass', 'Overlay'].includes(layer)
}

export function isValidOrigin(origin: any): origin is Origin {
	return (
		typeof origin == 'string' &&
		['TopLeft', 'TopCentre', 'TopRight', 'CentreLeft', 'Centre', 'CentreRight', 'BottomLeft', 'BottomCentre', 'BottomRight'].includes(origin)
	)
}

export function isValidVector2(vector: any): vector is Vector2 {
	return Array.isArray(vector) && vector.length == 2 && vector.every((v) => typeof v == 'number')
}

export function isValidAnimationLoopType(loopType: any): loopType is LoopType {
	return ['LoopForever', 'LoopOnce'].includes(loopType)
}

export function isValidParameter(parameter: any): parameter is Parameter {
	return typeof parameter == 'string' && ['H', 'V', 'A'].includes(parameter)
}

export function isValidColor(color: any): color is Color {
	return Array.isArray(color) && color.length == 3 && color.every((v) => typeof v == 'number')
}

export function isValidEasing(easing: any): easing is Easing {
	return typeof easing === 'number' && easing >= 0 && easing <= 34
}

export function isValidTriggerType(triggerType: any): triggerType is TriggerType {
	return typeof triggerType == 'string' && /HitSound(All|Normal|Soft|Drum)?(All|Normal|Soft|Drum)?(Whistle|Finish|Clap)?\d*/.test(triggerType)
}

export function isValidAudioType(audioType: any): audioType is AudioPath {
	return typeof audioType == 'string' && /.+\.mp3|.+\.ogg|.+\.wav/.test(audioType)
}

export function isValidContext(context: any): context is Context {
	return (
		typeof context == 'object' &&
		Array.isArray(context.objects) &&
		typeof context.isInvokingCommand == 'boolean' &&
		typeof context.isInvokingLoop == 'boolean' &&
		typeof context.isInvokingTrigger == 'boolean' &&
		typeof context.warnsEmptyObjects == 'boolean'
	)
}

export function isValidTimePair(times: any): times is TimePair {
	return (
		Array.isArray(times) &&
		times.length == 2 &&
		times.every((t) => typeof t == 'number' || (typeof t == 'string' && /^(\d{2,}):(\d{2}):(\d{3})$/.test(t)))
	)
}

export function isValidTime(time: any): time is Time {
	return typeof time == 'number' || (typeof time == 'string' && /^(\d{2,}):(\d{2}):(\d{3})$/.test(time))
}
