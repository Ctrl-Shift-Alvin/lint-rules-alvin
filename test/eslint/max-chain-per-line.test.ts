import { RuleTester } from '@typescript-eslint/rule-tester';
import { maxChainPerLineRule } from '../../eslint/custom_rules/max-chain-per-line.js';

new RuleTester().run(
	'max-chain-per-line',
	maxChainPerLineRule,
	{
		valid: [
			// Default, should be `maxChain: 2, enforceSingleLine: false`
			{ code: 'obj.a' },
			{ code: 'obj  .a.b' },
			{ code: 'obj  .a() .b' },
			{ code: 'obj.a().b()' },
			{ code: 'obj.  \n\n a.  \n\n\n b()' },
			{ code: 'obj  \n.  a\n\n .b   \n.c' },
			{ code: 'obj\n .a()\n.   b\n .c()' },
			{ code: 'obj\n. a()!\n  .b\n.  c()!' }, // TS Case, `!` non-null assertion can be tricky
			{ code: 'obj .a( (i) => i .a( (j) => j  .b() ) )' }, // Nested calls should be valid

			// `maxChain: 3, enforceSingleLine: true`
			{
				code: 'obj  .a ',
				options: [
					{
						maxChain: 3,
						enforceSingleLine: true
					}
				]
			},
			{
				code: 'obj . a  .b',
				options: [
					{
						maxChain: 3,
						enforceSingleLine: true
					}
				]
			},
			{
				code: 'obj .a .b ().  c',
				options: [
					{
						maxChain: 3,
						enforceSingleLine: true
					}
				]
			},
			{
				code: 'obj  \n  \n\n.a()   \n .b \n.c \n  .d()',
				options: [
					{
						maxChain: 3,
						enforceSingleLine: true
					}
				]
			},
			{
				code: 'obj\n\n\n.a()!\n.b\n\n.c()\n.d',
				options: [
					{
						maxChain: 3,
						enforceSingleLine: true
					}
				]
			}, // TS Case, `!` non-null assertion can be tricky
			{
				code: 'obj.a( \n\n(i) => i.a( \n(j) \n=> j.b( (\nk\n\n) => k.c() ) ) )',
				options: [
					{
						maxChain: 3,
						enforceSingleLine: true
					}
				]
			} // Nested calls should be valid

		],
		invalid: [
			// Default, should be `maxChain: 2, enforceSingleLine: false`
			{
				code: 'obj  .a .b  .c',
				errors: [
					{ messageId: 'expand' },
					{ messageId: 'expand' },
					{ messageId: 'expand' }
				],
				output: 'obj  \n.a \n.b  \n.c'
			},
			{
				code: 'obj   \n\n\n.a  .b()\n\n  .  c',
				errors: [ { messageId: 'expand' } ],
				output: 'obj   \n\n\n.a  \n.b()\n\n  .  c'
			},
			{
				code: 'obj!\n \n\n  .a!   .b() \n   \n.c',
				errors: [ { messageId: 'expand' } ],
				output: 'obj!\n \n\n  .a!   \n.b() \n   \n.c'
			},

			// `maxChain: 2, enforceSingleLine: true`
			{
				code: 'obj   .   a ()\n\n\n   \n .b',
				errors: [ { messageId: 'collapse' } ],
				options: [
					{
						maxChain: 2,
						enforceSingleLine: true
					}
				],
				output: 'obj   .   a () .b'
			},
			{
				code: 'obj\n    \n .a()!\n \n   \n\n.b',
				options: [
					{
						maxChain: 2,
						enforceSingleLine: true
					}
				],
				errors: [
					{ messageId: 'collapse' },
					{ messageId: 'collapse' }
				],
				output: 'obj .a()!.b'
			},
			{
				code: 'obj   . a . b   . c  ',
				options: [
					{
						maxChain: 2,
						enforceSingleLine: true
					}
				],
				errors: [
					{ messageId: 'expand' },
					{ messageId: 'expand' },
					{ messageId: 'expand' }
				],
				output: 'obj   \n. a \n. b   \n. c  '
			},
			{
				code: 'obj \n\n  \n  .a   . b ()   \n   \n  .c',
				options: [
					{
						maxChain: 2,
						enforceSingleLine: true
					}
				],
				errors: [ { messageId: 'expand' } ],
				output: 'obj \n\n  \n  .a   \n. b ()   \n   \n  .c'
			},
			{
				code: 'obj!\n  \n.a!  . b   ()    \n \n  \n . c',
				options: [
					{
						maxChain: 2,
						enforceSingleLine: true
					}
				],
				errors: [ { messageId: 'expand' } ],
				output: 'obj!\n  \n.a!  \n. b   ()    \n \n  \n . c'
			},

			// `maxChain: 3, enforceSingleLine: true`
			{
				code: 'obj \n   . \n  a \n() . b\n \n\n  .  c ',
				options: [
					{
						maxChain: 3,
						enforceSingleLine: true
					}
				],
				errors: [
					{ messageId: 'collapse' },
					{ messageId: 'collapse' }
				],
				output: 'obj    . \n  a \n() . b  .  c '
			},
			{
				code: ' obj  \n\n  \n  \n .a  ()  !\n \n\n .b  . c()  ',
				options: [
					{
						maxChain: 3,
						enforceSingleLine: true
					}
				],
				errors: [
					{ messageId: 'collapse' },
					{ messageId: 'collapse' }
				],
				output: ' obj   .a  ()  ! .b  . c()  '
			},
			{
				code: 'obj .\n  a. \n\nb    . c   . d ',
				options: [
					{
						maxChain: 3,
						enforceSingleLine: true
					}
				],
				errors: [
					{ messageId: 'expand' },
					{ messageId: 'expand' },
					{ messageId: 'expand' },
					{ messageId: 'expand' }
				],
				output: 'obj \n.\n  a\n. \n\nb    \n. c   \n. d '
			},
			{
				code: 'obj\n.a.b()\n.c.d()',
				options: [
					{
						maxChain: 3,
						enforceSingleLine: true
					}
				],
				errors: [
					{ messageId: 'expand' },
					{ messageId: 'expand' }
				],
				output: 'obj\n.a\n.b()\n.c\n.d()'
			},
			{
				code: 'obj!\n.a!.b()\n.c!.d()',
				options: [
					{
						maxChain: 3,
						enforceSingleLine: true
					}
				],
				errors: [
					{ messageId: 'expand' },
					{ messageId: 'expand' }
				],
				output: 'obj!\n.a!\n.b()\n.c!\n.d()'
			}
		]
	}
);
