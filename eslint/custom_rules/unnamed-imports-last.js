/**
 * @type {import('eslint').Rule.RuleModule}
 */
export const unnamedImportsLastRule = {
	meta: {
		type: 'layout',
		docs: {
			description: 'Enforce that unnamed imports (side-effect imports) are last',
			category: 'Stylistic Issues',
			recommended: false
		},
		fixable: 'code',
		schema: [],
		messages: { error: 'Unnamed (side-effect) imports should be at the bottom of the import block.' }
	},

	create(context) {

		return {
			'Program:exit'(program) {

				const sourceCode = context.sourceCode;
				const allImports = program
					.body
					.filter((node) => node.type === 'ImportDeclaration');

				if (allImports.length < 2) {

					return;

				}

				const regularImports = allImports.filter((node) => node.specifiers.length > 0);
				const sideEffectImports = allImports.filter((node) => node.specifiers.length === 0);

				if (regularImports.length === 0 || sideEffectImports.length === 0) {

					return;

				}

				const lastRegularImport = regularImports[regularImports.length - 1];

				const misplacedImports = sideEffectImports.filter((node) => node.range[0] < lastRegularImport.range[0]);

				if (misplacedImports.length === 0) {

					return;

				}

				// Report on the first misplaced import
				const firstMisplaced = misplacedImports[0];

				context.report({
					node: firstMisplaced,
					messageId: 'error',
					fix(fixer) {

						const sortedImports = [
							...regularImports,
							...sideEffectImports
						];

						const importTexts = sortedImports.map((node) => sourceCode.getText(node));

						const range = [
							allImports[0].range[0],
							allImports[allImports.length - 1].range[1]
						];

						return fixer.replaceTextRange(
							range,
							importTexts.join('\n')
						);

					}
				});

			}
		};

	}
};
