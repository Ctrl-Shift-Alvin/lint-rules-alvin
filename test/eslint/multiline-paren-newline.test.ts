import { RuleTester } from '@typescript-eslint/rule-tester';
import { multilineParenNewlineRule } from '../../eslint/custom_rules/multiline-paren-newline.js';

new RuleTester().run(
	'multiline-paren-newline',
	multilineParenNewlineRule,
	{
		valid: [
			// Default, should be `singleArgument: false`
			{ code: 'fn( \n  a,\n  b   \n   );' },
			{ code: 'fn( \n\n \n{ a: 1 }\n  \n );' },

			// `singleArgument: true`
			{
				code: 'fn(\n  a,\n  b\n);',
				options: [ { singleArgument: true } ]
			},
			{
				code: 'fn( { a: 1, \n  b: 2   } );',
				options: [ { singleArgument: true } ]
			}
		],
		invalid: [
			// Default, should be `singleArgument: false`
			{
				code: 'fn(   a ,  \n b   );',
				errors: [
					{ messageId: 'expandAfter' },
					{ messageId: 'expandBefore' }
				],
				output: 'fn(\n   a ,  \n b   \n);'
			},
			{
				code: 'fn(  \n   \n\n \n a, \n  b );',
				errors: [ { messageId: 'expandBefore' } ],
				output: 'fn(  \n   \n\n \n a, \n  b \n);'
			},

			// `singleArgument: true`
			{
				code: 'fn(   a ,  \n b   );',
				options: [ { singleArgument: true } ],
				errors: [
					{ messageId: 'expandAfter' },
					{ messageId: 'expandBefore' }
				],
				output: 'fn(\n   a ,  \n b   \n);'
			},
			{
				code: 'fn(  \n   \n\n \n a, \n  b );',
				options: [ { singleArgument: true } ],
				errors: [ { messageId: 'expandBefore' } ],
				output: 'fn(  \n   \n\n \n a, \n  b \n);'
			},
			{
				code: 'fn(\n\n \n [   1 ,  \n 2   ]\n   \n   );',
				options: [ { singleArgument: true } ],
				errors: [
					{ messageId: 'collapseAfterSingleArgument' },
					{ messageId: 'collapseBeforeSingleArgument' }
				],
				output: 'fn( [   1 ,  \n 2   ]   );'
			},
			{
				code: 'fn(  [   1 ,  \n 2   ]\n   \n   );',
				options: [ { singleArgument: true } ],
				errors: [ { messageId: 'collapseBeforeSingleArgument' } ],
				output: 'fn(  [   1 ,  \n 2   ]   );'
			},
			{
				code: 'fn(\n\n \n {   a :  1 ,  \n a:  2   }\n   \n   );',
				options: [ { singleArgument: true } ],
				errors: [
					{ messageId: 'collapseAfterSingleArgument' },
					{ messageId: 'collapseBeforeSingleArgument' }
				],
				output: 'fn( {   a :  1 ,  \n a:  2   }   );'
			},
			{
				code: 'fn(  {   a:  1 ,  \n b  : 2   }\n   \n   );',
				options: [ { singleArgument: true } ],
				errors: [ { messageId: 'collapseBeforeSingleArgument' } ],
				output: 'fn(  {   a:  1 ,  \n b  : 2   }   );'
			}
		]
	}
);
