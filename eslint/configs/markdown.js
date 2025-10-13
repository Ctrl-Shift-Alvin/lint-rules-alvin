import eslintPluginMarkdown from 'eslint-plugin-markdown';

/**
 * The `ESLint` markdown config.
 */
export const markdown = {
	name: 'eslint-plugin-markdown',
	files: [ '**/*.{md}' ],
	...eslintPluginMarkdown.configs.recommended
};
