import path from 'node:path';
import { includeIgnoreFile } from '@eslint/compat';
import eslintJs from '@eslint/js';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import { TSESLint } from '@typescript-eslint/utils';

/**
 * The ESLint base config. Includes base rules, ignore files and directives,
 * and the recommended eslintJs rules.
 */
export const base: TSESLint.FlatConfig.ConfigArray = [
	includeIgnoreFile(
		path.join(
			process.cwd(),
			'.gitignore'
		)
	),
	globalIgnores([
		'eslint.config.js',
		'eslint.config.ts'
	]),
	{
		name: 'base/env',
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.nodeBuiltin,
				...globals.serviceworker
			}
		}
	},
	eslintJs.configs.recommended
];
