/**
 * @type {import('eslint').Rule.RuleModule}
 */
export const multilineParenNewlineRule = {
	meta: {
		type: 'layout',
		docs: {
			description: 'Require newlines inside parentheses of call expressions that are multiline',
			category: 'Stylistic Issues',
			recommended: false
		},
		fixable: 'whitespace',
		schema: [
			{
				type: 'object',
				properties: {
					singleArgument: {
						type: 'boolean',
						default: false
					}
				},
				additionalProperties: false
			}
		],
		messages: {
			expectedNewlineAfterParen: 'Expected a newline after \'(\'.',
			expectedNewlineBeforeParen: 'Expected a newline before \')\'.'
		}
	},

	create(context) {

		const sourceCode = context.sourceCode;
		const options = context.options[0] || {};
		const allowSingleArgumentOnSameLine = options.singleArgument === true;

		/**
		 * @param {import('estree').CallExpression} node
		 */
		function check(node) {

			// Get the opening parenthesis token.
			const openParen = sourceCode.getTokenAfter(node.callee);

			// Get the closing parenthesis token.
			const closeParen = sourceCode.getLastToken(node);

			// If we can't find the parentheses, or they aren't parentheses, exit.
			if (!openParen || openParen.value !== '(' || !closeParen || closeParen.value !== ')') {

				return;

			}

			// If the parentheses are on the same line, this rule doesn't apply.
			if (openParen.loc.start.line === closeParen.loc.end.line) {

				return;

			}

			// Handle the singleArgument exception
			if (
				allowSingleArgumentOnSameLine
				&& node.arguments.length === 1
			) {

				const arg = node.arguments[0];
				const isObjectOrArray = arg.type === 'ObjectExpression' || arg.type === 'ArrayExpression';

				if (isObjectOrArray) {

					// For this exception, we *disallow* newlines between parens and the single argument.
					const firstTokenOfArg = sourceCode.getFirstToken(arg);
					if (openParen.loc.end.line !== firstTokenOfArg.loc.start.line) {

						context.report({
							node: openParen,
							message: 'Unexpected newline after \'(\' for single object/array argument.',
							fix: (fixer) => fixer.removeRange([
								openParen.range[1],
								firstTokenOfArg.range[0]
							])
						});

					}

					const lastTokenOfArg = sourceCode.getLastToken(arg);
					if (lastTokenOfArg.loc.end.line !== closeParen.loc.start.line) {

						context.report({
							node: closeParen,
							message: 'Unexpected newline before \')\' for single object/array argument.',
							fix: (fixer) => fixer.removeRange([
								lastTokenOfArg.range[1],
								closeParen.range[0]
							])
						});

					}

					return; // End processing for this node

				}

			}

			// Check for a newline after the opening parenthesis.
			const firstArg = node.arguments[0];
			if (firstArg) {

				const firstTokenOfFirstArg = sourceCode.getFirstToken(firstArg);
				if (openParen.loc.end.line === firstTokenOfFirstArg.loc.start.line) {

					context.report({
						node: openParen,
						messageId: 'expectedNewlineAfterParen',
						fix: (fixer) => fixer.insertTextAfter(
							openParen,
							'\n'
						)
					});

				}

			}

			// Check for a newline before the closing parenthesis.
			const lastArg = node.arguments[node.arguments.length - 1];
			if (lastArg) {

				const lastTokenOfLastArg = sourceCode.getLastToken(lastArg);
				if (lastTokenOfLastArg.loc.end.line === closeParen.loc.start.line) {

					context.report({
						node: closeParen,
						messageId: 'expectedNewlineBeforeParen',
						fix: (fixer) => fixer.insertTextBefore(
							closeParen,
							'\n'
						)
					});

				}

			}

		}

		return { CallExpression: check };

	}
};
