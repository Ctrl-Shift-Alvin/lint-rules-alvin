/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
	defineConfig,
	globalIgnores
} from 'eslint/config';
import { importX as eslintPluginImportX } from 'eslint-plugin-import-x';
import { base } from '../configs/base';
import { custom } from '../configs/custom';
import { astro } from '../configs/astro';
import { typescript } from '../configs/typescript';
import { reactHooks } from '../configs/reactHooks';
import { stylistic } from '../configs/stylistic';
import { importX } from '../configs/importX';
import { perfectionist } from '../configs/perfectionist';

/**
 * The `ESLint` Astro/React config with typescript.
 */
export const astroReactPreset = defineConfig(
	globalIgnores([ '**/*.astro/*.ts' ]), // Crucial to drastically improve performance!
	base as any,
	astro as any,
	typescript as any,
	{
		...eslintPluginImportX.configs['flat/react'],
		...importX
	} as any,
	reactHooks as any,
	stylistic as any,
	perfectionist as any,
	custom as any,
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
