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
				properties: { singleArgument: { type: 'boolean' } },
				additionalProperties: false
			}
		],
		messages: {
			expandAfter: 'Expected a newline after \'(\'.',
			expandBefore: 'Expected a newline before \')\'.',
			collapseAfterSingleArgument: 'Unexpected newline after \'(\' for single object/array argument.',
			collapseBeforeSingleArgument: 'Unexpected newline before \')\' for single object/array argument.'
		}
	},
	defaultOptions: [ { singleArgument: false } ],
	create(context, options) {

		const sourceCode = context.sourceCode;
		const { singleArgument } = options[0];

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

			// Check for a newline after the opening parenthesis.
			const firstArg = node.arguments[0];

			/* eslint-disable-next-line
			@typescript-eslint/no-unnecessary-condition,
			@typescript-eslint/strict-boolean-expressions */
			if (firstArg) {

				const firstTokenOfFirstArg = sourceCode.getFirstToken(firstArg);
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
			const lastArg = node.arguments[node.arguments.length - 1];

			/* eslint-disable-next-line
			@typescript-eslint/no-unnecessary-condition,
			@typescript-eslint/strict-boolean-expressions */
			if (lastArg) {

				const lastTokenOfLastArg = sourceCode.getLastToken(lastArg);
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

			const lastTokenOfNode = sourceCode.getLastToken(node);
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
