import {
	defineConfig,
	globalIgnores
} from 'eslint/config';
import { importX as eslintPluginImportX } from 'eslint-plugin-import-x';
import { Linter } from 'eslint';
import {
	base,
	custom,
	astro,
	typescript,
	reactHooks,
	stylistic,
	importXTs
} from '../configs/index';

/**
 * The `ESLint` Astro/React config with typescript.
 */
export const astroReactTs = defineConfig(
	globalIgnores([ '**/*.astro/*.ts' ]), // Crucial to drastically improve performance!
	base,
	typescript,
	astro,
	{
		// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
		...eslintPluginImportX.configs['flat/react'] as Linter.Config,
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
			'@stylistic/jsx-curly-brace-presence': 'off',
			'import-x/unambiguous': 'off'
		}
	}
);
