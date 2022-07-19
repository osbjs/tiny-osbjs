import { Timestamp } from 'types/Timestamp'

export function tryParseTimestamp(timestamp: number | Timestamp): number {
	if (typeof timestamp == 'number') return Math.trunc(timestamp)

	const match = timestamp.match(/^(\d{2,}):(\d{2}):(\d{3})$/)

	if (!match) {
		throw new Error(`${timestamp.toString()} is not a valid osu timestamp.`)
	}

	const minutes = match[1] ? parseInt(match[1], 10) * 60000 : 0
	const seconds = parseInt(match[2], 10) * 1000
	const milliseconds = parseInt(match[3], 10)

	return Math.trunc(minutes + seconds + milliseconds)
}
