# tiny-osbjs
a declarative osu! storyboard library with zero-dependency and zero-configuration.

If you need more features like texture generator, please consider using [osbjs](https://osbjs.vercel.app).

## Install
```bash
npm install @osbjs/tiny-osbjs
```

## Usage
Before you do anything, you have to create a storyboard context and tell the library to use it. This context is shared accross the whole project. 
```javascript
const { createContext, useContext } = require('tiny-osbjs')

const context = createContext()
useContext(context)
```

Then you can start creating storyboard objects.
```javascript
const { createSprite } = require('tiny-osbjs')

createSprite('test.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {})
```

If you want to create a storyboard for each difficulty, you must specify the context at the entry point of each storyboard.
```javascript
// difficulty1.js
const { createContext, useContext } = require('tiny-osbjs')

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


The killer-feature of `tiny-osb` is that you can specify the commands in a declarative way and the library will know which objects they are refering to.
```javascript
const { createSprite, fade, loop } = require('tiny-osbjs')

createSprite('test.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
	fade(0, 1000, 0, 1) // refers to sprite

	loop(3000, 5, () => {
		fade(0, 1000, 0, 1) // refers to loop
	})
})
```

Finally, you can generate osb string of the storyboard. You can use that string to export to osb file.
```javascript
const { generateStoryboardOsb } = require('tiny-osbjs')

fs.writeFileSync('Artist - Song (Creator).osb', generateStoryboardOsb(), 'utf8')
```

## API documentation

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
function createSample(layer: SampleLayer, path: string, volume: number, startTime: number)
```
Create a new Sample.

### createSprite
```typescript
function createSprite(
	path: string,
	layer: SpriteLayer,
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
	loopType: AnimationLoopType,
	invokeFunction: () => void
)
```
Create a new Animation. All commands must be called inside the invoke function.

### generateStoryboardOsb
```typescript
function generateStoryboardOsb(): string
```
Generate osb string that can be used to create osb file or replace `[Events]` section in osu file.

### getReportForOverlappingCommands
```typescript
function getReportForOverlappingCommands()
```
Get a report for each object that has overlapping commands.

### Commands
```typescript
function fade(startTime: number | Timestamp, endTime: number | Timestamp, startOpacity: number, endOpacity: number, easing: Easing = Easing.Linear)
function fadeAtTime(time: number, opacity: number)
```
Change the opacity of the object.

```typescript
function move(startTime: number | Timestamp, endTime: number | Timestamp, startPosition: Vector2, endPosition: Vector2, easing: Easing = Easing.Linear)
function moveAtTime(time: number, position: Vector2)
```
Change the location of the object in the play area.

```typescript
function moveX(startTime: number | Timestamp, endTime: number | Timestamp, startX: number, endX: number, easing: Easing = Easing.Linear)
function moveXAtTime(time: number, x: number)
```
Change the x coordinate of the object.

```typescript
function moveY(startTime: number | Timestamp, endTime: number | Timestamp, startY: number, endY: number, easing: Easing = Easing.Linear)
function moveYAtTime(time: number, y: number)
```
Change the y coordinate of the object.

```typescript
function rotate(startTime: number | Timestamp, endTime: number | Timestamp, startAngle: number, endAngle: number, easing: Easing = Easing.Linear)
function rotateAtTime(time: number, angle: number)
```
Change the rotation of the object.

```typescript
function scale(startTime: number | Timestamp, endTime: number | Timestamp, startScale: Vector2, endScale: Vector2, easing: Easing = Easing.Linear)
function scaleAtTime(time: number, scale: Vector2)
```
Change the scale of the object.

```typescript
function color(startTime: number | Timestamp, endTime: number | Timestamp, startColor: Color, endColor: Color, easing: Easing = Easing.Linear)
function colorAtTime(time: number, color: Color)
```
The virtual light source colour on the object. The colours of the pixels on the object are determined subtractively.

```typescript
function parameter(startTime: number | Timestamp, endTime: number | Timestamp, parameter: Parameter, easing: Easing)
```
Unlike the other commands, which can be seen as setting endpoints along continually-tracked values, the `parameter` command apply ONLY while they are active, i.e.,you can't put a command from timestamps 1000 to 2000 and expect the value to apply at time 3000, even if the object's other commands aren't finished by that point.

```typescript
function loop(startTime: number | Timestamp, count: number, invokeFunction: () => void)
```
Create a loop group.

Loops can be defined to repeat a set of events constantly for a set number of iterations. Note that events inside a loop should be timed with a zero-base. This means that you should start from 0ms for the inner event's timing and work up from there. The loop event's start time will be added to this value at game runtime.

```typescript
function trigger(triggerType: TriggerType, startTime: number | Timestamp, endTime: number | Timestamp, invokeFunction: () => void)
```
Create a trigger group.

Trigger loops can be used to trigger animations based on play-time events. Although called loops, trigger loops only execute once when triggered.Trigger loops are zero-based similar to normal loops. If two overlap, the first will be halted and replaced by a new loop from the beginning. If they overlap any existing storyboarded events, they will not trigger until those transformations are no in effect.

### Utility functions
```typescript
function degToRad(deg: number): number
```
Convert degrees to radians.

```typescript
function radToDeg(rad: number): number
```
Convert radians to degrees.
