import { Color } from './Color'
import { Timestamp } from './Timestamp'
import { Vector2 } from './Vector2'

export type NumericCommandValue = [number, number] | number

export type Vector2CommandValue = [Vector2, Vector2] | Vector2

export type ColorCommandValue = [Color, Color] | Color

export type TimeValue = number | Timestamp | [number | Timestamp, number | Timestamp]
