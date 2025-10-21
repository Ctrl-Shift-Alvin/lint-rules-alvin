import {
	AST_NODE_TYPES,
	ESLintUtils,
	TSESTree
} from '@typescript-eslint/utils';

export const jsxMultilinePropNewlineRule = ESLintUtils.RuleCreator.withoutDocs({
	meta: {
		type: 'layout',
		docs: { description: 'Enforces newline consistency for JSX properties.' },
		fixable: 'code',
		schema: [
			{
				type: 'object',
				properties: {
					enforceSingleLine: { type: 'boolean' },
					allowSingleExpression: { type: 'boolean' }
				},
				additionalProperties: false
			}
		],
		messages: {
			collapse: 'This expression should not be surrounded by newlines.',
			expand: 'This multiline expression should be surrounded by newlines.'
		}
	},
	defaultOptions: [
		{
			enforceSingleLine: false,
			allowSingleExpression: true
		}
	],
	create(context, options) {

		const sourceCode = context.sourceCode;
		const {
			enforceSingleLine,
			allowSingleExpression
		} = options[0];

		function isMultiline(node: TSESTree.Node): boolean {

			return node
				.loc
				.start
				.line !== node
				.loc
				.end
				.line;

		}

		function isSingleObjectOrArrayExpression(node: TSESTree.Node): boolean {

			return node.type === AST_NODE_TYPES.ObjectExpression || node.type === AST_NODE_TYPES.ArrayExpression;

		}

		function checkContainer(node: TSESTree.JSXExpressionContainer) {

			// Only enforce for JSX props (attributes), not for children
			/* eslint-disable-next-line
			@typescript-eslint/no-unnecessary-condition,
			@typescript-eslint/strict-boolean-expressions */
			if (!node?.parent || node.parent.type !== AST_NODE_TYPES.JSXAttribute)
				return;

			const expr = node.expression;
			/* eslint-disable-next-line
			@typescript-eslint/no-unnecessary-condition,
			@typescript-eslint/strict-boolean-expressions */
			if (!expr)
				return;

			/*
			 * Find the surrounding braces around the expression
			 * Use tokenBefore/After relative to the inner expression to avoid TS/estree mismatches
			 */

			// Use the expression container's outer tokens to find the real surrounding braces

			const openBrace = sourceCode.getFirstToken(node);

			const closeBrace = sourceCode.getLastToken(node);
			if (!openBrace || !closeBrace)
				return;

			const firstTokenOfExpr = sourceCode.getFirstToken(expr);

			const lastTokenOfExpr = sourceCode.getLastToken(expr);
			if (!firstTokenOfExpr || !lastTokenOfExpr)
				return;

			const exprIsMultiline = isMultiline(expr);
			const exceptionApplies = allowSingleExpression && isSingleObjectOrArrayExpression(expr);

			/*
			 * If configured to prefer compact braces for a single object/array expression,
			 * collapse surrounding whitespace/newlines regardless of multiline/single-line.
			 */
			if (exceptionApplies) {

				if (
					openBrace
						.loc
						.end
						.line !== firstTokenOfExpr
						.loc
						.start
						.line
				) {

					context.report({
						node: openBrace,
						messageId: 'collapse',
						fix: (fixer) => fixer.removeRange([
							openBrace.range[1],
							firstTokenOfExpr.range[0]
						])
					});

				}
				if (
					lastTokenOfExpr
						.loc
						.end
						.line !== closeBrace
						.loc
						.start
						.line
				) {

					context.report({
						node: closeBrace,
						messageId: 'collapse',
						fix: (fixer) => fixer.removeRange([
							lastTokenOfExpr.range[1],
							closeBrace.range[0]
						])
					});

				}
				return;

			}

			if (exprIsMultiline) {

				// Require newlines after '{' and before '}' for multiline expressions
				if (
					openBrace
						.loc
						.end
						.line === firstTokenOfExpr
						.loc
						.start
						.line
				) {

					context.report({
						node: openBrace,
						messageId: 'expand',
						fix: (fixer) => fixer.insertTextAfter(
							openBrace,
							'\n'
						)
					});

				}
				if (
					lastTokenOfExpr
						.loc
						.end
						.line === closeBrace
						.loc
						.start
						.line
				) {

					context.report({
						node: closeBrace,
						messageId: 'expand',
						fix: (fixer) => fixer.insertTextBefore(
							closeBrace,
							'\n'
						)
					});

				}
				return;

			}

			// Single-line expression: optionally enforce collapse (no surrounding newlines)
			if (enforceSingleLine) {

				if (
					openBrace
						.loc
						.end
						.line !== firstTokenOfExpr
						.loc
						.start
						.line
				) {

					context.report({
						node: openBrace,
						messageId: 'collapse',
						fix: (fixer) => fixer.removeRange([
							openBrace.range[1],
							firstTokenOfExpr.range[0]
						])
					});

				}
				if (
					lastTokenOfExpr
						.loc
						.end
						.line !== closeBrace
						.loc
						.start
						.line
				) {

					context.report({
						node: closeBrace,
						messageId: 'collapse',
						fix: (fixer) => fixer.removeRange([
							lastTokenOfExpr.range[1],
							closeBrace.range[0]
						])
					});

				}

			}

		}

		return { JSXExpressionContainer: checkContainer };

	}
});
