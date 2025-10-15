import path from 'node:path';
import { includeIgnoreFile } from '@eslint/compat';
import eslintJs from '@eslint/js';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';

/**
 * The ESLint base config. Includes base rules, ignore files and directives,
 * and the recommended eslintJs rules.
 *
 * @type {import('eslint').Linter.Config}
 */
export const base = [
	includeIgnoreFile(
		path.join(
			process.cwd(),
			'.gitignore'
		)
	),
	globalIgnores([
		'eslint.config.js',
		'eslint.config.ts'
	])
];
