import { fade } from 'commands'
import { createSprite } from 'createSprite'
import { Layer } from 'types/Layer'
import { Origin } from 'types/Origin'

export function HideBg(path: string) {
	createSprite(path, Layer.Background, Origin.Centre, [320, 240], () => {
		fade(0, 0)
	})
}
