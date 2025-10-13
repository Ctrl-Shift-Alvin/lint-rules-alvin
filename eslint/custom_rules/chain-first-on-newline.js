/**
 * @type {import('eslint').Rule.RuleModule}
 */
export const chainFirstOnNewlineRule = {
	meta: {
		type: 'layout',
		docs: {
			description: 'Enforce or forbid a newline before the first element in a chained expression.',
			category: 'Stylistic Issues',
			recommended: false
		},
		fixable: 'whitespace',
		schema: [
			{
				enum: [
					'require',
					'forbid'
				]
			}
		],
		messages: {
			require: 'Expected a newline before the first element of the chain.',
			forbid: 'Unexpected newline before the first element of the chain.'
		}
	},

	create(context) {

		const sourceCode = context.sourceCode;
		const option = context.options[0] || 'require';

		function isChainable(node) {

			if (!node)
				return false;
			return node.type === 'MemberExpression' || node.type === 'CallExpression';

		}

		function check(node) { // node is the end of the chain

			let firstMemberExpr = null;
			let current = node;

			// Traverse down to find the root and the first member expression
			while (isChainable(current)) {

				if (current.type === 'MemberExpression') {

					firstMemberExpr = current;
					current = current.object;

				} else { // CallExpression

					current = current.callee;

				}

			}
			const root = current;

			if (!firstMemberExpr) {

				return;

			}

			const endOfChainNode = node.type === 'CallExpression'
				? node.callee
				: node;

			// Ignore single-line chains.
			if (root.loc.start.line === endOfChainNode.loc.end.line) {

				return;

			}

			const object = firstMemberExpr.object;
			const property = firstMemberExpr.property;

			const dotToken = sourceCode.getTokenBefore(property);

			const objectEndLine = object.loc.end.line;
			const propertyStartLine = dotToken.loc.start.line;

			const isSameLine = objectEndLine === propertyStartLine;

			if (option === 'require') {

				if (isSameLine) {

					context
						.report({
							node: property,
							messageId: 'require',
							loc: dotToken.loc,
							fix(fixer) {

								return fixer
									.insertTextBefore(
										dotToken,
										'\n'
									);

							}
						});

				}

			} else { // 'forbid'

				if (!isSameLine) {

					context
						.report({
							node: property,
							messageId: 'forbid',
							loc: dotToken.loc,
							fix(fixer) {

								const rangeToRemove = [
									object.range[1],
									dotToken.range[0]
								];
								return fixer.removeRange(rangeToRemove);

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
				if (node.parent.type === 'CallExpression' && node
					.parent
					.arguments
					.includes(node))
					return;
				check(node);

			},
			'CallExpression:exit'(node) {

				if (node.parent.type === 'MemberExpression' && node.parent.object === node)
					return;
				if (node.parent.type === 'CallExpression' && node.parent.callee === node)
					return;
				if (node.parent.type === 'CallExpression'
					&& node
						.parent
						.arguments
						.includes(node))
					return;
				if (isChainable(node.callee)) {

					check(node);

				}

			}
		};

	}
};
