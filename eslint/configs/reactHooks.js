import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

/**
 * The ESLint `react-hooks` config. Extends `configs.flat.recommended` only for `jsx` and `tsx` files.
 *
 * @type {import('eslint').Linter.Config}
 */
export const reactHooks = {
	name: 'eslint-plugin-react-hooks',
	files: [ '**/*.{jsx,tsx}' ],
	...eslintPluginReactHooks.configs.flat.recommended
};
