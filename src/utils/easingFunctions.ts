import { Easing } from 'types/Easing'

const PI = Math.PI

export function easeInSine(x: number): number {
	return 1 - Math.cos((x * PI) / 2)
}

export function easeOutSine(x: number): number {
	return Math.sin((x * PI) / 2)
}

export function easeInOutSine(x: number): number {
	return -(Math.cos(PI * x) - 1) / 2
}

export function easeInCubic(x: number): number {
	return x * x * x
}

export function easeOutCubic(x: number): number {
	return 1 - Math.pow(1 - x, 3)
}

export function easeInOutCubic(x: number): number {
	return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}

export function easeInQuint(x: number): number {
	return x * x * x * x * x
}

export function easeOutQuint(x: number): number {
	return 1 - Math.pow(1 - x, 5)
}

export function easeInOutQuint(x: number): number {
	return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2
}

export function easeInCirc(x: number): number {
	return 1 - Math.sqrt(1 - Math.pow(x, 2))
}

export function easeOutCirc(x: number): number {
	return Math.sqrt(1 - Math.pow(x - 1, 2))
}

export function easeInOutCirc(x: number): number {
	return x < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2
}

export function easeInElastic(x: number): number {
	const c4 = (2 * Math.PI) / 3

	return x === 0 ? 0 : x === 1 ? 1 : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4)
}

export function easeOutElastic(x: number): number {
	const c4 = (2 * Math.PI) / 3

	return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1
}

export function easeOutElasticHalf(x: number): number {
	return Math.pow(2, -10 * x) * Math.sin(((0.5 * x - 0.075) * (2 * Math.PI)) / 0.3) + 1
}

export function easeOutElasticQuarter(x: number): number {
	return Math.pow(2, -10 * x) * Math.sin(((0.25 * x - 0.075) * (2 * Math.PI)) / 0.3) + 1
}

export function easeInOutElastic(x: number): number {
	const c5 = (2 * Math.PI) / 4.5

	return x === 0
		? 0
		: x === 1
		? 1
		: x < 0.5
		? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
		: (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1
}

export function easeInQuad(x: number): number {
	return x * x
}

export function easeOutQuad(x: number): number {
	return 1 - (1 - x) * (1 - x)
}

export function easeInOutQuad(x: number): number {
	return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
}

export function easeInQuart(x: number): number {
	return x * x * x * x
}

export function easeOutQuart(x: number): number {
	return 1 - Math.pow(1 - x, 4)
}

export function easeInOutQuart(x: number): number {
	return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2
}

export function easeInExpo(x: number): number {
	return x === 0 ? 0 : Math.pow(2, 10 * x - 10)
}

export function easeOutExpo(x: number): number {
	return x === 1 ? 1 : 1 - Math.pow(2, -10 * x)
}

export function easeInOutExpo(x: number): number {
	return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2
}

export function easeInBack(x: number): number {
	const c1 = 1.70158
	const c3 = c1 + 1

	return c3 * x * x * x - c1 * x * x
}

export function easeOutBack(x: number): number {
	const c1 = 1.70158
	const c3 = c1 + 1

	return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
}

export function easeInOutBack(x: number): number {
	const c1 = 1.70158
	const c2 = c1 * 1.525

	return x < 0.5 ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2
}

export function easeInBounce(x: number): number {
	return 1 - easeOutBounce(1 - x)
}

export function easeOutBounce(x: number): number {
	const n1 = 7.5625
	const d1 = 2.75

	if (x < 1 / d1) {
		return n1 * x * x
	} else if (x < 2 / d1) {
		return n1 * (x -= 1.5 / d1) * x + 0.75
	} else if (x < 2.5 / d1) {
		return n1 * (x -= 2.25 / d1) * x + 0.9375
	} else {
		return n1 * (x -= 2.625 / d1) * x + 0.984375
	}
}

export function easeInOutBounce(x: number): number {
	return x < 0.5 ? (1 - easeOutBounce(1 - 2 * x)) / 2 : (1 + easeOutBounce(2 * x - 1)) / 2
}

export function toEasingFn(easing: Easing): (x: number) => number {
	switch (easing) {
		case Easing.In:
			return easeInQuad

		case Easing.Out:
			return easeOutQuad

		case Easing.InQuad:
			return easeInQuad

		case Easing.OutQuad:
			return easeOutQuad

		case Easing.InOutQuad:
			return easeInOutQuad

		case Easing.InCubic:
			return easeInCubic

		case Easing.OutCubic:
			return easeOutCubic

		case Easing.InOutCubic:
			return easeInOutCubic

		case Easing.InQuart:
			return easeInQuart

		case Easing.OutQuart:
			return easeOutQuart

		case Easing.InOutQuart:
			return easeInOutQuart

		case Easing.InQuint:
			return easeInQuint

		case Easing.OutQuint:
			return easeOutQuint

		case Easing.InOutQuint:
			return easeInOutQuint

		case Easing.InSine:
			return easeInSine

		case Easing.OutSine:
			return easeOutSine

		case Easing.InOutSine:
			return easeInOutSine

		case Easing.InExpo:
			return easeInExpo

		case Easing.OutExpo:
			return easeOutExpo

		case Easing.InOutExpo:
			return easeInOutExpo

		case Easing.InCirc:
			return easeInCirc

		case Easing.OutCirc:
			return easeOutCirc

		case Easing.InOutCirc:
			return easeInOutCirc

		case Easing.InElastic:
			return easeInElastic

		case Easing.OutElastic:
			return easeOutElastic

		case Easing.OutElasticHalf:
			return easeOutElasticHalf

		case Easing.OutElasticQuarter:
			return easeOutElasticQuarter

		case Easing.InOutElastic:
			return easeInOutElastic

		case Easing.InBack:
			return easeInBack

		case Easing.OutBack:
			return easeOutBack

		case Easing.InOutBack:
			return easeInOutBack

		case Easing.InBounce:
			return easeInBounce

		case Easing.OutBounce:
			return easeOutBounce

		case Easing.InOutBounce:
			return easeInOutBounce

		default:
			return (x) => x
	}
}