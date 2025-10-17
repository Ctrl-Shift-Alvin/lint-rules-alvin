import { defineConfig } from 'eslint/config';
import { importX as eslintPluginImportX } from 'eslint-plugin-import-x';
import {
	base,
	importX,
	sveltekit,
	stylistic,
	custom,
	typescript
} from '../configs/index.js';

/**
 * The `ESLint` PocketBase/SvelteKit config with typescript.
 */
export const sveltekitTs = defineConfig(
	base,
	sveltekit,
	typescript,
	{
		...eslintPluginImportX.configs['flat/typescript'],
		...importX
	},
	stylistic,
	custom
);
