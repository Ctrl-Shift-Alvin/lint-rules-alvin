/**
 * @type {import('eslint').Rule.RuleModule}
 */
export const maxChainPerLineRule = {
	meta: {
		type: 'layout',
		docs: {

			description: 'Require a newline after each item in a chain if it\'s too long and contains a call.',
			category: 'Stylistic Issues'
		},
		fixable: 'whitespace',
		schema: [
			{
				type: 'object',
				properties: {
					maxChain: {
						type: 'integer',
						minimum: 1
					}
				},
				additionalProperties: false
			}
		],
		messages: { expectedNewline: 'This call chain is too long and should be broken into multiple lines.' }
	},
	create(context) {

		const options = context.options[0] || {};
		const maxChain = options.maxChain || 2;
		const sourceCode = context.sourceCode;

		function isChainable(node) {

			if (!node)
				return false;
			return node.type === 'MemberExpression' || node.type === 'CallExpression';

		}

		function check(node) {

			const members = [];
			let callCount = 0;
			let current = node;

			while (isChainable(current)) {

				if (current.type === 'CallExpression') {

					callCount++;
					current = current.callee;

				} else { // MemberExpression

					members.unshift(current);
					current = current.object;

				}

			}
			const root = current;
			const totalChainLength = members.length + 1;

			let iter = node;
			while(isChainable(iter)) {

				if (iter.type === 'CallExpression') {

					callCount++;

				}
				iter = iter.type === 'CallExpression'
					? iter.callee
					: iter.object;

			}

			const isMultiline = root.loc.start.line !== node.loc.end.line;

			if (callCount > 0) {

				if (!isMultiline && totalChainLength > maxChain) {

					context.report({
						node: node,
						messageId: 'expectedNewline',
						fix(fixer) {

							const fixes = [];
							members.forEach(
								(memberNode) => {

									const propertyNode = memberNode.property;
									const dotToken = sourceCode.getTokenBefore(propertyNode);
									const rootLine = sourceCode
										.getLines()
										[root.loc.start.line - 1];
									const indent = (rootLine
										.match(/^\s*/)
										[0] || '') + '  ';
									fixes.push(
										fixer.insertTextBefore(
											dotToken,
											'\n' + indent
										)
									);

								}
							);
							return fixes;

						}
					});

				}

			}

		}

		return {
			'MemberExpression:exit'(node) {

				if (node.parent.type === 'MemberExpression' && node.parent.object === node)
					return;
				if (node.parent.type === 'CallExpression' && node.parent.callee === node)
					return;
				check(node);

			},
			'CallExpression:exit'(node) {

				if (node.parent.type === 'MemberExpression' && node.parent.object === node)
					return;
				if (node.parent.type === 'CallExpression' && node.parent.callee === node)
					return;

				if (isChainable(node.callee)) {

					check(node);

				}

			}
		};

	}
};
