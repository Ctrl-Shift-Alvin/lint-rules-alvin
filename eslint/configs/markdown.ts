import { TSESLint } from '@typescript-eslint/utils';
import eslintPluginMarkdown from '@eslint/markdown';

/**
 * The ESLint markdown config. Extends `configs.recommended` only for `md` files.
 */
export const markdown: TSESLint.FlatConfig.Config = {
	...eslintPluginMarkdown.configs.recommended[0],
	name: 'eslint-plugin-markdown',
	files: [ '**/*.md' ]
};
