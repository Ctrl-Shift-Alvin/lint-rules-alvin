/**
 * @type {import('eslint').Rule.RuleModule}
 */
export const newlineBetweenImportsRule = {
	meta: {
		type: 'layout',
		docs: {
			description: 'Enforce newlines between import specifiers',
			category: 'Stylistic Issues',
			recommended: false
		},
		fixable: 'whitespace',
		schema: [
			{
				type: 'object',
				properties: {
					minItems: {
						type: 'integer',
						minimum: 2
					}
				},
				additionalProperties: false
			}
		],
		messages: { error: 'There should be a newline between import specifiers.' }
	},

	create(context) {

		const sourceCode = context.sourceCode;
		const { minItems = 2 } = context.options[0] || {};

		return {
			ImportDeclaration(node) {

				const specifiers = node
					.specifiers
					.filter((specifier) => specifier.type === 'ImportSpecifier');

				if (specifiers.length < minItems) {

					return;

				}

				for (let i = 0; i < specifiers.length - 1; i++) {

					const currentSpecifier = specifiers[i];
					const nextSpecifier = specifiers[i + 1];

					const lastTokenOfCurrent = sourceCode.getLastToken(currentSpecifier);
					const firstTokenOfNext = sourceCode.getFirstToken(nextSpecifier);

					if (lastTokenOfCurrent.loc.end.line === firstTokenOfNext.loc.start.line) {

						context.report({
							node: nextSpecifier,
							messageId: 'error',
							fix(fixer) {

								return fixer.insertTextBefore(
									nextSpecifier,
									'\n'
								);

							}
						});

					}

				}

			}
		};

	}
};
