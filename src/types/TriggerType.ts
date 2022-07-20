export type TriggerType = `HitSound${SampleSet}${SampleSet}${Addition}${number | ''}`

export enum SampleSet {
	None = '',
	All = 'All',
	Normal = 'Normal',
	Soft = 'Soft',
	Drum = 'Drum',
}

export enum Addition {
	None = '',
	Whistle = 'Whistle',
	Finish = 'Finish',
	Clap = 'Clap',
}
