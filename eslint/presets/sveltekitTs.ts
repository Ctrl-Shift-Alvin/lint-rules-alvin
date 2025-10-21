import { defineConfig } from 'eslint/config';
import { importX as eslintPluginImportX } from 'eslint-plugin-import-x';
import { Linter } from 'eslint';
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
	base,
	typescript,
	sveltekit,
	{
		// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
		...eslintPluginImportX.configs['flat/typescript'] as Linter.Config,
		...importX
	},
	stylistic,
	custom,
	{
		name: 'sveltekit-override',
		files: [ '**/*.svelte' ],
		rules: { 'import-x/unambiguous': 'off' }
	}
);
