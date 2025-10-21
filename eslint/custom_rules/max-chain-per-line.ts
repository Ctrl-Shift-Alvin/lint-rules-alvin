import {
	AST_NODE_TYPES,
	ESLintUtils,
	TSESTree
} from '@typescript-eslint/utils';

/*
 * We use `any` for node parameters to keep the rule implementation
 * lightweight for the TypeScript language server. Pragmatic runtime
 *		 }
 */

export const maxChainPerLineRule = ESLintUtils.RuleCreator.withoutDocs({
	meta: {
		type: 'layout',
		docs: { description: 'Require a newline after each item in a chain if it\'s too long.' },
		fixable: 'whitespace',
		schema: [
			{
				type: 'object',
				properties: {
					maxChain: {
						type: 'integer',
						minimum: 1
					},
					enforceSingleLine: { type: 'boolean' }

				},
				additionalProperties: false
			}
		],
		messages: {
			expand: 'This call chain is too long and should be broken into multiple lines.',
			collapse: 'Unexpected newline in chain.'
		}
	},
	defaultOptions: [
		{
			maxChain: 2,
			enforceSingleLine: false
		}
	],
	create(context, options) {

		const {
			maxChain,
			enforceSingleLine
		} = options[0];
		const sourceCode = context.sourceCode;
		const processedChains: Set<TSESTree.Node> = new Set();

		/**
		 * Traverses the AST from a given node upwards to find the outermost
		 * node of a continuous chain.
		 */
		function getOutermostChainNode(node: TSESTree.Node) {

			let outermostNode = node;
			while (outermostNode.parent) {

				const parentNode = outermostNode.parent;
				if (
					(parentNode.type === AST_NODE_TYPES.MemberExpression && parentNode.object === outermostNode)
					|| (parentNode.type === AST_NODE_TYPES.CallExpression && parentNode.callee === outermostNode)
					|| (parentNode.type === AST_NODE_TYPES.TSNonNullExpression && parentNode.expression === outermostNode)
				) {

					outermostNode = parentNode;

				} else {

					break;

				}

			}
			return outermostNode;

		}

		/**
		 * Deconstructs a chain into an array of its 'links'.
		 * A link is defined as a non-computed property access (`.prop`).
		 * Any subsequent CallExpressions or computed accesses (`[key]`) are
		 * considered part of that same link.
		 */
		function getChainLinks(node: TSESTree.Node): TSESTree.MemberExpressionNonComputedName[] {

			const links: TSESTree.MemberExpressionNonComputedName[] = [];
			let currentNode: TSESTree.Node | undefined = node;

			while (
				currentNode.type === AST_NODE_TYPES.MemberExpression
				|| currentNode.type === AST_NODE_TYPES.CallExpression
				|| currentNode.type === AST_NODE_TYPES.TSNonNullExpression
			) {

				if (currentNode.type === AST_NODE_TYPES.CallExpression) {

					currentNode = currentNode.callee;
					continue;

				}

				if (currentNode.type === AST_NODE_TYPES.TSNonNullExpression) {

					currentNode = currentNode.expression;
					continue;

				}

				// MemberExpression
				if (currentNode.computed) {

					currentNode = currentNode.object;

				} else {

					links.unshift(currentNode);
					currentNode = currentNode.object;

				}

			}

			return links;

		}

		function checkChain(node: TSESTree.Node): void {

			const outermostNode = getOutermostChainNode(node);

			if (processedChains.has(outermostNode)) {

				return;

			}
			processedChains.add(outermostNode);

			const links = getChainLinks(outermostNode);
			const chainCount = links.length;

			/*
			 * If enforceSingleLine is enabled, allow single-link chains to be
			 * considered for collapsing, so they can be collapsed if needed.
			 * Otherwise require at least 2 links.
			 */
			const minChain = enforceSingleLine
				? 1
				: 2;
			if (chainCount < minChain) {

				return;

			}

			const startLineIndex = outermostNode
				.loc
				.start
				.line - 1;
			const startLine = sourceCode.lines[startLineIndex] ?? '';
			const match = (/^\s*/).exec(startLine);
			const baseIndent = match
				? match[0]
				: '';

			// --- Mode 1: Enforce newlines if chain is too long ---
			if (chainCount > maxChain) {

				for (const linkNode of links) {

					// Find the dot separator for this link.
					const separatorToken = sourceCode.getTokenBefore(
						linkNode.property,
						{ filter: (token) => token.value === '.' || token.value === '?.' }
					);

					// If we couldn't find the separator token, bail out for safety.
					if (!separatorToken) {

						continue;

					}

					// We only care about the dot's position relative to the start of its own link.
					const previousNode = linkNode.object;
					if (
						separatorToken
							.loc
							.start
							.line === previousNode
							.loc
							.end
							.line
					) {

						context.report({
							node: linkNode.property,
							loc: separatorToken.loc,
							messageId: 'expand',
							fix: (fixer) => fixer.insertTextBefore(
								separatorToken,
								`\n${baseIndent}`
							)
						});

					}

				}

			} else if (enforceSingleLine) {

				// --- Mode 2: Enforce single line if chain is short enough and option is enabled ---

				for (const linkNode of links) {

					const previousNode = linkNode.object;
					const separatorToken2 = sourceCode.getTokenBefore(
						linkNode.property,
						{ filter: (token) => token.value === '.' || token.value === '?.' }
					);
					if (!separatorToken2)
						continue;
					if (
						separatorToken2
							.loc
							.start
							.line > previousNode
							.loc
							.end
							.line
					) {

						const from = previousNode.range[1];
						const to = separatorToken2.range[0];

						if (typeof from === 'number' && typeof to === 'number') {

							context.report({
								node: linkNode.property,
								loc: separatorToken2.loc,
								messageId: 'collapse',
								fix: (fixer) => {

									const between = sourceCode.text.slice(
										from,
										to
									);

									// If there are non-whitespace chars (comments) inside, skip fixing.
									if ((/\S/).test(between)) {

										return null;

									}

									const segments = between.split(
										/\r\n|\r|\n/
									);

									let collapsed = '';

									if (segments.length === 1) {

										collapsed = segments[0] ?? '';

									} else {

										const firstSegment = segments[0] ?? '';
										const lastSegment = segments[segments.length - 1] ?? '';

										collapsed = `${firstSegment}${lastSegment}`;

									}

									return fixer.replaceTextRange(
										[
											from,
											to
										],
										collapsed
									);

								}
							});

						} else {

							context.report({
								node: linkNode.property,
								loc: separatorToken2.loc,
								messageId: 'collapse'
							});

						}

					}

				}

			}

		}

		return {
			MemberExpression(node) {

				// Only start the check from non-computed MemberExpressions to avoid redundant checks.
				if (!node.computed) {

					checkChain(node);

				}

			}
		};

	}
});
