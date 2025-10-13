import { importX as eslintPluginImportX } from 'eslint-plugin-import-x';
import { importX } from './index.js';

/**
 * The `ESLint` import config with a TS resolver.
 *
 * Extends `eslint-plugin-import-x`'s `typescript` flat config.
 */
export const importXTs = {
	...importX,
	...eslintPluginImportX.flatConfigs.typescript,
	settings: {
		'import-x/resolver': {
			typescript: true,
			node: true
		}
	},
	rules: {
		...importX.rules,
		'import-x/no-unresolved': 'error'
	}
};
