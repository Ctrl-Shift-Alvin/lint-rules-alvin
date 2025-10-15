import eslintPluginMarkdown from 'eslint-plugin-markdown';

/**
 * The ESLint markdown config. Extends `configs.recommended` only for `md` files.
 *
 * @type {import('eslint').Linter.Config}
 *
 */
export const markdown = {
	name: 'eslint-plugin-markdown',
	files: [ '**/*.{md}' ],
	...eslintPluginMarkdown.configs.recommended
};
