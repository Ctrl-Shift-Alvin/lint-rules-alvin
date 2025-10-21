import { RuleTester } from '@typescript-eslint/rule-tester';
import { jsxMultilinePropNewlineRule } from '../../eslint/custom_rules/jsx-multiline-prop-newline.js';

new RuleTester({ languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } }).run(
	'jsx-multiline-prop-newline',
	jsxMultilinePropNewlineRule,
	{
		valid: [
			// Default settings, should be `enforceSingleLine: false, allowSingleExpression: true`
			{ code: '<X prop={\n  () => ({ a: 1,\n\nb: 2 }) \n} />' },
			{ code: '<X prop={[ 1,\n\n2\n ]} />' },
			{ code: '<X prop={{ a: 1,   b: 2 }} />' },
			{ code: '<X prop={\n obj\n.hi\n.hi \n} />' },

			// All false
			{
				code: '<X prop={ { a: 1 } } />',
				options: [
					{
						enforceSingleLine: false,
						allowSingleExpression: false
					}
				]
			},
			{
				code: '<X prop={ \n\n{ a: 1 }\n } />',
				options: [
					{
						enforceSingleLine: false,
						allowSingleExpression: false
					}
				]
			},

			// Only `enforceSingleLine` true
			{
				code: '<X prop={() => ([ 1, 2 ])} />',
				options: [
					{
						enforceSingleLine: false,
						allowSingleExpression: true
					}
				]
			},
			{
				code: '<X prop={[ 1, \n\n2, 3 \n]} />',
				options: [
					{
						enforceSingleLine: false,
						allowSingleExpression: true
					}
				]
			}

		],
		invalid: [
			// Default settings, should be `enforceSingleLine: false`, `allowSingleExpression: true`
			{
				code: '<X prop={() => ({ a: 1,\n\nb: 2 }) } />',
				errors: [
					{ messageId: 'expand' },
					{ messageId: 'expand' }
				],
				output: '<X prop={\n() => ({ a: 1,\n\nb: 2 }) \n} />'
			},
			{
				code: '<X prop={\n\n[ 1,\n\n 2\n ]} />',
				errors: [ { messageId: 'collapse' } ],
				output: '<X prop={[ 1,\n\n 2\n ]} />'
			},
			{
				code: '<X prop={\n[ 1,\n\n 2\n ]\n\n} />',
				errors: [
					{ messageId: 'collapse' },
					{ messageId: 'collapse' }
				],
				output: '<X prop={[ 1,\n\n 2\n ]} />'
			},
			{
				code: '<X prop={\n\n{ a: 1,   b: 2 }\n} />',
				errors: [
					{ messageId: 'collapse' },
					{ messageId: 'collapse' }
				],
				output: '<X prop={{ a: 1,   b: 2 }} />'
			},
			{
				code: '<X prop={obj\n.hi\n.hi} />',
				errors: [
					{ messageId: 'expand' },
					{ messageId: 'expand' }
				],
				output: '<X prop={\nobj\n.hi\n.hi\n} />'
			},
			{
				code: '<X prop={\n\n\n{ a: 1 }\n} />',
				errors: [
					{ messageId: 'collapse' },
					{ messageId: 'collapse' }
				],
				output: '<X prop={{ a: 1 }} />'
			},

			// All false
			{
				code: '<X prop={{ \na: 1 }} />',
				options: [
					{
						enforceSingleLine: false,
						allowSingleExpression: false
					}
				],
				errors: [
					{ messageId: 'expand' },
					{ messageId: 'expand' }
				],
				output: '<X prop={\n{ \na: 1 }\n} />'
			},
			{
				code: '<X prop={\n\n{ \na: 1 }} />',
				options: [
					{
						enforceSingleLine: false,
						allowSingleExpression: false
					}
				],
				errors: [ { messageId: 'expand' } ],
				output: '<X prop={\n\n{ \na: 1 }\n} />'
			},

			// Only `enforceSingleLine` true
			{
				code: '<X prop={\n\n[ 1, 2 ]\n} />',
				options: [
					{
						enforceSingleLine: false,
						allowSingleExpression: true
					}
				],
				errors: [
					{ messageId: 'collapse' },
					{ messageId: 'collapse' }
				],
				output: '<X prop={[ 1, 2 ]} />'
			},
			{
				code: '<X prop={\n{ a: 1, b: 2 }\n\n} />',
				options: [
					{
						enforceSingleLine: false,
						allowSingleExpression: true
					}
				],
				errors: [
					{ messageId: 'collapse' },
					{ messageId: 'collapse' }
				],
				output: '<X prop={{ a: 1, b: 2 }} />'
			},

			// All true
			{
				code: '<X prop={\n\n[ 1, 2 ]\n} />',
				options: [
					{
						enforceSingleLine: true,
						allowSingleExpression: true
					}
				],
				errors: [
					{ messageId: 'collapse' },
					{ messageId: 'collapse' }
				],
				output: '<X prop={[ 1, 2 ]} />'
			},
			{
				code: '<X prop={\n{ a: 1, b: 2 }} />',
				options: [
					{
						enforceSingleLine: true,
						allowSingleExpression: true
					}
				],
				errors: [ { messageId: 'collapse' } ],
				output: '<X prop={{ a: 1, b: 2 }} />'
			},
			{
				code: '<X prop={() => ({ a: 1,\n\n b: 2 })} />',
				options: [
					{
						enforceSingleLine: true,
						allowSingleExpression: true
					}
				],
				errors: [
					{ messageId: 'expand' },
					{ messageId: 'expand' }
				],
				output: '<X prop={\n() => ({ a: 1,\n\n b: 2 })\n} />'
			}
		]
	}
);
