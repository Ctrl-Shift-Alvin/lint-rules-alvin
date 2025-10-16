/**
 * @type {import('eslint').Rule.RuleModule}
 */
export const multilineArrayAccessorNewlineRule = {
	meta: {
		type: 'layout',
		docs: {
			description: 'Require newlines inside multiline array accessors',
			category: 'Stylistic Issues',
			recommended: false
		},
		fixable: 'whitespace',
		schema: [],
		messages: {
			expectedNewlineAfterBracket: 'Expected a newline after \'\'',
			expectedNewlineBeforeBracket: 'Expected a newline before \']\'',
			expectedSingleLine: 'Array accessor content should be on a single line.'
		}
	},

	create(context) {

		const sourceCode = context.sourceCode;

		/**
		 * @param {import('estree').MemberExpression} node
		 */
		function checkMemberExpression(node) {

			if (!node.computed) {

				return;

			}

			const openBracket = sourceCode.getTokenAfter(
				node.object,
				{ filter: (t) => t.value === '[' }
			);

			if (!openBracket) {

				return;

			}

			const closeBracket = sourceCode.getLastToken(node);

			if (closeBracket.value !== ']') {

				return;

			}

			// If the brackets are on the same line, this rule doesn't apply.
			if (
				openBracket
					.loc
					.start
					.line === closeBracket
					.loc
					.end
					.line
			) {

				return;

			}

			const firstTokenOfProperty = sourceCode.getFirstToken(node.property);
			const lastTokenOfProperty = sourceCode.getLastToken(node.property);

			// Check if property is on a single line
			if (
				firstTokenOfProperty
					.loc
					.start
					.line === lastTokenOfProperty
					.loc
					.end
					.line
			) {

				const openBracketOnOwnLine = openBracket
					.loc
					.end
					.line !== firstTokenOfProperty
					.loc
					.start
					.line;
				const closeBracketOnOwnLine = lastTokenOfProperty
					.loc
					.end
					.line !== closeBracket
					.loc
					.start
					.line;

				if (openBracketOnOwnLine || closeBracketOnOwnLine) {

					context.report({
						node,
						messageId: 'expectedSingleLine',
						fix(fixer) {

							const fixes = [];
							if (openBracketOnOwnLine) {

								fixes.push(
									fixer.replaceTextRange(
										[
											openBracket.range[1],
											firstTokenOfProperty.range[0]
										],
										''
									)
								);

							}

							if (closeBracketOnOwnLine) {

								fixes.push(
									fixer.replaceTextRange(
										[
											lastTokenOfProperty.range[1],
											closeBracket.range[0]
										],
										''
									)
								);

							}
							return fixes;

						}
					});

				}
				return;

			}

			// Check for a newline after the opening bracket.
			if (
				openBracket
					.loc
					.end
					.line === firstTokenOfProperty
					.loc
					.start
					.line
			) {

				context.report({
					node: openBracket,
					messageId: 'expectedNewlineAfterBracket',
					fix: (fixer) => fixer.insertTextAfter(
						openBracket,
						'\n'
					)
				});

			}

			// Check for a newline before the closing bracket.
			if (
				lastTokenOfProperty
					.loc
					.end
					.line === closeBracket
					.loc
					.start
					.line
			) {

				context.report({
					node: closeBracket,
					messageId: 'expectedNewlineBeforeBracket',
					fix: (fixer) => fixer.insertTextBefore(
						closeBracket,
						'\n'
					)
				});

			}

		}

		return { MemberExpression: checkMemberExpression };

	}
};
