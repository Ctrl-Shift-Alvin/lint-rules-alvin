import { importX as eslintPluginImportX } from 'eslint-plugin-import-x';
import { importX } from './index.js';

/**
 * The ESLint import config with a TS resolver.
 * Extends `../importX` and `flatConfigs.typescript` config.
 *
 * @type {import('eslint').Linter.Config}
 *
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
