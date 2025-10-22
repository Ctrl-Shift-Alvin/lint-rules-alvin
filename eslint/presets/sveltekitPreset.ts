/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { defineConfig } from 'eslint/config';
import { importX as eslintPluginImportX } from 'eslint-plugin-import-x';
import { Linter } from 'eslint/universal';
import {
	base,
	importX,
	sveltekit,
	stylistic,
	custom,
	typescript
} from '../configs/index';

/**
 * The `ESLint` PocketBase/SvelteKit config.
 */
export const sveltekitPreset = defineConfig(
	base as any,
	typescript as Linter.Config,
	sveltekit as Linter.Config[],
	{
		...eslintPluginImportX.configs['flat/typescript'],
		...importX

	} as Linter.Config,
	stylistic as Linter.Config,
	custom as Linter.Config,
	{
		name: 'sveltekit-override',
		files: [ '**/*.svelte' ],
		rules: { 'import-x/unambiguous': 'off' }
	}
);
