import { TSESLint } from '@typescript-eslint/utils';
import eslintPluginPerfectionist from 'eslint-plugin-perfectionist';

export const perfectionist: TSESLint.FlatConfig.Config = {
	name: 'eslint-plugin-perfectionist',
	plugins: { eslintPluginPerfectionist },
	...eslintPluginPerfectionist.configs['recommended-natural']
};
