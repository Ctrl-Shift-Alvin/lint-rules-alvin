import { RuleTester } from '@typescript-eslint/rule-tester';
import { newlineBetweenImportsRule } from '../../eslint/custom_rules/newline-between-imports.js';

new RuleTester().run(
	'newline-between-imports',
	newlineBetweenImportsRule,
	{
		valid: [
			'import { a,\n b } from \'./mod\';',
			'import { a,\n b,\n c } from \'./mod\';'
		],
		invalid: [
			{
				code: 'import { a, b } from \'./mod\';',
				errors: [ { messageId: 'error' } ],
				output: 'import { a, \nb } from \'./mod\';'
			}
		]
	}
);
