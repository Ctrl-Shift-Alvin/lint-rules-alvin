import { newlineBetweenImportsRule } from '../custom_rules/newline-between-imports.js';
import { unnamedImportsLastRule } from '../custom_rules/unnamed-imports-last.js';
import { jsxMultilinePropNewlineRule } from '../custom_rules/jsx-multiline-prop-newline.js';
import { maxChainPerLineRule } from '../custom_rules/max-chain-per-line.js';
import { multilineParenNewlineRule } from '../custom_rules/multiline-paren-newline.js';
import { multilineArrayAccessorNewlineRule } from '../custom_rules/multiline-array-accessor-newline.js';
import { destructureNewlineRule } from '../custom_rules/destructure-newline.js';

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
				'max-chain-per-line': maxChainPerLineRule,
				'multiline-paren-newline': multilineParenNewlineRule,
				'multiline-array-accessor-newline': multilineArrayAccessorNewlineRule,
				'destructure-newline': destructureNewlineRule
			}
		}
	},
	rules: {
		'custom/newline-between-imports': [
			'error',
			{ minItems: 2 }
		],
		'custom/unnamed-imports-last': 'error',
		'custom/jsx-multiline-prop-newline': [
			'error',
			{
				enforceSingleLine: true,
				allowSingleExpression: true
			}
		],
		'custom/max-chain-per-line': [
			'error',
			{
				maxChain: 2,
				enforceSingleLine: true,
				checkSingleLink: true
			}
		],
		'custom/multiline-paren-newline': [
			'error',
			{ singleArgument: true }
		],
		'custom/multiline-array-accessor-newline': 'error',
		'custom/destructure-newline': [
			'error',
			{ minItems: 2 }
		]
	}
};
