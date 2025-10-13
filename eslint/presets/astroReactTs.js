import {
	defineConfig,
	globalIgnores
} from 'eslint/config';
import { importX as eslintPluginImportX } from 'eslint-plugin-import-x';
import {
	base,
	custom,
	astro,
	typescript,
	reactHooks,
	stylistic,
	importXTs
} from '../configs/index.js';

/**
 * The `ESLint` Astro/React config with typescript.
 */
export const astroReactTs = defineConfig(
	base,
	globalIgnores([ '**/*.astro/*.ts' ]),
	typescript,
	astro,
	{
		...eslintPluginImportX.configs['flat/react'],
		...importXTs
	},
	reactHooks,
	stylistic,
	custom,
	{
		name: 'eslint-plugin-astro-stylistic-override',
		files: [ '**/*.astro' ],
		rules: {
			'@stylistic/jsx-one-expression-per-line': 'off',
			'@stylistic/jsx-curly-brace-presence': 'off'
		}
	}
);
