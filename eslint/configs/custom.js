import { newlineBetweenImportsRule } from '../custom_rules/newline-between-imports.js';
import { unnamedImportsLastRule } from '../custom_rules/unnamed-imports-last.js';
import { jsxMultilinePropNewlineRule } from '../custom_rules/jsx-multiline-prop-newline.js';
import { jsxNoSingleObjectCurlyNewlineRule } from '../custom_rules/jsx-no-single-object-curly-newline.js';
import { maxChainPerLineRule } from '../custom_rules/max-chain-per-line.js';
import { chainFirstOnNewlineRule } from '../custom_rules/chain-first-on-newline.js';
import { multilineParenNewlineRule } from '../custom_rules/multiline-paren-newline.js';

/**
 * Provides a config that creates a plugin and configures custom rules.
 *
 * @type {import('eslint').Linter.Config}
 */
export const custom = {
	plugins: {
		custom: {
			rules: {
				'newline-between-imports': newlineBetweenImportsRule,
				'unnamed-imports-last': unnamedImportsLastRule,
				'jsx-multiline-prop-newline': jsxMultilinePropNewlineRule,
				'jsx-no-single-object-curly-newline': jsxNoSingleObjectCurlyNewlineRule,
				'max-chain-per-line': maxChainPerLineRule,
				'chain-first-on-newline': chainFirstOnNewlineRule,
				'multiline-paren-newline': multilineParenNewlineRule
			}
		}
	},
	rules: {
		'custom/newline-between-imports': [
			'error',
			{ minItems: 2 }
		],
		'custom/unnamed-imports-last': 'error',
		'custom/jsx-multiline-prop-newline': 'error',
		'custom/jsx-no-single-object-curly-newline': 'error',
		'custom/max-chain-per-line': [
			'error',
			{ maxChain: 2 }
		],
		'custom/chain-first-on-newline': [
			'error',
			'require'
		],
		'custom/multiline-paren-newline': [
			'error',
			{ singleArgument: true }
		]
	}
};

