import {
	AST_NODE_TYPES,
	ESLintUtils,
	TSESLint,
	TSESTree
} from '@typescript-eslint/utils';

export const multilineParenNewlineRule = ESLintUtils.RuleCreator.withoutDocs({
	meta: {
		type: 'layout',
		docs: { description: 'Require newlines inside parentheses that are multiline' },
		fixable: 'whitespace',
		schema: [
			{
				type: 'object',
				properties: {
					singleArgument: { type: 'boolean' },
					enforceSingleLine: { type: 'boolean' }
				},
				additionalProperties: false
			}
		],
		messages: {
			expandAfter: 'Expected a newline after \'(\'.',
			expandBefore: 'Expected a newline before \')\'.',
			collapseAfter: 'Unexpected newline after \'(\'.',
			collapseBefore: 'Unexpected newline before \')\'.',
			collapseAfterSingleArgument: 'Unexpected newline after \'(\' for single object/array argument.',
			collapseBeforeSingleArgument: 'Unexpected newline before \')\' for single object/array argument.'
		}
	},
	defaultOptions: [
		{
			singleArgument: false,
			enforceSingleLine: false
		}
	],
	create(context, options) {

		const sourceCode = context.sourceCode;
		const {
			singleArgument,
			enforceSingleLine
		} = options[0];

		function collapseWhitespacePreservingEdges(start: number, end: number) {

			const between = sourceCode.text.slice(
				start,
				end
			);

			if (!(/[\r\n]/u).test(between))
				return between;

			if (between.trim() !== '')
				return null;

			const leadingMatch = (/^[^\S\r\n]*/u).exec(between);
			const trailingMatch = (/[^\S\r\n]*$/u).exec(between);
			const leading = leadingMatch?.[0] ?? '';
			const trailing = trailingMatch?.[0] ?? '';

			return `${leading}${trailing}`;

		}

		function checkCall(
			node: TSESTree.CallExpression | TSESTree.NewExpression
		): TSESLint.RuleFunction<TSESTree.Expression> | undefined {

			const callee = node.callee;

			const openParen = sourceCode.getTokenAfter(
				callee,
				{ filter: (t) => t.value === '(' }
			);

			if (!openParen) { // e.g. `new Date`

				return;

			}

			const closeParen = sourceCode.getLastToken(node);

			if (closeParen?.value !== ')') {

				return;

			}

			// If the parentheses are on the same line, this rule doesn't apply.
			if (
				openParen
					.loc
					.start
					.line === closeParen
					.loc
					.end
					.line
			) {

				return;

			}

			// Handle the singleArgument exception
			if (singleArgument && node.arguments.length === 1) {

				const arg = node.arguments[0];
				const isObjectOrArray
					= arg.type === AST_NODE_TYPES.ObjectExpression
						|| arg.type === AST_NODE_TYPES.ArrayExpression;

				if (isObjectOrArray) {

					const firstTokenOfArg = sourceCode.getFirstToken(arg);
					if (!firstTokenOfArg)
						return;
					if (
						openParen
							.loc
							.end
							.line !== firstTokenOfArg
							.loc
							.start
							.line
					) {

						context.report({
							node: openParen,
							messageId: 'collapseAfterSingleArgument',
							fix(fixer) {

								const start = openParen.range[1];
								const end = firstTokenOfArg.range[0];
								const replacement = collapseWhitespacePreservingEdges(
									start,
									end
								);

								if (replacement === null)
									return null;

								return fixer.replaceTextRange(
									[
										start,
										end
									],
									replacement
								);

							}
						});

					}

					const lastTokenOfArg = sourceCode.getLastToken(arg);
					if (!lastTokenOfArg)
						return;
					if (
						lastTokenOfArg
							.loc
							.end
							.line !== closeParen
							.loc
							.start
							.line
					) {

						context.report({
							node: closeParen,
							messageId: 'collapseBeforeSingleArgument',
							fix(fixer) {

								const start = lastTokenOfArg.range[1];
								const end = closeParen.range[0];
								const replacement = collapseWhitespacePreservingEdges(
									start,
									end
								);

								if (replacement === null)
									return null;

								return fixer.replaceTextRange(
									[
										start,
										end
									],
									replacement
								);

							}
						});

					}

					return; // End processing for this node

				}

			}

			// Determine if the content inside the parentheses is single-line
			const firstArg = node.arguments[0];
			const lastArg = node.arguments[node.arguments.length - 1];
			let firstTokenOfFirstArg: TSESTree.Token | null = null;
			let lastTokenOfLastArg: TSESTree.Token | null = null;

			/* eslint-disable-next-line
			@typescript-eslint/no-unnecessary-condition,
			@typescript-eslint/strict-boolean-expressions */
			if (firstArg) {

				firstTokenOfFirstArg = sourceCode.getFirstToken(firstArg);

			}

			/* eslint-disable-next-line
			@typescript-eslint/no-unnecessary-condition,
			@typescript-eslint/strict-boolean-expressions */
			if (lastArg) {

				lastTokenOfLastArg = sourceCode.getLastToken(lastArg);

			}
			const contentIsSingleLine = node.arguments.length === 0
				? true
				: Boolean(
					firstTokenOfFirstArg && lastTokenOfLastArg
					&& firstTokenOfFirstArg
						.loc
						.start
						.line === lastTokenOfLastArg
						.loc
						.end
						.line
				);

			if (enforceSingleLine && contentIsSingleLine) {

				// Collapse newline after '('
				const afterStart = openParen.range[1];
				const afterEnd = node.arguments.length === 0
					? closeParen.range[0]
					: firstTokenOfFirstArg?.range[0] ?? openParen.range[1];
				const openEndLine = openParen
					.loc
					.end
					.line;
				const firstInnerStartLine = firstTokenOfFirstArg
					? firstTokenOfFirstArg
						.loc
						.start
						.line
					: closeParen
						.loc
						.start
						.line;
				const hasNewlineAfter = openEndLine < firstInnerStartLine;
				if (hasNewlineAfter) {

					context.report({
						node: openParen,
						messageId: 'collapseAfter',
						fix(fixer) {

							const replacement = collapseWhitespacePreservingEdges(
								afterStart,
								afterEnd
							);
							if (replacement === null)
								return null;
							return fixer.replaceTextRange(
								[
									afterStart,
									afterEnd
								],
								replacement
							);

						}
					});

				}

				// Collapse newline before ')'
				const beforeStart = node.arguments.length === 0
					? openParen.range[1]
					: lastTokenOfLastArg?.range[1] ?? closeParen.range[0];
				const beforeEnd = closeParen.range[0];
				const refLine = node.arguments.length === 0
					? openParen
						.loc
						.end
						.line
					: lastTokenOfLastArg
						?.loc
						.end
						.line ?? closeParen
						.loc
						.start
						.line;
				const closeStartLine = closeParen
					.loc
					.start
					.line;
				const hasNewlineBefore = refLine < closeStartLine;
				if (hasNewlineBefore) {

					context.report({
						node: closeParen,
						messageId: 'collapseBefore',
						fix(fixer) {

							const replacement = collapseWhitespacePreservingEdges(
								beforeStart,
								beforeEnd
							);
							if (replacement === null)
								return null;
							return fixer.replaceTextRange(
								[
									beforeStart,
									beforeEnd
								],
								replacement
							);

						}
					});

				}

				return;

			}

			// Check for a newline after the opening parenthesis.
			/* eslint-disable-next-line
			@typescript-eslint/no-unnecessary-condition,
			@typescript-eslint/strict-boolean-expressions */
			if (firstArg) {

				if (
					firstTokenOfFirstArg && openParen
						.loc
						.end
						.line === firstTokenOfFirstArg
						.loc
						.start
						.line
				) {

					context.report({
						node: openParen,
						messageId: 'expandAfter',
						fix: (fixer) => fixer.insertTextAfter(
							openParen,
							'\n'
						)
					});

				}

			}

			// Check for a newline before the closing parenthesis.
			/* eslint-disable-next-line
			@typescript-eslint/no-unnecessary-condition,
			@typescript-eslint/strict-boolean-expressions */
			if (lastArg) {

				if (
					lastTokenOfLastArg && lastTokenOfLastArg
						.loc
						.end
						.line === closeParen
						.loc
						.start
						.line
				) {

					context.report({
						node: closeParen,
						messageId: 'expandBefore',
						fix: (fixer) => fixer.insertTextBefore(
							closeParen,
							'\n'
						)
					});

				}

			}

		}

		function checkGeneric(
			node: TSESTree.ChainExpression
				| TSESTree.LogicalExpression
				| TSESTree.BinaryExpression
				| TSESTree.ConditionalExpression
				| TSESTree.MemberExpression
				| TSESTree.UnaryExpression
				| TSESTree.UpdateExpression
				| TSESTree.ArrowFunctionExpression
				| TSESTree.AwaitExpression
				| TSESTree.YieldExpression
		): TSESLint.RuleFunction<TSESTree.Expression> | undefined {

			if (
				(node.parent.type === AST_NODE_TYPES.CallExpression || node.parent.type === AST_NODE_TYPES.NewExpression)
				&& node.parent.callee === node
			) {

				return;

			}

			const openParen = sourceCode.getTokenBefore(node);
			if (openParen?.value !== '(') {

				return;

			}

			// Find matching closing paren
			let parenLevel = 1;
			let closeParen: TSESTree.Token | null = null;
			const tokensAfter = sourceCode.getTokensAfter(openParen);
			for (const token of tokensAfter) {

				if (token.value === '(')
					parenLevel++;
				else if (token.value === ')') {

					parenLevel--;
					if (parenLevel === 0) {

						closeParen = token;
						break;

					}

				}

			}

			if (!closeParen)
				return;

			const maybeLastTokenOfNode = sourceCode.getLastToken(node);
			if (!maybeLastTokenOfNode || sourceCode.getTokenAfter(maybeLastTokenOfNode) !== closeParen) {

				return;

			}

			if (
				openParen
					.loc
					.start
					.line === closeParen
					.loc
					.end
					.line
			) {

				return;

			}

			const firstTokenOfNode = sourceCode.getFirstToken(node);
			const lastTokenOfNode = sourceCode.getLastToken(node);

			const contentIsSingleLine = Boolean(
				firstTokenOfNode && lastTokenOfNode
				&& firstTokenOfNode
					.loc
					.start
					.line === lastTokenOfNode
					.loc
					.end
					.line
			);

			if (enforceSingleLine && contentIsSingleLine && firstTokenOfNode && lastTokenOfNode) {

				// Collapse newline after '('
				if (
					openParen
						.loc
						.end
						.line < firstTokenOfNode
						.loc
						.start
						.line
				) {

					const start = openParen.range[1];
					const end = firstTokenOfNode.range[0];
					context.report({
						node: openParen,
						messageId: 'collapseAfter',
						fix(fixer) {

							const replacement = collapseWhitespacePreservingEdges(
								start,
								end
							);
							if (replacement === null)
								return null;
							return fixer.replaceTextRange(
								[
									start,
									end
								],
								replacement
							);

						}
					});

				}

				// Collapse newline before ')'
				if (
					lastTokenOfNode
						.loc
						.end
						.line < closeParen
						.loc
						.start
						.line
				) {

					const start = lastTokenOfNode.range[1];
					const end = closeParen.range[0];
					context.report({
						node: closeParen,
						messageId: 'collapseBefore',
						fix(fixer) {

							const replacement = collapseWhitespacePreservingEdges(
								start,
								end
							);
							if (replacement === null)
								return null;
							return fixer.replaceTextRange(
								[
									start,
									end
								],
								replacement
							);

						}
					});

				}

				return;

			}

			if (
				firstTokenOfNode && openParen
					.loc
					.end
					.line === firstTokenOfNode
					.loc
					.start
					.line
			) {

				context.report({
					node: openParen,
					messageId: 'expandAfter',
					fix: (fixer) => fixer.insertTextAfter(
						openParen,
						'\n'
					)
				});

			}

			if (
				lastTokenOfNode && lastTokenOfNode
					.loc
					.end
					.line === closeParen
					.loc
					.start
					.line
			) {

				context.report({
					node: closeParen,
					messageId: 'expandBefore',
					fix: (fixer) => fixer.insertTextBefore(
						closeParen,
						'\n'
					)
				});

			}

		}

		return {
			CallExpression: checkCall,
			NewExpression: checkCall,
			ChainExpression: checkGeneric,
			LogicalExpression: checkGeneric,
			BinaryExpression: checkGeneric,
			ConditionalExpression: checkGeneric,
			MemberExpression: checkGeneric,
			UnaryExpression: checkGeneric,
			UpdateExpression: checkGeneric,
			ArrowFunctionExpression: checkGeneric,
			AwaitExpression: checkGeneric,
			YieldExpression: checkGeneric
		};

	}
});
