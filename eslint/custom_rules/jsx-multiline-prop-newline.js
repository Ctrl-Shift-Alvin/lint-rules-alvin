/**
 * @type {import('eslint').Rule.RuleModule}
 */
export const jsxMultilinePropNewlineRule = {
	meta: {
		type: 'layout',
		docs: {
			description: 'Enforces newline consistency for JSX properties.',
			category: 'Stylistic Issues',
			recommended: false
		},
		fixable: 'code',
		schema: [
			{
				type: 'object',
				properties: {
					enforceSingleLine: {
						type: 'boolean',
						default: false
					},
					allowSingleExpression: {
						type: 'boolean',
						default: true
					}
				},
				additionalProperties: false
			}
		],
		messages: {
			collapse: 'This expression should not be surrounded by newlines.',
			expand: 'This multiline expression should be surrounded by newlines.'
		}
	},
	create(context) {

		const {
			allowSingleExpression = true,
			enforceSingleLine = false
		} = context.options[0] || {};
		const sourceCode = context.sourceCode;

		return {
			JSXExpressionContainer(node) {

				if (node.parent.type !== 'JSXAttribute' || node.expression.type === 'JSXEmptyExpression') {

					return;

				}

				const openingBrace = sourceCode.getFirstToken(node);
				const closingBrace = sourceCode.getLastToken(node);
				const expression = node.expression;

				const expressionIsMultiline = expression
					.loc
					.start
					.line !== expression
					.loc
					.end
					.line;

				const hasNewlineAfter = openingBrace
					.loc
					.end
					.line !== expression
					.loc
					.start
					.line;
				const hasNewlineBefore = expression
					.loc
					.end
					.line !== closingBrace
					.loc
					.start
					.line;

				if (expressionIsMultiline) {

					const isSingleObjectOrArray = expression.type === 'ObjectExpression' || expression.type === 'ArrayExpression';

					if (allowSingleExpression && isSingleObjectOrArray) {

						// Collapse newlines for single multiline Object/Array
						if (hasNewlineAfter || hasNewlineBefore) {

							context.report({
								node,
								messageId: 'collapse',
								fix(fixer) {

									const fixes = [];
									if (hasNewlineAfter) {

										fixes.push(
											fixer.removeRange([
												openingBrace.range[1],
												expression.range[0]
											])
										);

									}
									if (hasNewlineBefore) {

										fixes.push(
											fixer.removeRange([
												expression.range[1],
												closingBrace.range[0]
											])
										);

									}
									return fixes;

								}
							});

						}

					} else {

						// Enforce newlines for other multiline expressions
						if (!hasNewlineAfter || !hasNewlineBefore) {

							context.report({
								node,
								messageId: 'expand',
								fix(fixer) {

									const fixes = [];
									if (!hasNewlineAfter) {

										fixes.push(
											fixer.insertTextAfter(
												openingBrace,
												'\n'
											)
										);

									}
									if (!hasNewlineBefore) {

										fixes.push(
											fixer.insertTextBefore(
												closingBrace,
												'\n'
											)
										);

									}
									return fixes;

								}
							});

						}

					}

				} else { // Single-line expression

					if (enforceSingleLine) {

						// Collapse newlines
						if (hasNewlineAfter || hasNewlineBefore) {

							context.report({
								node,
								messageId: 'collapse',
								fix(fixer) {

									const fixes = [];
									if (hasNewlineAfter) {

										fixes.push(
											fixer.removeRange([
												openingBrace.range[1],
												expression.range[0]
											])
										);

									}
									if (hasNewlineBefore) {

										fixes.push(
											fixer.removeRange([
												expression.range[1],
												closingBrace.range[0]
											])
										);

									}
									return fixes;

								}
							});

						}

					}

				}

			}
		};

	}
};
