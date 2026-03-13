import {
	ESLintUtils,
	TSESTree
} from '@typescript-eslint/utils';

export const multilineArrayAccessorNewlineRule = ESLintUtils.RuleCreator.withoutDocs({
	meta: {
		type: 'layout',
		docs: { description: 'Require newlines inside multiline array accessors' },
		fixable: 'whitespace',
		schema: [],
		messages: {
			expandAfter: 'Expected a newline after \'\'',
			expandBefore: 'Expected a newline before \'\']\'',
			collapse: 'Array accessor content should be on a single line.'
		}
	},
	defaultOptions: [],
	create(context) {

		const sourceCode = context.sourceCode;

		function checkMemberExpression(node: TSESTree.MemberExpression) {

			const openBracket = sourceCode.getTokenAfter(
				node.object,
				{ filter: (t)=> t.value === '[' }
			);

			if (!openBracket) {

				return;

			}

			const closeBracket = sourceCode.getLastToken(node);

			if (closeBracket?.value !== ']') {

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

			if (!firstTokenOfProperty || !lastTokenOfProperty) {

				return;

			}

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

					/*
					 * Report separate errors for opening and closing brackets so each
					 * bracket produces its own message and fix.
					 */
					if (openBracketOnOwnLine) {

						context.report({
							node: openBracket,
							messageId: 'collapse',
							fix(fixer) {

								const start = openBracket.range[1];
								const end = firstTokenOfProperty.range[0];
								const between = sourceCode.text.slice(
									start,
									end
								);

								// No fixer when comments inside
								if ((/\S/).test(between) && !(/^\s*$/).test(between)) {

									return null;

								}

								// Preserve any spaces that are on the same line as the first token.
								const lastNewline = between.lastIndexOf('\n');
								const preserve = lastNewline >= 0
									? between.slice(lastNewline + 1)
									: between;

								return fixer.replaceTextRange(
									[
										start,
										end
									],
									preserve
								);

							}
						});

					}

					if (closeBracketOnOwnLine) {

						context.report({
							node: closeBracket,
							messageId: 'collapse',
							fix(fixer) {

								const start = lastTokenOfProperty.range[1];
								const end = closeBracket.range[0];
								const between = sourceCode.text.slice(
									start,
									end
								);

								// If there are non-whitespace chars (comments) inside, skip fixing.
								if ((/\S/).test(between) && !(/^\s*$/).test(between)) {

									return null;

								}

								// Preserve any spaces that are on the same line as the last token.
								const firstNewline = between.indexOf('\n');
								const preserve = firstNewline >= 0
									? between.slice(
										0,
										firstNewline
									)
									: between;

								return fixer.replaceTextRange(
									[
										start,
										end
									],
									preserve
								);

							}
						});

					}

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
					messageId: 'expandAfter',
					fix: (fixer)=> fixer.insertTextAfter(
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
					messageId: 'expandBefore',
					fix: (fixer)=> fixer.insertTextBefore(
						closeBracket,
						'\n'
					)
				});

			}

		}

		return {
			MemberExpression(node) {

				if (!node.computed) {

					return;

				}

				checkMemberExpression(node);

			}
		};

	}
});
