# tiny-osbjs
A declarative osu! storyboard library with zero dependencies and zero configurations.

## Install
```bash
npm install @osbjs/tiny-osbjs@latest
```

## Setup your project
It's strongly recommended to use `TypeScript` and a text editor/IDE with good `TypeScript` support like `VSCode` for better developing experience.
```bash
npm install -D typescript
```

Install `node-dev` as a global package so you can use it anywhere (you will only need to do this once).
```bash
npm install -g node-dev
```

If you are using TypeScript, install `ts-node` as dev-dependency
```bash
npm install -D ts-node
```

Then add this script to your package.json:
```json
...
"scripts": {
	"start": "node-dev index.js" // or "node-dev index.ts" if you are using TypeScript
}
```
`index.js` (`index.ts`) is the entry point to your storyboard. This way when you run `npm start` it will automatically rebuild your storyboard when you change your code.

## Usage
Before you do anything, you have to create a storyboard context and tell the library to use it. This context is shared accross the whole project. 
```javascript
const { createContext, useContext } = require('@osbjs/tiny-osbjs')

const context = createContext()
useContext(context)
```

Then you can start creating storyboard objects.
```javascript
const { createSprite, Layer, Origin } = require('tiny-osbjs')

createSprite('test.png', Layer.Background, Origin.Centre, [320, 240], () => {})
```

If you want to create a storyboard for each difficulty, you must specify the context at the entry point of each storyboard.
```javascript
// difficulty1.js
const { createContext, useContext } = require('@osbjs/tiny-osbjs')

function difficulty1Storyboard() {
	const context = createContext()
	useContext(context)

	// createSprite...
}
function difficulty2Storyboard() {
	const context = createContext()
	useContext(context)

	// createSprite...
}

difficulty1Storyboard()
difficulty2Storyboard()
```

Most of the commands will have their syntax look like this (except for a few special commands):
```ts
commandName([startTime, endTime], startValue, endValue, easing)
commandName([startTime, endTime], value)
commandName(time, value)
```

The killer-feature of `tiny-osb` is that you can specify the commands in a declarative way and the library will know which objects they are refering to.
```javascript
const { createSprite, Layer, Origin, fade, loop } = require('@osbjs/tiny-osbjs')

createSprite('test.png', Layer.Background, Origin.Centre, [320, 240], () => {
	fade([0, 1000], 0, 1, Easing.Out) // refers to sprite

	loop(3000, 5, () => {
		fade([0, 1000], 0, 1, Easing.Out) // refers to loop
	})
})
```

You can pass osu timestamp to the start time/end time of the command and the library will try to parse it.
```javascript
const { createSprite, Layer, Origin, fade, loop } = require('@osbjs/tiny-osbjs')

createSprite('test.png', Layer.Background, Origin.Centre, [320, 240], () => {
	fade([0, "00:00:015"], 0, 1) // this works
})
```

Finally, you can generate osb string of the storyboard. You can use that string to export to osb file.
```javascript
const { generateStoryboardOsb } = require('@osbjs/tiny-osbjs')

fs.writeFileSync('Artist - Song (Creator).osb', generateStoryboardOsb(), 'utf8')
```

Your final storyboard will look like this:
```js
const { createContext, createSprite, fade, generateStoryboardOsb, Layer, Origin, useContext } = require('@osbjs/tiny-osbjs')

const context = createContext()
useContext(context)

createSprite('test.png', Layer.Background, Origin.Centre, [320, 240], () => {
	fade([0, 1000], 0, 1)
})

fs.writeFileSync('Artist - Song (Creator).osb', generateStoryboardOsb(), 'utf8')
```

## API documentation

