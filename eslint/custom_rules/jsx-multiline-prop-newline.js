/**
 * @type {import('eslint').Rule.RuleModule}
 */
export const jsxMultilinePropNewlineRule = {
	meta: {
		type: 'layout',
		docs: {
			description: 'Enforces a new line for the first prop if any prop\'s value is multiline.',
			category: 'Stylistic Issues',
			recommended: false
		},
		fixable: 'code',
		schema: [],
		messages: { error: 'The first property should be on a new line if any property\'s value is multiline.' }
	},

	create(context) {

		const sourceCode = context.sourceCode;

		function isMultiline(node) {

			return node && node.loc && node
				.loc
				.start
				.line < node
				.loc
				.end
				.line;

		}

		return {
			JSXOpeningElement(node) {

				if (node.attributes.length === 0) {

					return;

				}

				const hasMultilineProp = node.attributes.some(
					(attr) => {

						// Check for JSXAttribute (e.g., href={...})
						if (attr.type === 'JSXAttribute') {

							return isMultiline(attr.value);

						}

						// Check for JSXSpreadAttribute (e.g., {...props})
						if (attr.type === 'JSXSpreadAttribute') {

							return isMultiline(attr);

						}
						return false;

					}
				);

				if (!hasMultilineProp) {

					return;

				}

				const firstProp = node.attributes[0];

				// Check if the tag name and the first prop are on the same line.
				if (
					node
						.name
						.loc
						.end
						.line === firstProp
						.loc
						.start
						.line
				) {

					context.report({
						node: firstProp,
						messageId: 'error',
						fix(fixer) {

							// Get indentation of the line with the opening tag.
							const line = sourceCode.getLines()[
								node
									.loc
									.start
									.line - 1
							];
							const baseIndentMatch = line.match(/^\s*/);
							const baseIndent = baseIndentMatch
								? baseIndentMatch[0]
								: '';

							// Assume an indent of 2 spaces, a common practice.
							const indent = baseIndent + '  ';

							return fixer.insertTextBefore(
								firstProp,
								`\n${indent}`
							);

						}
					});

				}

			}
		};

	}
};
