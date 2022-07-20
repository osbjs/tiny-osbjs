import { Time } from 'types/Timestamp'

export function tryParseTimestamp(timestamp: Time): number {
	if (typeof timestamp == 'number') return Math.trunc(timestamp)

	const match = timestamp.match(/^(\d{2,}):(\d{2}):(\d{3})$/)

	if (!match) return -1

	const minutes = match[1] ? parseInt(match[1], 10) * 60000 : 0
	const seconds = parseInt(match[2], 10) * 1000
	const milliseconds = parseInt(match[3], 10)

	return Math.trunc(minutes + seconds + milliseconds)
}
