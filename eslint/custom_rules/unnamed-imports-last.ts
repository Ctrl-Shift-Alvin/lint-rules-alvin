
import {
	AST_NODE_TYPES,
	ESLintUtils
} from '@typescript-eslint/utils';

export const unnamedImportsLastRule = ESLintUtils.RuleCreator.withoutDocs({
	meta: {
		type: 'layout',
		docs: { description: 'Enforce that unnamed imports (side-effect imports) are last' },
		fixable: 'code',
		schema: [],
		messages: { error: 'Unnamed (side-effect) imports should be at the bottom of the import block.' }
	},
	defaultOptions: [],
	create(context) {

		return {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'Program:exit'(program) {

				const sourceCode = context.sourceCode;
				const allImports = program.body.filter((node) => node.type === AST_NODE_TYPES.ImportDeclaration);

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

						// Move the first misplaced side-effect import to after the last regular import
						const moveNode = firstMisplaced;
						const moveStart = moveNode.range[0];
						let moveEnd = moveNode.range[1];
						const text = sourceCode.text;
						const endsWithSemicolon = text[moveEnd - 1] === ';';

						if (!endsWithSemicolon) {

							const ch = text[moveEnd] ?? '';
							if (ch === '\n') {

								moveEnd += 1;

							} else if (ch === '\r') {

								moveEnd += text[moveEnd + 1] === '\n'
									? 2
									: 1;

							}

						}

						const chunk = text.slice(
							moveStart,
							moveEnd
						);

						return [
							fixer.removeRange([
								moveStart,
								moveEnd
							]),
							fixer.insertTextAfter(
								lastRegularImport,
								chunk
							)
						];

					}
				});

			}
		};

	}
});
