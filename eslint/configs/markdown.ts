import { TSESLint } from '@typescript-eslint/utils';
import eslintPluginMarkdown from 'eslint-plugin-markdown';

/**
 * The ESLint markdown config. Extends `configs.recommended` only for `md` files.
 */
export const markdown: TSESLint.FlatConfig.Config = {
	name: 'eslint-plugin-markdown',
	files: [ '**/*.{md}' ],
	...eslintPluginMarkdown.configs.recommended
};
