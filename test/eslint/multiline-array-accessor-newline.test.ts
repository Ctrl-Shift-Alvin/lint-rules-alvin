import { RuleTester } from '@typescript-eslint/rule-tester';
import { multilineArrayAccessorNewlineRule } from '../../eslint/custom_rules/multiline-array-accessor-newline.js';

new RuleTester().run(
	'multiline-array-accessor-newline',
	multilineArrayAccessorNewlineRule,
	{
		valid: [
			{ code: 'obj[0]' },
			{ code: 'obj[ 0   ]' },
			{ code: 'obj[\n obj.a()\n.b   \n]' }
		],
		invalid: [
			{
				code: 'obj[ 0\n]',
				errors: [ { messageId: 'collapse' } ],
				output: 'obj[ 0]'
			},
			{
				code: 'obj[\n\n  0  \n]',
				errors: [
					{ messageId: 'collapse' },
					{ messageId: 'collapse' }
				],
				output: 'obj[  0  ]'
			},
			{
				code: 'obj[ obj\n.a.b()   ]',
				errors: [
					{ messageId: 'expandAfter' },
					{ messageId: 'expandBefore' }
				],
				output: 'obj[\n obj\n.a.b()   \n]'
			}
		]
	}
);