### Common types
```ts
// [r, g, b] respectively
type Color = [number, number, number]

// [x, y] respectively
type Vector2 = [number, number]

// ex: 01:29:345
type Timestamp = `${number}:${number}:${number}`

type Time = Timestamp | number

type TimePair = [Time, Time]

enum Layer {
	Background = 'Background',
	Foreground = 'Foreground',
	Fail = 'Fail',
	Pass = 'Pass',
	Overlay = 'Overlay',
}

enum Origin {
	TopLeft = 'TopLeft',
	TopCentre = 'TopCentre',
	TopRight = 'TopRight',
	CentreRight = 'CentreRight',
	Centre = 'Centre',
	CentreLeft = 'CentreLeft',
	BottomLeft = 'BottomLeft',
	BottomCentre = 'BottomCentre',
	BottomRight = 'BottomRight',
}

enum Easing {
	Linear,
	Out,
	In,
	InQuad,
	OutQuad,
	InOutQuad,
	InCubic,
	OutCubic,
	InOutCubic,
	InQuart,
	OutQuart,
	InOutQuart,
	InQuint,
	OutQuint,
	InOutQuint,
	InSine,
	OutSine,
	InOutSine,
	InExpo,
	OutExpo,
	InOutExpo,
	InCirc,
	OutCirc,
	InOutCirc,
	InElastic,
	OutElastic,
	OutElasticHalf,
	OutElasticQuarter,
	InOutElastic,
	InBack,
	OutBack,
	InOutBack,
	InBounce,
	OutBounce,
	InOutBounce,
}
```

### createContext
```typescript
function createContext(): Context
```
Create a new context.

### useContext
```typescript
function useContext(context: Context)
```
Specify the context of the storyboard.

### createBackground
```typescript
function createBackground(path: string)
```
Create a new Background image. You should only use this if you are generating a storyboard for a specific osu difficulty.

### createVideo
```typescript
function createVideo(path: string, offset: number)
```
Create a new Video. You should only use this if you are generating a storyboard for a specific osu difficulty.

### createSample
```typescript
function createSample(
	startTime: number,
	layer: SampleLayer,
	path: AudioPath,
	volume: number
)

type AudioPath = `${string}.mp3` | `${string}.ogg` | `${string}.wav`

enum SampleLayer {
	Background,
	Fail,
	Pass,
	Foreground,
}
```
Create a new Sample.

### createSprite
```typescript
function createSprite(
	path: string,
	layer: Layer,
	origin: Origin,
	initialPosition: Vector2,
	invokeFunction: () => void
)
```
Create a new Sprite. All commands must be called inside the invoke function.

### createAnimation
```typescript
function createAnimation(
	path: string,
	layer: Layer,
	origin: Origin,
	initialPosition: Vector2,
	frameCount: number,
	frameDelay: number,
	loopType: LoopType,
	invokeFunction: () => void
)

enum LoopType {
	Forever = 'LoopForever',
	Once = 'LoopOnce',
}
```
Create a new Animation. All commands must be called inside the invoke function.

### generateStoryboardOsb
```typescript
function generateStoryboardOsb(): string
```
Generate string that can be used to create .osb file.

### replaceOsuEvents
```typescript
function replaceOsuEvents(parsedOsuDifficulty: string): string
```
Returns .osu file after replacing \[Events\] section with events generated from storyboard.

### color
```typescript
function color(time: Time | TimePair, startColor: Color, endColor: Color = startColor, easing?: Easing)
```
The virtual light source colour on the object. The colours of the pixels on the object are determined subtractively.

### fade
```typescript
function fade(time: Time | TimePair, startOpacity: number, endOpacity: number = startOpacity, easing?: Easing)
```
Change the opacity of the object.

### move
```typescript
function move(time: Time | TimePair, startPosition: Vector2, endPosition: Vector2 = startPosition, easing?: Easing)
```
Change the location of the object in the play area.

### moveX
```typescript
function moveX(time: Time | TimePair, startX: number, endX: number = startX, easing?: Easing)
```
Change the x coordinate of the object.

### moveY
```typescript
function moveY(time: Time | TimePair, startY: number, endY: number = startY, easing?: Easing)
```
Change the y coordinate of the object.

### rotate
```typescript
function rotate(time: Time | TimePair, startAngle: number, endAngle: number = startAngle, easing?: Easing)
```
Change the amount an object is rotated from its original image, in radians, clockwise.

### scale
```typescript
function scale(time: Time | TimePair, startScaleFactor: number, endScaleFactor: number = startScaleFactor, easing?: Easing)
```
Change the size of the object relative to its original size.

### scaleVec
```typescript
function scaleVec(time: Time | TimePair, startScaleVector: Vector2, endScaleVector: Vector2 = startScaleVector, easing?: Easing)
```
Change the size of the object relative to its original size, but X and Y scale separately.

### flipHorizontal
```typescript
function flipHorizontal(time: TimePair)
```
Flip the image horizontally.

