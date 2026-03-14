import { TSESLint } from '@typescript-eslint/utils';
import { newlineBetweenImportsRule } from '../custom_rules/newline-between-imports';
import { jsxMultilinePropNewlineRule } from '../custom_rules/jsx-multiline-prop-newline';
import { maxChainPerLineRule } from '../custom_rules/max-chain-per-line';
import { multilineParenNewlineRule } from '../custom_rules/multiline-paren-newline';
import { multilineArrayAccessorNewlineRule } from '../custom_rules/multiline-array-accessor-newline';
import { destructureNewlineRule } from '../custom_rules/destructure-newline';

/**
 * Provides a config that creates a plugin and configures custom rules.
 */
export const custom: TSESLint.FlatConfig.Config = {
	plugins: {
		custom: {
			rules: {
				'newline-between-imports': newlineBetweenImportsRule,
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
				enforceSingleLine: true
			}
		],
		'custom/multiline-paren-newline': [
			'error',
			{
				singleArgument: true,
				enforceSingleLine: true
			}
		],
		'custom/multiline-array-accessor-newline': 'error',
		'custom/destructure-newline': [
			'error',
			{ minItems: 2 }
		]
	}
};
