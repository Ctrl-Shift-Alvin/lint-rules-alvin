import path from 'node:path';
import { includeIgnoreFile } from '@eslint/compat';
import { globalIgnores } from 'eslint/config';

/**
 * The `ESLint` base config. Includes base rules, ignore files and directives.
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
