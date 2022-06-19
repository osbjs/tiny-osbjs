import ts from 'rollup-plugin-ts'

export default [
	{
		input: 'src/index.ts',
		output: {
			file: 'dist/cjs/index.js',
			format: 'cjs',
		},
		plugins: [ts()],
	},
	{
		input: 'src/index.ts',
		output: {
			file: 'dist/es/index.js',
			format: 'es',
		},
		plugins: [ts({ tsconfig: { declaration: false } })],
	},
]
