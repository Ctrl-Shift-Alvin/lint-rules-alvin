/* eslint-disable @typescript-eslint/no-unsafe-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { defineConfig } from 'eslint/config';
import { importX as eslintPluginImportX } from 'eslint-plugin-import-x';
import {
	base,
	importX,
	sveltekit,
	stylistic,
	custom,
	typescript
} from '../configs/index';

/**
 * The `ESLint` PocketBase/SvelteKit config with typescript.
 */
export const sveltekitTs = defineConfig(
	base as any,
	typescript as any,
	sveltekit as any,
	{
		...eslintPluginImportX.configs['flat/typescript'],
		...importX
	} as any,
	stylistic as any,
	custom as any,
	{
		name: 'sveltekit-override',
		files: [ '**/*.svelte' ],
		rules: { 'import-x/unambiguous': 'off' }
	}
);
