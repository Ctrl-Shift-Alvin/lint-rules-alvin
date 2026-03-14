import { TSESLint } from '@typescript-eslint/utils';
import eslintPluginPerfectionist from 'eslint-plugin-perfectionist';

export const perfectionist: TSESLint.FlatConfig.Config = {
	name: 'eslint-plugin-perfectionist',
	plugins: { eslintPluginPerfectionist },
	...eslintPluginPerfectionist.configs['recommended-natural'],
	rules: {

		'perfectionist/sort-imports': [
			'error',
			{
				type: 'natural',
				order: 'asc',
				fallbackSort: { type: 'unsorted' },
				ignoreCase: true,
				specialCharacters: 'keep',
				locales: 'en-US',
				sortBy: 'path',
				sortSideEffects: true,
				partitionByComment: false,
				partitionByNewLine: true,
				newlinesBetween: 'ignore',
				newlinesInside: 'ignore'

			}
		]

	}
};
