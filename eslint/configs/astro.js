import eslintPluginAstro from 'eslint-plugin-astro';

/**
 * The ESLint Astro config. Extends `configs['flat/base']` and configures all rules.
 *
 * @type {import('eslint').Linter.Config}
 */
export const astro = [
	...eslintPluginAstro.configs['flat/base'],
	{
		name: 'eslint-plugin-astro',
		rules: {
			'astro/missing-client-only-directive-value': 'error',
			'astro/no-conflict-set-directives': 'error',
			'astro/no-deprecated-astro-canonicalurl': 'error',
			'astro/no-deprecated-astro-fetchcontent': 'error',
			'astro/no-deprecated-astro-resolve': 'error',
			'astro/no-deprecated-getentrybyslug': 'error',
			'astro/no-exports-from-components': 'error',
			'astro/no-unused-define-vars-in-style': 'error',
			'astro/valid-compile': 'error',
			'astro/no-set-html-directive': 'warn',
			'astro/no-set-text-directive': 'error',
			'astro/no-unused-css-selector': 'error',
			'astro/prefer-class-list-directive': 'error',
			'astro/prefer-object-class-list': 'error',
			'astro/prefer-split-class-list': 'off',
			'astro/sort-attributes': 'off'
		}
	}
];
