import { defineConfig } from 'eslint/config';
import { importX as eslintPluginImportX } from 'eslint-plugin-import-x';
import {
	base,
	astro,
	importX,
	reactHooks,
	stylistic,
	custom
} from '../configs/index.js';

/**
 * The `ESLint` Astro/React config with typescript.
 */
export const astroReact = defineConfig(
	base,
	astro,
	{
		...eslintPluginImportX.configs['flat/react'],
		...importX
	},
	reactHooks,
	stylistic,
	custom,
	{
		name: 'eslint-plugin-astro-stylistic-override',
		files: [ '**/*.astro' ],
		rules: {
			'@stylistic/jsx-one-expression-per-line': 'off',
			'@stylistic/jsx-curly-brace-presence': 'off',
			'import-x/unambiguous': 'off'
		}
	}
);
