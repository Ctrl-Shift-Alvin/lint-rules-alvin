import { TSESLint } from '@typescript-eslint/utils';
import eslintPluginJsonc from 'eslint-plugin-jsonc';

/**
 * The ESLint JSON config. Extends `flat/recommended-with-json`.
 */
export const json: TSESLint.FlatConfig.ConfigArray = [ ...eslintPluginJsonc.configs['flat/recommended-with-json'] ];
