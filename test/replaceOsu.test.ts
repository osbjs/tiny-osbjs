import { fade } from 'commands'
import { createContext, useContext } from 'context'
import { createSample, SampleLayer } from 'createSample'
import { createSprite } from 'createSprite'
import { replaceOsuEvents } from 'replaceOsuEvents'

it('replaces [Events] section in osu file', () => {
	useContext(createContext())
	const parsedOsuDifficulty = `osu file format v14

[General]
AudioFilename: audio.mp3
AudioLeadIn: 0
PreviewTime: -1
Countdown: 0
SampleSet: Soft
StackLeniency: 0.7
Mode: 0
LetterboxInBreaks: 0
WidescreenStoryboard: 1

[Editor]
DistanceSpacing: 0.95
BeatDivisor: 4
GridSize: 32
TimelineZoom: 2.7

[Metadata]
Title:
TitleUnicode:
Artist:
ArtistUnicode:
Creator:
Version:
Source:
Tags:
BeatmapID:0
BeatmapSetID:-1

[Difficulty]
HPDrainRate:5
CircleSize:4
OverallDifficulty:8
ApproachRate:9
SliderMultiplier:1.4
SliderTickRate:1

[Events]
//Background and Video events
//Break Periods
2,77661,88706
2,77661,88706
2,77661,88706
//Storyboard Layer 0 (Background)
//Storyboard Layer 1 (Fail)
//Storyboard Layer 2 (Pass)
//Storyboard Layer 3 (Foreground)
//Storyboard Layer 4 (Overlay)
//Storyboard Sound Samples

[TimingPoints]

[HitObjects]`

	const expectedReplacedOsuDifficulty = `osu file format v14

[General]
AudioFilename: audio.mp3
AudioLeadIn: 0
PreviewTime: -1
Countdown: 0
SampleSet: Soft
StackLeniency: 0.7
Mode: 0
LetterboxInBreaks: 0
WidescreenStoryboard: 1

[Editor]
DistanceSpacing: 0.95
BeatDivisor: 4
GridSize: 32
TimelineZoom: 2.7

[Metadata]
Title:
TitleUnicode:
Artist:
ArtistUnicode:
Creator:
Version:
Source:
Tags:
BeatmapID:0
BeatmapSetID:-1

[Difficulty]
HPDrainRate:5
CircleSize:4
OverallDifficulty:8
ApproachRate:9
SliderMultiplier:1.4
SliderTickRate:1

[Events]
//Background and Video events
//Break Periods
2,77661,88706
2,77661,88706
2,77661,88706
//Storyboard Layer 0 (Background)
Sprite,Background,Centre,"sprite.png",320,240
 F,0,0,1000,0,1
//Storyboard Layer 1 (Fail)
//Storyboard Layer 2 (Pass)
//Storyboard Layer 3 (Foreground)
//Storyboard Layer 4 (Overlay)
//Storyboard Sound Samples
Sample,1000,0,"test-sample.ogg",100

[TimingPoints]

[HitObjects]`

	createSprite('sprite.png', 'Background', 'Centre', { x: 320, y: 240 }, () => {
		fade([0, 1000], [0, 1])
	})

	createSample(1000, SampleLayer.Background, 'test-sample.ogg', 100)

	expect(replaceOsuEvents(parsedOsuDifficulty)).toBe(expectedReplacedOsuDifficulty)
})
