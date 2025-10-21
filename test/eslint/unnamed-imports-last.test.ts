import { RuleTester } from '@typescript-eslint/rule-tester';
import { unnamedImportsLastRule } from '../../eslint/custom_rules/unnamed-imports-last.js';

new RuleTester().run(
	'unnamed-imports-last',
	unnamedImportsLastRule,
	{
		valid: [
			'import { a } from \'./a\';import b from \'./b\';\nimport \'./side-effect\';',
			'import a from \'./a\'\nimport { b } from \'./b\';\nimport \'./side-effect\';'
		],
		invalid: [
			{
				code: 'import \'./side-effect\';\nimport a from \'./a\';',
				errors: [ { messageId: 'error' } ],
				output: '\nimport a from \'./a\';import \'./side-effect\';'
			},
			{
				code: '\nimport { a } from \'./a\';\nimport \'./side-effect\';import b from \'./b\';',
				errors: [ { messageId: 'error' } ],
				output: '\nimport { a } from \'./a\';\nimport b from \'./b\';import \'./side-effect\';'
			}
		]
	}
);
