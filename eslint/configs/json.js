import eslintPluginJsonc from 'eslint-plugin-jsonc';

/**
 * The ESLint JSON config. Extends `flat/recommended-with-json`,
 * `...with-jsonc` and `...with-json5` for the corresponding file types.
 *
 * @type {import('eslint').Linter.Config}
 */
export const json = [
	{
		name: 'eslint-plugin-json',
		files: [ '**/*.{json}' ],
		...eslintPluginJsonc.configs['flat/recommended-with-json']
	},
	{
		name: 'eslint-plugin-jsonc',
		files: [ '**/*.{jsonc}' ],
		...eslintPluginJsonc.configs['flat/recommended-with-jsonc']
	},
	{
		name: 'eslint-plugin-json5',
		files: [ '**/*.{json5}' ],
		...eslintPluginJsonc.configs['flat/recommended-with-json5']
	}
];
