import { TSESLint } from '@typescript-eslint/utils';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

/**
 * The ESLint `react-hooks` config. Extends `configs.flat.recommended` only for `jsx` and `tsx` files.
 */
export const reactHooks: TSESLint.FlatConfig.Config = {
	name: 'eslint-plugin-react-hooks',
	files: [ '**/*.{jsx,tsx}' ],
	...eslintPluginReactHooks
		.configs
		.flat
		.recommended
};
