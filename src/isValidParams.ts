import { AnimationLoopType } from 'createAnimation'
import { Layer } from 'types/Layer'
import { Origin } from 'types/Origin'
import { Vector2 } from 'types/Vector2'

export function isValidLayer(layer: string): layer is Layer {
	return ['Background', 'Foreground', 'Fail', 'Pass', 'Overlay'].includes(layer)
}

export function isValidOrigin(origin: string): origin is Origin {
	return ['TopLeft', 'TopCenter', 'TopRight', 'CenterLeft', 'Center', 'CenterRight', 'BottomLeft', 'BottomCenter', 'BottomRight'].includes(origin)
}

export function isValidVector2(vector: Vector2): vector is Vector2 {
	return typeof vector.x === 'number' && typeof vector.y === 'number'
}

export function isValidAnimationLoopType(loopType: string): loopType is AnimationLoopType {
	return ['LoopForever', 'LoopOnce'].includes(loopType)
}
