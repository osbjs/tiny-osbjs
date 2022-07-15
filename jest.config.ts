import type { InitialOptionsTsJest } from 'ts-jest'

const config: InitialOptionsTsJest = {
	preset: 'ts-jest/presets/default-esm',
	testEnvironment: 'node',
	moduleDirectories: ['node_modules', 'src'],
}

export default config
