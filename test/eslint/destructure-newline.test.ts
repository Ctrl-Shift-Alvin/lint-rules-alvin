import { RuleTester } from '@typescript-eslint/rule-tester';
import { destructureNewlineRule } from '../../eslint/custom_rules/destructure-newline.js';

new RuleTester().run(
	'destructure-newline',
	destructureNewlineRule,
	{
		valid: [
			'const {    a ,  \nb   } = obj;',
			'const {    a ,\n  b   } = obj;',
			'const {    a  } = obj;'
		],
		invalid: [
			{
				code: 'const  \n{ \n  a,  b } \n  = \nobj;',
				errors: [ { messageId: 'error' } ],
				output: 'const  \n{ \n  a,  \nb } \n  = \nobj;'
			}
		]
	}
);
