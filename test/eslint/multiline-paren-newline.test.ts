import { RuleTester } from '@typescript-eslint/rule-tester';
import { multilineParenNewlineRule } from '../../eslint/custom_rules/multiline-paren-newline.js';

new RuleTester().run(
	'multiline-paren-newline',
	multilineParenNewlineRule,
	{
		valid: [
			// Default, should be `singleArgument: false, enforceSingleLine: false`
			{ code: 'fn( \n  a,\n  b   \n   );' },
			{ code: 'fn( \n\n \n{ a: 1 }\n  \n );' },
			{ code: 'fn(\n \n \n\n \'foo\' \n    \n\n\n );' },

			// `singleArgument: true, enforceSingleLine: false`
			{
				code: 'fn(\n  a,\n  b\n);',
				options: [
					{
						singleArgument: true,
						enforceSingleLine: false
					}
				]
			},
			{
				code: 'fn( { a: 1, \n  b: 2   } );',
				options: [
					{
						singleArgument: true,
						enforceSingleLine: false
					}
				]
			},

			// `singleArgument: false, enforceSingleLine: true`
			{
				code: 'fn(\n  a,\n  b\n);',
				options: [
					{
						singleArgument: false,
						enforceSingleLine: true
					}
				]
			},
			{
				code: 'fn( \n   \n { a: 1, \n  b: 2   } \n );',
				options: [
					{
						singleArgument: false,
						enforceSingleLine: true
					}
				]
			},
			{
				code: 'fn( \'foo\' );',
				options: [
					{
						singleArgument: false,
						enforceSingleLine: true
					}
				]
			}
		],
		invalid: [
			// Default, should be `singleArgument: false, enforceSingleLine: false`
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

			// `singleArgument: true, enforceSingleLine: false`
			{
				code: 'fn(   a ,  \n b   );',
				options: [
					{
						singleArgument: true,
						enforceSingleLine: false
					}
				],
				errors: [
					{ messageId: 'expandAfter' },
					{ messageId: 'expandBefore' }
				],
				output: 'fn(\n   a ,  \n b   \n);'
			},
			{
				code: 'fn(  \n   \n\n \n a, \n  b );',
				options: [
					{
						singleArgument: true,
						enforceSingleLine: false
					}
				],
				errors: [ { messageId: 'expandBefore' } ],
				output: 'fn(  \n   \n\n \n a, \n  b \n);'
			},
			{
				code: 'fn(\n\n \n [   1 ,  \n 2   ]\n   \n   );',
				options: [
					{
						singleArgument: true,
						enforceSingleLine: false
					}
				],
				errors: [
					{ messageId: 'collapseAfterSingleArgument' },
					{ messageId: 'collapseBeforeSingleArgument' }
				],
				output: 'fn( [   1 ,  \n 2   ]   );'
			},
			{
				code: 'fn(  [   1 ,  \n 2   ]\n   \n   );',
				options: [
					{
						singleArgument: true,
						enforceSingleLine: false
					}
				],
				errors: [ { messageId: 'collapseBeforeSingleArgument' } ],
				output: 'fn(  [   1 ,  \n 2   ]   );'
			},
			{
				code: 'fn(\n\n \n {   a :  1 ,  \n a:  2   }\n   \n   );',
				options: [
					{
						singleArgument: true,
						enforceSingleLine: false
					}
				],
				errors: [
					{ messageId: 'collapseAfterSingleArgument' },
					{ messageId: 'collapseBeforeSingleArgument' }
				],
				output: 'fn( {   a :  1 ,  \n a:  2   }   );'
			},
			{
				code: 'fn(  {   a:  1 ,  \n b  : 2   }\n   \n   );',
				options: [
					{
						singleArgument: true,
						enforceSingleLine: false
					}
				],
				errors: [ { messageId: 'collapseBeforeSingleArgument' } ],
				output: 'fn(  {   a:  1 ,  \n b  : 2   }   );'
			},

			// `singleArgument: true, enforceSingleLine: true`
			{
				code: 'fn(\n\n \n \'foo\'  );',
				options: [
					{
						singleArgument: true,
						enforceSingleLine: true
					}
				],
				errors: [ { messageId: 'collapseAfter' } ],
				output: 'fn( \'foo\'  );'
			},
			{
				code: 'fn(\n\n \n \'foo\'  \n\n \n    \n     );',
				options: [
					{
						singleArgument: true,
						enforceSingleLine: true
					}
				],
				errors: [
					{ messageId: 'collapseAfter' },
					{ messageId: 'collapseBefore' }
				],
				output: 'fn( \'foo\'       );'
			},
			{
				code: 'fn(   a ,  \n b   );',
				options: [
					{
						singleArgument: true,
						enforceSingleLine: true
					}
				],
				errors: [
					{ messageId: 'expandAfter' },
					{ messageId: 'expandBefore' }
				],
				output: 'fn(\n   a ,  \n b   \n);'
			},
			{
				code: 'fn(  \n   \n\n \n a, \n  b );',
				options: [
					{
						singleArgument: true,
						enforceSingleLine: true
					}
				],
				errors: [ { messageId: 'expandBefore' } ],
				output: 'fn(  \n   \n\n \n a, \n  b \n);'
			},
			{
				code: 'fn(\n\n \n [   1 ,  \n 2   ]\n   \n   );',
				options: [
					{
						singleArgument: true,
						enforceSingleLine: true
					}
				],
				errors: [
					{ messageId: 'collapseAfterSingleArgument' },
					{ messageId: 'collapseBeforeSingleArgument' }
				],
				output: 'fn( [   1 ,  \n 2   ]   );'
			},
			{
				code: 'fn(  [   1 ,  \n 2   ]\n   \n   );',
				options: [
					{
						singleArgument: true,
						enforceSingleLine: true
					}
				],
				errors: [ { messageId: 'collapseBeforeSingleArgument' } ],
				output: 'fn(  [   1 ,  \n 2   ]   );'
			},
			{
				code: 'fn(\n\n \n {   a :  1 ,  \n a:  2   }\n   \n   );',
				options: [
					{
						singleArgument: true,
						enforceSingleLine: true
					}
				],
				errors: [
					{ messageId: 'collapseAfterSingleArgument' },
					{ messageId: 'collapseBeforeSingleArgument' }
				],
				output: 'fn( {   a :  1 ,  \n a:  2   }   );'
			},
			{
				code: 'fn(  {   a:  1 ,  \n b  : 2   }\n   \n   );',
				options: [
					{
						singleArgument: true,
						enforceSingleLine: true
					}
				],
				errors: [ { messageId: 'collapseBeforeSingleArgument' } ],
				output: 'fn(  {   a:  1 ,  \n b  : 2   }   );'
			}
		]
	}
);
