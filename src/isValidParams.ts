import { Context } from 'context'
import { AnimationLoopType } from 'createAnimation'
import { AudioPath } from 'types/AudioPath'
import { Color } from 'types/Color'
import { Parameter, TriggerType } from 'types/Command'
import { Easing } from 'types/Easing'
import { Layer } from 'types/Layer'
import { Origin } from 'types/Origin'
import { Vector2 } from 'types/Vector2'

export function isValidLayer(layer: string): layer is Layer {
	return ['Background', 'Foreground', 'Fail', 'Pass', 'Overlay'].includes(layer)
}

export function isValidOrigin(origin: string): origin is Origin {
	return ['TopLeft', 'TopCentre', 'TopRight', 'CentreLeft', 'Centre', 'CentreRight', 'BottomLeft', 'BottomCentre', 'BottomRight'].includes(origin)
}

export function isValidVector2(vector: Vector2): vector is Vector2 {
	return typeof vector.x === 'number' && typeof vector.y === 'number'
}

export function isValidAnimationLoopType(loopType: string): loopType is AnimationLoopType {
	return ['LoopForever', 'LoopOnce'].includes(loopType)
}

export function isValidParameter(parameter: string | Parameter): parameter is Parameter {
	return ['H', 'V', 'A'].includes(parameter)
}

export function isValidColor(color: Color): color is Color {
	return typeof color.r === 'number' && typeof color.g === 'number' && typeof color.b === 'number'
}

export function isValidEasing(easing: number | Easing): easing is Easing {
	return typeof easing === 'number' && easing >= 0 && easing <= 34
}

export function isValidTriggerType(triggerType: string): triggerType is TriggerType {
	return /HitSound(All|Normal|Soft|Drum)?(All|Normal|Soft|Drum)?(Whistle|Finish|Clap)?\d*/.test(triggerType)
}

export function isValidAudioType(audioType: string): audioType is AudioPath {
	return /.+\.mp3|.+\.ogg|.+\.wav/.test(audioType)
}

export function isValidContext(context: Context): context is Context {
	return (
		typeof context == 'object' &&
		Array.isArray(context.objects) &&
		typeof context.isInvokingCommand == 'boolean' &&
		typeof context.isInvokingLoop == 'boolean' &&
		typeof context.isInvokingTrigger == 'boolean' &&
		typeof context.warnsEmptyObjects == 'boolean'
	)
}
