/**
 * @type {import('eslint').Rule.RuleModule}
 */
export const maxChainPerLineRule = {
	meta: {
		type: 'layout',
		docs: {
			description: 'Require a newline after each item in a chain if it\'s too long.',
			category: 'Stylistic Issues'
		},
		fixable: 'whitespace',
		schema: [
			{
				type: 'object',
				properties: {
					maxChain: {
						type: 'integer',
						minimum: 1,
						default: 2
					},
					enforceSingleLine: {
						type: 'boolean',
						default: false
					},
					checkSingleLink: {
						type: 'boolean',
						default: false
					}
				},
				additionalProperties: false
			}
		],
		messages: {
			expectedNewline: 'This call chain is too long and should be broken into multiple lines.',
			noNewline: 'Unexpected newline in chain.'
		}
	},
	create(context) {

		const {
			maxChain = 2,
			enforceSingleLine = false,
			checkSingleLink = false
		} = context.options[0] || {};
		const sourceCode = context.sourceCode;
		const processedChains = new Set();

		/**
		 * Traverses the AST from a given node upwards to find the outermost
		 * node of a continuous chain.
		 */
		function getOutermostChainNode(node) {

			let outermostNode = node;
			while (outermostNode.parent) {

				const parent = outermostNode.parent;
				if (
					(parent.type === 'MemberExpression' && parent.object === outermostNode)
					|| (parent.type === 'CallExpression' && parent.callee === outermostNode)
				) {

					outermostNode = parent;

				} else {

					break;

				}

			}
			return outermostNode;

		}

		/**
		 * Deconstructs a chain into an array of its "links".
		 * A "link" is defined as a non-computed property access (`.prop`).
		 * Any subsequent CallExpressions or computed accesses (`[key]`) are
		 * considered part of that same link.
		 * @param {import('estree').Node} node The outermost node of the chain.
		 * @returns {import('estree').MemberExpression[]} An array of MemberExpression nodes that start each link.
		 */
		function getChainLinks(node) {

			const links = [];
			let currentNode = node;

			while (currentNode.type === 'MemberExpression' || currentNode.type === 'CallExpression') {

				if (currentNode.type === 'CallExpression') {

					// A call is part of the preceding link, so we just traverse through it.
					currentNode = currentNode.callee;
					continue;

				}

				// We have a MemberExpression.
				if (currentNode.computed) {

					// A computed property (`[key]`) is part of the preceding link.
					currentNode = currentNode.object;

				} else {

					// A non-computed property (`.prop`) is a new link.
					links.unshift(currentNode);
					currentNode = currentNode.object;

				}

			}
			return links;

		}

		function checkChain(node) {

			const outermostNode = getOutermostChainNode(node);

			if (processedChains.has(outermostNode)) {

				return;

			}
			processedChains.add(outermostNode);

			const links = getChainLinks(outermostNode);
			const chainCount = links.length;

			const minChain = checkSingleLink
				? 1
				: 2;
			if (chainCount < minChain) {

				return;

			}

			const baseIndent = sourceCode.lines[
				outermostNode
					.loc
					.start
					.line - 1
			].match(/^\s*/)[0];

			// --- Mode 1: Enforce newlines if chain is too long ---
			if (chainCount > maxChain) {

				for (const linkNode of links) {

					// Find the dot separator for this link.
					const separatorToken = sourceCode.getTokenBefore(
						linkNode.property,
						{ filter: (token) => token.value === '.' || token.value === '?.' }
					);

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
							messageId: 'expectedNewline',
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
					const separatorToken = sourceCode.getTokenBefore(
						linkNode.property,
						{ filter: (token) => token.value === '.' || token.value === '?.' }
					);

					if (
						separatorToken
							.loc
							.start
							.line > previousNode
							.loc
							.end
							.line
					) {

						context.report({
							node: linkNode.property,
							loc: separatorToken.loc,
							messageId: 'noNewline',
							fix: (fixer) => fixer.replaceTextRange(
								[
									previousNode.range[1],
									separatorToken.range[0]
								],
								''
							)
						});

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
};
