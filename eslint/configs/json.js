import eslintPluginJsonc from 'eslint-plugin-jsonc';

/**
 * The `ESLint` JSON config. Supports JSON, JSONc an JSON5.
 */
export const json = [
	{ // eslint-plugin-json
		name: 'eslint-plugin-json',
		files: [ '**/*.{json}' ],
		...eslintPluginJsonc.configs['flat/recommended-with-json']
	},
	{ // eslint-plugin-jsonc
		name: 'eslint-plugin-jsonc',
		files: [ '**/*.{jsonc}' ],
		...eslintPluginJsonc.configs['flat/recommended-with-jsonc']
	},
	{ // eslint-plugin-json5
		name: 'eslint-plugin-json5',
		files: [ '**/*.{json5}' ],
		...eslintPluginJsonc.configs['flat/recommended-with-json5']
	}
];
