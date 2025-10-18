import eslintPluginSvelte from 'eslint-plugin-svelte';

/**
 * The ESLint `stylistic` config. Extends `configs.recommended` and overrides all rules.
 *
 * @type {import('eslint').Linter.Config[]}
 */
export const sveltekit = [
	...eslintPluginSvelte.configs['flat/base'],
	{
		files: [
			'**/*.svelte',
			'**/*.svelte.ts',
			'**/*.svelte.js'
		],
		rules: {

			// Svelte-specific
			'svelte/infinite-reactive-loop': 'warn',
			'svelte/no-dom-manipulating': 'warn',
			'svelte/no-dupe-else-if-blocks': 'error',
			'svelte/no-dupe-on-directives': 'error',
			'svelte/no-dupe-style-properties': 'error',
			'svelte/no-dupe-use-directives': 'error',
			'svelte/no-not-function-handler': 'error',
			'svelte/no-object-in-text-mustaches': 'error',
			'svelte/no-raw-special-elements': 'error',
			'svelte/no-reactive-reassign': 'error',
			'svelte/no-shorthand-style-property-overrides': 'warn',
			'svelte/no-store-async': 'error',
			'svelte/no-top-level-browser-globals': 'error',
			'svelte/no-unknown-style-directive-property': 'error',
			'svelte/prefer-svelte-reactivity': 'error',
			'svelte/require-store-callbacks-use-set-param': 'error',
			'svelte/require-store-reactive-access': 'error',
			'svelte/valid-compile': 'off',
			'svelte/valid-style-parse': 'error',

			// Security
			'svelte/no-at-html-tags': 'warn',
			'svelte/no-target-blank': 'error',

			// Best practices
			'svelte/block-lang': [
				'error',
				{
					enforceScriptPresent: false,
					enforceStylePresent: false,
					script: [
						'ts',
						'js'
					]
				}
			],
			'svelte/button-has-type': 'off',
			'svelte/no-add-event-listener': 'error',
			'svelte/no-at-debug-tags': 'warn',
			'svelte/no-ignored-unsubscribe': 'warn',
			'svelte/no-immutable-reactive-statements': 'error',
			'svelte/no-inline-styles': 'error',
			'svelte/no-inspect': 'warn',
			'svelte/no-reactive-functions': 'error',
			'svelte/no-reactive-literals': 'error',
			'svelte/no-svelte-internal': 'error',
			'svelte/no-unnecessary-state-wrap': 'error',
			'svelte/no-unused-class-name': 'off', // TailwindCSS doesn't work with this rule apparently
			'svelte/no-unused-props': 'error',
			'svelte/no-unused-svelte-ignore': 'error',
			'svelte/no-useless-children-snippet': 'error',
			'svelte/no-useless-mustaches': 'error',
			'prefer-const': 'off',
			'svelte/prefer-const': 'error',
			'svelte/prefer-destructured-store-props': 'error',
			'svelte/prefer-writable-derived': 'error',
			'svelte/require-each-key': 'error',
			'svelte/require-event-dispatcher-types': 'error',
			'svelte/require-optimized-style-attribute': 'error',
			'svelte/require-stores-init': 'error',
			'svelte/valid-each-key': 'error',

			// Stylistic
			'svelte/consistent-selector-style': 'off',
			'svelte/derived-has-same-inputs-outputs': 'error',
			'svelte/first-attribute-linebreak': [
				'error',
				{
					singleline: 'beside',
					multiline: 'below'
				}
			],
			'svelte/html-closing-bracket-new-line': [
				'error',
				{
					singleline: 'never',
					multiline: 'always',
					selfClosingTag: {
						singleline: 'never',
						multiline: 'always'
					}
				}
			],
			'svelte/html-closing-bracket-spacing': [
				'error',
				{
					startTag: 'never',
					endTag: 'never',
					selfClosingTag: 'always'
				}
			],
			'svelte/html-quotes': [
				'error',
				{
					prefer: 'double',
					dynamic: {
						quoted: false,
						avoidInvalidUnquotedInHTML: false
					}
				}
			],
			'svelte/html-self-closing': [
				'error',
				'default'
			],
			'indent': 'off', // eslint-disable-line @stylistic/quote-props
			'@stylistic/indent': 'off',
			'svelte/indent': [
				'error',
				{
					indent: 'tab',
					switchCase: 1,
					alignAttributesVertically: false
				}
			],
			'svelte/max-attributes-per-line': [
				'error',
				{
					singleline: 1,
					multiline: 1
				}
			],
			'svelte/mustache-spacing': [
				'error',
				{
					textExpressions: 'never',
					attributesAndProps: 'never',
					directiveExpressions: 'never',
					tags: {
						openingBrace: 'never',
						closingBrace: 'never'
					}
				}
			],
			'svelte/no-extra-reactive-curlies': 'error',
			'svelte/no-restricted-html-elements': 'off', // Allow the user to override
			'svelte/no-spaces-around-equal-signs-in-attribute': 'error',
			'svelte/prefer-class-directive': 'error',
			'svelte/prefer-style-directive': 'error',
			'svelte/require-event-prefix': 'off',
			'svelte/shorthand-attribute': [
				'error',
				{ prefer: 'always' }
			],
			'svelte/shorthand-directive': [
				'off',
				{ prefer: 'never' }
			],
			'svelte/sort-attributes': 'error',
			'svelte/spaced-html-comment': [
				'error',
				'always'
			],

			// Extensions
			'svelte/no-inner-declarations': [
				'error',
				'functions',
				{ blockScopedFunctions: 'allow' }
			],
			'no-trailing-spaces': 'off',
			'svelte/no-trailing-spaces': [
				'error',
				{
					skipBlankLines: false,
					ignoreComments: false
				}
			],

			// SvelteKit
			'svelte/no-export-load-in-svelte-module-in-kit-pages': 'error',
			'svelte/no-navigation-without-resolve': [
				'error',
				{
					ignoreGoto: false,
					ignoreLinks: false,
					ignorePushState: false,
					ignoreReplaceState: false
				}
			],
			'svelte/valid-prop-names-in-kit-pages': 'error',

			// System
			'svelte/comment-directive': [
				'error',
				{ reportUnusedDisableDirectives: true }
			],
			'svelte/system': 'error' // Keep this on!
		}
	}
];
