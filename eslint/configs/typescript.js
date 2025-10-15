import eslintTs from '@typescript-eslint/eslint-plugin';
import eslintTsParser from '@typescript-eslint/parser';

/**
 * The ESLint `typescript` config. Extends `configs.base`,
 * enables `languageOptions.parserOptions.projectService` and configures all rules,
 * only for `ts`, `tsx`, `mts` and `cts` files.
 *
 * @type {import('eslint').Linter.Config}
 */
export const typescript = {
	name: 'typescript',
	files: [
		'**/*.ts',
		'**/*.tsx',
		'**/*.mts',
		'**/*.cts'
	],
	...eslintTs.configs['flat/base'],
	languageOptions: {
		parser: eslintTsParser,
		parserOptions: { projectService: true },
		sourceType: 'module'
	},
	rules: {
		'@typescript-eslint/array-type': [
			'error',
			{
				default: 'array',
				readonly: 'array'
			}
		],
		'@typescript-eslint/class-literal-property-style': [
			'error',
			'fields'
		],
		'@typescript-eslint/consistent-indexed-object-style': [
			'error',
			'record'
		],
		'@typescript-eslint/consistent-type-exports': 'error',
		'@typescript-eslint/consistent-type-imports': 'off', // Prefer import/ rule over this
		'@typescript-eslint/consistent-type-assertions': [
			'error',
			{
				assertionStyle: 'as',
				arrayLiteralTypeAssertions: 'allow',
				objectLiteralTypeAssertions: 'allow'
			}
		],
		'dot-notation': 'off',
		'@typescript-eslint/dot-notation': [
			'error',
			{
				allowPrivateClassPropertyAccess: false,
				allowProtectedClassPropertyAccess: false,
				allowIndexSignaturePropertyAccess: false
			}
		],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'max-params': 'off',
		'@typescript-eslint/max-params': [
			'warn',
			{
				max: 3,
				countVoidThis: false
			}
		],
		'@typescript-eslint/member-ordering': [
			'error',
			{
				default: {
					memberTypes: [
					// Index signature
						'signature',
						'call-signature',

						// Fields
						'public-static-field',
						'protected-static-field',
						'private-static-field',
						'#private-static-field',

						'public-decorated-field',
						'protected-decorated-field',
						'private-decorated-field',

						'public-instance-field',
						'protected-instance-field',
						'private-instance-field',
						'#private-instance-field',

						'public-abstract-field',
						'protected-abstract-field',

						'public-field',
						'protected-field',
						'private-field',
						'#private-field',

						'static-field',
						'instance-field',
						'abstract-field',

						'decorated-field',

						'field',

						// Static initialization
						'static-initialization',

						// Constructors
						'public-constructor',
						'protected-constructor',
						'private-constructor',

						'constructor',

						// Accessors
						'public-static-accessor',
						'protected-static-accessor',
						'private-static-accessor',
						'#private-static-accessor',

						'public-decorated-accessor',
						'protected-decorated-accessor',
						'private-decorated-accessor',

						'public-instance-accessor',
						'protected-instance-accessor',
						'private-instance-accessor',
						'#private-instance-accessor',

						'public-abstract-accessor',
						'protected-abstract-accessor',

						'public-accessor',
						'protected-accessor',
						'private-accessor',
						'#private-accessor',

						'static-accessor',
						'instance-accessor',
						'abstract-accessor',

						'decorated-accessor',

						'accessor',

						// Getters
						'public-static-get',
						'protected-static-get',
						'private-static-get',
						'#private-static-get',

						'public-decorated-get',
						'protected-decorated-get',
						'private-decorated-get',

						'public-instance-get',
						'protected-instance-get',
						'private-instance-get',
						'#private-instance-get',

						'public-abstract-get',
						'protected-abstract-get',

						'public-get',
						'protected-get',
						'private-get',
						'#private-get',

						'static-get',
						'instance-get',
						'abstract-get',

						'decorated-get',

						'get',

						// Setters
						'public-static-set',
						'protected-static-set',
						'private-static-set',
						'#private-static-set',

						'public-decorated-set',
						'protected-decorated-set',
						'private-decorated-set',

						'public-instance-set',
						'protected-instance-set',
						'private-instance-set',
						'#private-instance-set',

						'public-abstract-set',
						'protected-abstract-set',

						'public-set',
						'protected-set',
						'private-set',
						'#private-set',

						'static-set',
						'instance-set',
						'abstract-set',

						'decorated-set',

						'set',

						// Methods
						'public-static-method',
						'protected-static-method',
						'private-static-method',
						'#private-static-method',

						'public-decorated-method',
						'protected-decorated-method',
						'private-decorated-method',

						'public-instance-method',
						'protected-instance-method',
						'private-instance-method',
						'#private-instance-method',

						'public-abstract-method',
						'protected-abstract-method',

						'public-method',
						'protected-method',
						'private-method',
						'#private-method',

						'static-method',
						'instance-method',
						'abstract-method',

						'decorated-method',

						'method'
					]
				}
			}
		],
		'@typescript-eslint/method-signature-style': [
			'error',
			'property'
		],
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'default',
				format: [
					'camelCase',
					'PascalCase',
					'UPPER_CASE',
					'snake_case'
				],
				leadingUnderscore: 'forbid',
				trailingUnderscore: 'forbid'
			},
			{
				selector: 'memberLike', // classicAccessor, autoAccessor, enumMember, method, parameterProperty, property
				format: [
					'camelCase',
					'PascalCase',
					'UPPER_CASE',
					'snake_case'
				],
				leadingUnderscore: 'forbid',
				trailingUnderscore: 'forbid'
			},
			{
				selector: 'accessor', // classicAccessor, autoAccessor
				format: [
					'camelCase',
					'PascalCase',
					'UPPER_CASE',
					'snake_case'
				],
				leadingUnderscore: 'forbid',
				trailingUnderscore: 'forbid'
			},
			{
				selector: 'method', // classMethod, objectLiteralMethod, typeMethod
				format: [
					'camelCase',
					'PascalCase',
					'snake_case'
				],
				leadingUnderscore: 'forbid',
				trailingUnderscore: 'forbid'
			},
			{
				selector: 'property', // classProperty, objectLiteralProperty, typeProperty
				format: [
					'camelCase',
					'UPPER_CASE'
				],
				leadingUnderscore: 'allow',
				trailingUnderscore: 'forbid'
			},
			{
				selector: 'typeLike', // class, enum, interface, typeAlias, typeParameter
				format: [ 'PascalCase' ],
				leadingUnderscore: 'allow',
				trailingUnderscore: 'allow'
			},
			{
				selector: 'variableLike', // function, parameter, variable
				format: [],
				leadingUnderscore: 'allow',
				trailingUnderscore: 'allow'
			},
			{
				selector: 'import',
				format: [
					'camelCase',
					'PascalCase'
				],
				leadingUnderscore: 'forbid',
				trailingUnderscore: 'forbid'
			},
			{
				selector: 'objectLiteralProperty',
				format: [],
				leadingUnderscore: 'allow',
				trailingUnderscore: 'allow'
			}
		],
		'no-array-constructor': 'off',
		'@typescript-eslint/no-array-constructor': 'error',
		'@typescript-eslint/no-array-delete': 'warn',
		'@typescript-eslint/no-base-to-string': 'error',
		'@typescript-eslint/no-confusing-non-null-assertion': 'error',
		'@typescript-eslint/no-confusing-void-expression': 'error',
		'@typescript-eslint/no-deprecated': 'error',
		'@typescript-eslint/no-dupe-class-members': 'error',
		'@typescript-eslint/no-duplicate-enum-values': 'error',
		'@typescript-eslint/no-duplicate-type-constituents': 'error',
		'@typescript-eslint/no-dynamic-delete': 'error',
		'@typescript-eslint/no-empty-function': 'warn',
		'@typescript-eslint/no-empty-interface': 'warn',
		'@typescript-eslint/no-empty-object-type': 'warn',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-extra-non-null-assertion': 'error',
		'@typescript-eslint/no-extraneous-class': 'error',
		'@typescript-eslint/no-floating-promises': [
			'error',
			{
				checkThenables: false,
				ignoreIIFE: false,
				ignoreVoid: true
			}
		],
		'@typescript-eslint/no-for-in-array': 'error',
		'no-implied-eval': 'off',
		'@typescript-eslint/no-implied-eval': 'error',
		'@typescript-eslint/no-invalid-void-type': [
			'error',
			{
				allowInGenericTypeArguments: true,
				allowAsThisParameter: false
			}
		],
		'no-loop-func': 'off',
		'@typescript-eslint/no-loop-func': 'error',
		'no-magic-numbers': 'off',
		'@typescript-eslint/no-magic-numbers': 'off',
		'@typescript-eslint/no-meaningless-void-operator': [
			'error',
			{ checkNever: true }
		],
		'@typescript-eslint/no-misused-new': 'error',
		'@typescript-eslint/no-misused-promises': [
			'error',
			{
				checksConditionals: true,
				checksVoidReturn: true,
				checksSpreads: true
			}
		],
		'@typescript-eslint/no-misused-spread': 'error',
		'@typescript-eslint/no-mixed-enums': 'error',
		'@typescript-eslint/no-namespace': [
			'error',
			{
				allowDeclarations: false,
				allowDefinitionFiles: true
			}
		],
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': [
			'error',
			{
				builtinGlobals: true,
				hoist: 'functions',
				ignoreOnInitialization: false,
				ignoreTypeValueShadow: true,
				ignoreFunctionTypeParameterNameValueShadow: false
			}
		],
		'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
		'@typescript-eslint/no-unnecessary-condition': 'error',
		'@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',
		'@typescript-eslint/no-unnecessary-qualifier': 'error',
		'@typescript-eslint/no-unnecessary-template-expression': 'error',
		'@typescript-eslint/no-unnecessary-type-arguments': 'error',
		'@typescript-eslint/no-unnecessary-type-assertion': 'error',
		'@typescript-eslint/no-unnecessary-type-constraint': 'error',
		'@typescript-eslint/no-unnecessary-type-conversion': 'error',
		'@typescript-eslint/no-unnecessary-type-parameters': 'error',
		'@typescript-eslint/no-unsafe-argument': 'warn',
		'@typescript-eslint/no-unsafe-assignment': 'warn',
		'@typescript-eslint/no-unsafe-call': 'warn',
		'@typescript-eslint/no-unsafe-declaration-merging': 'error',
		'@typescript-eslint/no-unsafe-enum-comparison': 'error',
		'@typescript-eslint/no-unsafe-function-type': 'error',
		'@typescript-eslint/no-unsafe-member-access': [
			'warn',
			{ allowOptionalChaining: false }
		],
		'@typescript-eslint/no-unsafe-return': 'error',
		'@typescript-eslint/no-unsafe-type-assertion': 'warn',
		'@typescript-eslint/no-unsafe-unary-minus': 'warn',
		'@typescript-eslint/no-unused-expressions': 'warn',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'warn',
		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': 'error',
		'no-useless-constructor': 'off',
		'@typescript-eslint/no-useless-constructor': 'error',
		'@typescript-eslint/no-useless-empty-export': 'error',
		'@typescript-eslint/no-var-requires': 'off', // Deprecated in favor of 'no-require-imports'
		'@typescript-eslint/no-wrapper-object-types': 'warn',
		'@typescript-eslint/non-nullable-type-assertion-style': 'error',
		'@typescript-eslint/only-throw-error': 'error',
		'@typescript-eslint/parameter-properties': 'off',
		'@typescript-eslint/prefer-as-const': 'error',
		'@typescript-eslint/prefer-destructing': 'off',
		'@typescript-eslint/prefer-enum-initializers': 'off',
		'@typescript-eslint/prefer-find': 'error',
		'@typescript-eslint/prefer-for-of': 'error',
		'@typescript-eslint/prefer-function-type': 'error',
		'@typescript-eslint/prefer-includes': 'error',
		'@typescript-eslint/prefer-literal-enum-member': 'off',
		'@typescript-eslint/prefer-namespace-keyword': 'error',
		'@typescript-eslint/prefer-nullish-coalescing': 'error',
		'@typescript-eslint/prefer-optional-chain': 'error',
		'@typescript-eslint/prefer-promise-reject-errors': 'error',
		'@typescript-eslint/prefer-readonly': 'error',
		'@typescript-eslint/prefer-readonly-parameter-types': 'off',
		'@typescript-eslint/prefer-reduce-type-parameter': 'error',
		'@typescript-eslint/prefer-regexp-exec': 'error',
		'@typescript-eslint/prefer-return-this-type': 'error',
		'@typescript-eslint/prefer-string-starts-ends-with': 'error',
		'@typescript-eslint/prefer-ts-expect-error': 'off', // Deprecated in favor of ban-ts-comment
		'@typescript-eslint/promise-function-async': 'off',
		'@typescript-eslint/related-getter-setter-pairs': 'error',
		'@typescript-eslint/require-array-sort-compare': 'error',
		'@typescript-eslint/require-await': 'warn',
		'@typescript-eslint/restrict-plus-operands': 'error',
		'@typescript-eslint/restrict-template-expressions': 'warn',
		'@typescript-eslint/return-await': [
			'error',
			'always'
		],
		'@typescript-eslint/sort-type-constituents': 'off', // Deprecated in favor of sort-intersection-types, etc.
		'@typescript-eslint/strict-boolean-expressions': [
			'error',
			{
				allowAny: false,
				allowNullableBoolean: false,
				allowNullableEnum: false,
				allowNullableNumber: true,
				allowNullableObject: true,
				allowNullableString: true,
				allowNumber: false,
				allowString: false

				// allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
			}
		],
		'@typescript-eslint/switch-exhaustiveness-check': [
			'error',
			{
				allowDefaultCaseForExhaustiveSwitch: true,
				considerDefaultExhaustiveForUnions: false,
				requireDefaultForNonUnion: false
			}
		],
		'@typescript-eslint/triple-slash-reference': [
			'error',
			{
				lib: 'never',
				path: 'never',
				types: 'never'
			}
		],
		'@typescript-eslint/unbound-method': 'error',
		'@typescript-eslint/unified-signatures': [
			'error',
			{
				ignoreDifferentlyNamedParameters: true,
				ignoreOverloadsWithDifferentJSDoc: true
			}
		],
		'@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',

		// Other base ESLint overrides
		'no-undef': 'off'

	}
};
