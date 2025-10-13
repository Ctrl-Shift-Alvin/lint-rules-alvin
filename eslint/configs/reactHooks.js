import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

export const reactHooks = {
	name: 'eslint-plugin-react-hooks',
	files: [ '**/*.{jsx,tsx}' ],
	plugins: { 'react-hooks': eslintPluginReactHooks },
	extends: [ 'react-hooks/recommended' ]
};
