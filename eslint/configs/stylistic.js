// eslint-disable-next-line import-x/no-deprecated, import-x/namespace, import-x/default
import eslintPluginStylistic from '@stylistic/eslint-plugin';

/**
 * The ESLint `stylistic` config. Extends `configs.recommended` and overrides all rules.
 *
 * @type {import('eslint').Linter.Config}
 */
export const stylistic = {
	name: 'eslint-plugin-stylistic',
	...eslintPluginStylistic.configs.recommended,
	plugins: { '@stylistic': eslintPluginStylistic },
	rules: {
		'@stylistic/array-bracket-newline': [
			'error',
			{
				multiline: true,
				minItems: 2
			}
		],
		'@stylistic/array-bracket-spacing': [
			'error',
			'always'
		],
		'@stylistic/array-element-newline': [
			'error',
			{
				consistent: true,
				multiline: true,
				minItems: 2
			}
		],
		'@stylistic/arrow-parens': [
			'error',
			'always'
		],
		'@stylistic/arrow-spacing': [
			'error',
			{
				before: true,
				after: true
			}
		],
		'@stylistic/block-spacing': [
			'error',
			'always'
		],
		'@stylistic/brace-style': [
			'error',
			'1tbs',
			{ allowSingleLine: false }
		],
		'@stylistic/comma-dangle': [
			'error',
			'never'
		],
		'@stylistic/comma-spacing': [
			'error',
			{
				before: false,
				after: true
			}
		],
		'@stylistic/comma-style': [
			'error',
			'last'
		],
		'@stylistic/computed-property-spacing': [
			'error',
			'never',
			{ enforceForClassMembers: true }
		],
		'@stylistic/curly-newline': [
			'error',
			{
				multiline: true,
				minElements: 2,
				consistent: true
			}
		],
		'@stylistic/dot-location': [
			'error',
			'property'
		],
		'@stylistic/eol-last': [
			'error',
			'always'
		],
		'@stylistic/function-call-argument-newline': [
			'error',
			'always'
		],
		'@stylistic/function-call-spacing': [
			'error',
			'never'
		],
		'@stylistic/function-paren-newline': 'off',
		'@stylistic/generator-star-spacing': [
			'error',
			'after'
		],
		'@stylistic/implicit-arrow-linebreak': [
			'error',
			'beside'
		],
		'@stylistic/indent': [
			'error',
			'tab'
		],
		'@stylistic/indent-binary-ops': [
			'error',
			'tab'
		],
		'@stylistic/jsx-child-element-spacing': [ 'error' ],
		'@stylistic/jsx-closing-bracket-location': [
			'error',
			'tag-aligned'
		],
		'@stylistic/jsx-closing-tag-location': [
			'error',
			'line-aligned'
		],
		'@stylistic/jsx-curly-brace-presence': [
			'error',
			'always'
		],
		'@stylistic/jsx-curly-newline': [
			'error',
			{
				multiline: 'consistent',
				singleline: 'consistent'
			}
		],
		'@stylistic/jsx-curly-spacing': [
			'error',
			{
				when: 'never',
				attributes: true,
				children: true
			}
		],
		'@stylistic/jsx-equals-spacing': [
			'error',
			'never'
		],
		'@stylistic/jsx-first-prop-new-line': [
			'error',
			'multiline-multiprop'
		],
		'@stylistic/jsx-function-call-newline': [
			'error',
			'multiline'
		],
		'@stylistic/jsx-indent': [ 'off' ],
		'@stylistic/jsx-indent-props': [
			'error',
			'tab'
		],
		'@stylistic/jsx-max-props-per-line': [
			'error',
			{ maximum: 1 }
		],
		'@stylistic/jsx-newline': [
			'error',
			{
				prevent: true,
				allowMultilines: true
			}
		],
		'@stylistic/jsx-one-expression-per-line': [
			'error',
			{ allow: 'none' }
		],
		'@stylistic/jsx-pascal-case': [ 'off' ],
		'@stylistic/jsx-props-no-multi-spaces': [ 'off' ], // Off in favor for 'no-multi-spaces'
		'@stylistic/jsx-quotes': [
			'error',
			'prefer-double'
		],
		'@stylistic/jsx-self-closing-comp': [
			'error',
			{ component: true }
		],
		'@stylistic/jsx-sort-props': [
			'error',
			{
				ignoreCase: false,
				callbacksLast: true,
				shorthandFirst: true,
				shorthandLast: false,
				multiline: 'ignore',
				noSortAlphabetically: true,
				reservedFirst: true,
				locale: 'en'
			}
		],
		'@stylistic/jsx-tag-spacing': [
			'error',
			{
				closingSlash: 'never',
				beforeSelfClosing: 'always',
				afterOpening: 'never',
				beforeClosing: 'never'
			}
		],
		'@stylistic/jsx-wrap-multilines': [
			'error',
			{
				declaration: 'parens-new-line',
				assignment: 'parens-new-line',
				return: 'parens-new-line',
				arrow: 'parens-new-line',
				condition: 'parens',
				logical: 'parens',
				prop: 'parens-new-line',
				propertyValue: 'parens'
			}
		],
		'@stylistic/key-spacing': [
			'error',
			{
				beforeColon: false,
				afterColon: true,
				mode: 'strict'
			}
		],
		'@stylistic/line-comment-position': [ 'off' ],
		'@stylistic/linebreak-style': [
			'error',
			'unix'
		],
		'@stylistic/lines-around-comment': [
			'error',
			{
				beforeBlockComment: true,
				afterBlockComment: false,
				beforeLineComment: true,
				afterLineComment: false,
				allowBlockStart: false,
				allowBlockEnd: false,
				allowClassStart: false,
				allowClassEnd: false,
				allowObjectStart: false,
				allowObjectEnd: false,
				allowArrayStart: true,
				allowArrayEnd: false,
				applyDefaultIgnorePatterns: true,
				afterHashbangComment: true
			}
		],
		'@stylistic/lines-between-class-members': [
			'error',
			'always'
		],
		'@stylistic/max-len': [
			'warn',
			{
				code: 120,
				tabWidth: 2,
				ignoreComments: false,
				ignoreTrailingComments: false,
				ignoreUrls: true,
				ignoreStrings: false,
				ignoreTemplateLiterals: true
			}
		],
		'@stylistic/max-statements-per-line': [
			'error',
			{
				max: 1,
				ignoredNodes: [ 'BreakStatement' ]
			}
		],
		'@stylistic/member-delimiter-style': [
			'error',
			{
				multiline: {
					delimiter: 'semi',
					requireLast: true
				},
				singleline: {
					delimiter: 'comma',
					requireLast: false
				},
				multilineDetection: 'brackets'
			}
		],
		'@stylistic/multiline-comment-style': [
			'error',
			'starred-block'
		],
		'@stylistic/multiline-ternary': [
			'error',
			'always'
		],
		'@stylistic/new-parens': [
			'error',
			'always'
		],

		/*
		 * '@stylistic/newline-per-chained-call': ['error', {
		 *   ignoreChainWithDepth: 1 // currently 'broken', in favor of custom rule custom/newline-per-chained-call
		 * }],
		 */
		'@stylistic/no-confusing-arrow': [
			'error',
			{
				allowParens: true,
				onlyOneSimpleParam: false
			}
		],
		'@stylistic/no-extra-parens': [
			'error',
			'all',
			{
				ignoreJSX: 'multi-line',
				nestedBinaryExpressions: false,
				ignoredNodes: [

					// Arrow function ternaries
					'ArrowFunctionExpression[body.type="ConditionalExpression"]',
					'ArrowFunctionExpression > ParenthesizedExpression > ConditionalExpression',

					// Nested binary expressions (direct child)
					'BinaryExpression > BinaryExpression',

					// Triple-nested or deeply nested inside another expression
					'BinaryExpression > BinaryExpression > BinaryExpression',

					// Specifically ignore parenthesized binary expressions used as the RHS of assignments
					'AssignmentExpression > ParenthesizedExpression > BinaryExpression',

					// Also ignore parenthesized binary expressions used as operands of bitwise expressions
					'BinaryExpression > ParenthesizedExpression > BinaryExpression'

				]
			}
		],
		'@stylistic/no-extra-semi': [ 'error' ],
		'@stylistic/no-floating-decimal': [ 'error' ],
		'@stylistic/no-mixed-operators': [ 'error' ],
		'@stylistic/no-mixed-spaces-and-tabs': [
			'error',
			'smart-tabs'
		],
		'@stylistic/no-multi-spaces': [ 'error' ],
		'@stylistic/no-multiple-empty-lines': [
			'error',
			{ max: 1 }
		],
		'@stylistic/no-tabs': [ 'off' ],
		'@stylistic/no-trailing-spaces': [ 'error' ],
		'@stylistic/no-whitespace-before-property': [ 'error' ],
		'@stylistic/nonblock-statement-body-position': [
			'error',
			'below'
		],
		'@stylistic/object-curly-newline': [
			'error',
			{
				multiline: true,
				minProperties: 2,
				consistent: false
			}
		],
		'@stylistic/object-curly-spacing': [
			'error',
			'always'
		],
		'@stylistic/object-property-newline': [
			'error',
			{ allowAllPropertiesOnSameLine: false }
		],
		'@stylistic/one-var-declaration-per-line': [
			'error',
			'always'
		],
		'@stylistic/operator-linebreak': [
			'error',
			'before'
		],
		'@stylistic/padded-blocks': [
			'error',
			'always',
			{ allowSingleLineBlocks: true }
		],
		'@stylistic/padding-line-between-statements': [ 'off' ],
		'@stylistic/quote-props': [
			'error',
			'as-needed'
		],
		'@stylistic/quotes': [
			'error',
			'single',
			{
				avoidEscape: false,
				allowTemplateLiterals: 'avoidEscape',
				ignoreStringLiterals: false
			}
		],
		'@stylistic/rest-spread-spacing': [
			'error',
			'never'
		],
		'@stylistic/semi': [
			'error',
			'always'
		],
		'@stylistic/semi-spacing': [
			'error',
			{
				before: false,
				after: true
			}
		],
		'@stylistic/semi-style': [
			'error',
			'last'
		],
		'@stylistic/space-before-blocks': [
			'error',
			'always'
		],
		'@stylistic/space-before-function-paren': [
			'error',
			{
				anonymous: 'never',
				named: 'never',
				asyncArrow: 'never',
				catch: 'never'
			}
		],
		'@stylistic/space-in-parens': [
			'error',
			'never'
		],
		'@stylistic/space-infix-ops': [
			'error',
			{
				int32Hint: true,
				ignoreTypes: false
			}
		],
		'@stylistic/space-unary-ops': [
			'error',
			{
				words: true,
				nonwords: false
			}
		],
		'@stylistic/spaced-comment': [
			'error',
			'always',
			{
				exceptions: [
					'-',
					'+'
				]
			}
		],
		'@stylistic/switch-colon-spacing': [
			'error',
			{
				after: true,
				before: false
			}
		],
		'@stylistic/template-curly-spacing': [
			'error',
			'never'
		],
		'@stylistic/template-tag-spacing': [
			'error',
			'always'
		],
		'@stylistic/type-annotation-spacing': [
			'error',
			{
				before: false,
				after: true
			}
		],
		'@stylistic/type-generic-spacing': [ 'error' ],
		'@stylistic/type-named-tuple-spacing': [ 'error' ],
		'@stylistic/wrap-iife': [
			'error',
			'inside',
			{ functionPrototypeMethods: true }
		],
		'@stylistic/wrap-regex': [ 'error' ],
		'@stylistic/yield-star-spacing': [
			'error',
			'after'
		]
	}
};
