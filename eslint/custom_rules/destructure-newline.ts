import {
	AST_NODE_TYPES,
	ESLintUtils
} from '@typescript-eslint/utils';

export const destructureNewlineRule = ESLintUtils.RuleCreator.withoutDocs({
	meta: {
		type: 'layout',
		docs: { description: 'Enforce newlines between properties in destructuring assignments' },
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
		messages: { error: 'There should be a newline between destructuring properties.' }
	},
	defaultOptions: [ { minItems: 2 } ],
	create(context, options) {

		const sourceCode = context.sourceCode;
		const { minItems } = options[0];

		return {
			VariableDeclarator(node) {

				if (node.id.type !== AST_NODE_TYPES.ObjectPattern) {

					return;

				}
				const properties = node.id.properties;

				if (properties.length < minItems) {

					return;

				}

				for (let i = 0; i < properties.length - 1; i++) {

					const currentProperty = properties[i];
					const nextProperty = properties[i + 1];

					const lastTokenOfCurrent = sourceCode.getLastToken(currentProperty);
					const firstTokenOfNext = sourceCode.getFirstToken(nextProperty);

					// Token not found
					if (!lastTokenOfCurrent || !firstTokenOfNext) {

						continue;

					}

					if (
						lastTokenOfCurrent
							.loc
							.end
							.line === firstTokenOfNext
							.loc
							.start
							.line
					) {

						context.report({
							node: nextProperty,
							messageId: 'error',
							fix(fixer) {

								return fixer.insertTextBefore(
									nextProperty,
									'\n'
								);

							}
						});

					}

				}

			}
		};

	}
});
