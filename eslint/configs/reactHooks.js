import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

export const reactHooks = {
	name: 'eslint-plugin-react-hooks',
	files: [ '**/*.{jsx,tsx}' ],
	...eslintPluginReactHooks.configs.flat.recommended
};
