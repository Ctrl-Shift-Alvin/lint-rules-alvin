/**
 * @type {import('eslint').Rule.RuleModule}
 */
export const jsxNoSingleObjectCurlyNewlineRule = {
	meta: {
		type: 'layout',
		docs: {
			description: 'Disallows newlines inside curly braces for single object or array expressions in JSX.',
			category: 'Stylistic Issues',
			recommended: false
		},
		fixable: 'code',
		schema: [],
		messages: { error: 'Newlines around single object or array expressions in JSX curly braces are not allowed.' }
	},

	create(context) {

		const sourceCode = context.sourceCode;

		return {
			JSXExpressionContainer(node) {

				const expression = node.expression;

				// This rule applies only to single ArrayExpressions or ObjectExpressions.
				if (expression.type !== 'ArrayExpression' && expression.type !== 'ObjectExpression') {

					return;

				}

				// If the expression itself isn't multiline, there are no newlines to collapse.
				if (
					expression
						.loc
						.start
						.line === expression
						.loc
						.end
						.line
				) {

					return;

				}

				const openingBrace = sourceCode.getFirstToken(node); // `{`
				const closingBrace = sourceCode.getLastToken(node); // `}`
				const firstTokenInExpression = sourceCode.getFirstToken(expression);
				const lastTokenInExpression = sourceCode.getLastToken(expression);

				const hasNewlineBefore = openingBrace
					.loc
					.end
					.line < firstTokenInExpression
					.loc
					.start
					.line;
				const hasNewlineAfter = lastTokenInExpression
					.loc
					.end
					.line < closingBrace
					.loc
					.start
					.line;

				if (hasNewlineBefore || hasNewlineAfter) {

					context.report({
						node,
						messageId: 'error',
						fix(fixer) {

							const fixes = [];

							if (hasNewlineBefore) {

								// Range from the end of `{` to the start of the expression's first token.
								const range = [
									openingBrace.range[1],
									firstTokenInExpression.range[0]
								];
								fixes.push(
									fixer.replaceTextRange(
										range,
										''
									)
								);

							}

							if (hasNewlineAfter) {

								// Range from the end of the expression's last token to the start of `}`.
								const range = [
									lastTokenInExpression.range[1],
									closingBrace.range[0]
								];
								fixes.push(
									fixer.replaceTextRange(
										range,
										''
									)
								);

							}

							return fixes;

						}
					});

				}

			}
		};

	}
};