### flipVertical
```ts
function flipVertical(time: TimePair)
```
Flip the image vertically.

### additiveBlending
```ts
function additiveBlending(time: TimePair)
```
Use additive-colour blending instead of alpha-blending

### loop
```typescript
function loop(startTime: Time, count: number, invokeFunction: () => void)
```
Create a loop group.

Loops can be defined to repeat a set of events constantly for a set number of iterations. Note that events inside a loop should be timed with a zero-base. This means that you should start from 0ms for the inner event's timing and work up from there. The loop event's start time will be added to this value at game runtime.

### trigger
```typescript
function trigger(time: TimePair, triggerType: TriggerType, invokeFunction: () => void)

type TriggerType = `HitSound${SampleSet}${SampleSet}${Addition}${number | ''}`

enum SampleSet {
	None = '',
	All = 'All',
	Normal = 'Normal',
	Soft = 'Soft',
	Drum = 'Drum',
}

enum Addition {
	None = '',
	Whistle = 'Whistle',
	Finish = 'Finish',
	Clap = 'Clap',
}
```
Create a trigger group.

Trigger loops can be used to trigger animations based on play-time events. Although called loops, trigger loops only execute once when triggered.Trigger loops are zero-based similar to normal loops. If two overlap, the first will be halted and replaced by a new loop from the beginning. If they overlap any existing storyboarded events, they will not trigger until those transformations are no in effect.

### makeTriggerType
```ts
function makeTriggerType(sampleSet: SampleSet, additionsSampleSet: SampleSet, addition: Addition, customSampleSet?: number): TriggerType
```
Helper to create `TriggerType`

### Angle conversion
```typescript
function degToRad(deg: number): number
```
Convert degrees to radians.

```typescript
function radToDeg(rad: number): number
```
Convert radians to degrees.

### Random
```ts
function randInt(min: number, max: number)
```
Random integer in the interval [min, max].

```ts
function randFloat(min: number, max: number)
```
Random float in the interval [min, max].

### Vector math
```ts
function addVec(v1: Vector2, v2: Vector2): Vector2
```
Adds 2 vectors and returns a new vector.

```ts
function subVec(v1: Vector2, v2: Vector2): Vector2
```
Subtracts 2nd vector from 1st vector and returns a new vector.

```ts
function mulVec(v1: Vector2, v2: Vector2): Vector2
```
Multiplies 2 vectors and returns a new vector.

```ts
function mulVecScalar(v: Vector2, s: number): Vector2
```
Multiplies both x and y with a specified scalar and returns a new vector.

```ts
function addVecScalar(v: Vector2, s: number): Vector2
```
Adds a scalar to both x and y and returns a new vector.

```ts
function dotVec(v1: Vector2, v2: Vector2): number
```
Returns the dot product of 2 vectors.

```ts
function crossVec(v1: Vector2, v2: Vector2): number
```
Returns the cross product of 2 vectors.

```ts
function lengthSqrVec(v: Vector2): number
```
Returns the length squared of the vector.

```ts
function lengthVec(v: Vector2): number
```
Returns the length of the vector.

```ts
function areEqualVecs(v1: Vector2, v2: Vector2): boolean
```
Check if 2 vectors are equals.

### cloneVec
```ts
function cloneVec(v: Vector2): Vector2
```
Return a new Vector with the same x and y with the specified vector.

### reportBuildTime
```ts
function reportBuildTime(sb: (end: () => void) => void)
```
Print to console how long it takes to generate the storyboard. Call `end()` once you have done everything.

### interpolate
```ts
function interpolate(input: number, inputRange: [number, number], outputRange: [number, number], easing: Easing = Easing.Linear): number
```
Map a value from an input range to an output range. This will clamp the result if the input is outside of the input range.

## Official plugins
- [@osbjs/spectrum-tiny-osbjs](https://github.com/osbjs/spectrum-tiny-osbjs) - Get spectrum data used to create spectrum effects.
- [@osbjs/hitobjects-tiny-osbjs](https://github.com/osbjs/hitobjects-tiny-osbjs) - Get hit objects position used to create highlight effects.
- [@osbjs/txtgen-tiny-osbjs](https://github.com/osbjs/txtgen-tiny-osbjs) - Generate text images, commonly used for creating lyrics.
