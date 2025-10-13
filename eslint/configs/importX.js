import { importX as eslintPluginImportX } from 'eslint-plugin-import-x';

/**
 * The `ESLint` import config.
 */
export const importX = {
	name: 'eslint-plugin-import-x',
	plugins: { 'import-x': eslintPluginImportX },
	rules: {
		'import-x/export': 'error',
		'import-x/no-deprecated': 'error',
		'import-x/no-empty-named-blocks': 'error',
		'import-x/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: true,
				optionalDependencies: true,
				peerDependencies: true,
				bundledDependencies: true
			}
		],
		'import-x/no-mutable-exports': 'error',
		'import-x/no-named-as-default': 'off',
		'import-x/no-named-as-default-member': 'off',
		'import-x/no-rename-default': 'off',

		'import-x/no-amd': 'error',
		'import-x/no-commonjs': 'error',
		'import-x/no-import-module-exports': 'error',
		'import-x/no-nodejs-modules': 'off',
		'import-x/unambiguous': 'error',

		'import-x/default': 'error',
		'import-x/named': 'error',
		'import-x/namespace': 'error',
		'import-x/no-absolute-path': 'error',
		'import-x/no-cycle': 'off',
		'import-x/no-dynamic-require': 'error',
		'import-x/no-internal-modules': 'off',
		'import-x/no-relative-packages': 'error',
		'import-x/no-relative-parent-imports': 'off',
		'import-x/no-restricted-paths': 'off', // Allow the user to override
		'import-x/no-self-import': 'error',
		'import-x/no-unresolved': 'error',
		'import-x/no-useless-path-segments': 'error',
		'import-x/no-webpack-loader-syntax': 'error',

		'import-x/consistent-type-specifier-style': [
			'error',
			'prefer-inline'
		],
		'import-x/dynamic-import-chunkname': 'off',
		'import-x/export-last': 'off',
		'import-x/extensions': 'off',
		'import-x/first': 'error',
		'import-x/group-exports': 'off',
		'import-x/imports-first': 'off', // Replaced by 'import/first'
		'import-x/max-dependencies': 'off',
		'import-x/newline-after-import': [
			'error',
			{ considerComments: false }
		],
		'import-x/no-anonymous-default-export': 'off', // See next rule
		'import-x/no-default-export': 'error',
		'import-x/no-duplicates': 'error',
		'import-x/no-named-default': 'off', // In favor of 'import/no-default-export'
		'import-x/no-named-export': 'off',
		'import-x/no-namespace': 'off',
		'import-x/no-unassigned-import': [
			'error',
			{ allow: [ '**/*.css' ] }
		],
		'import-x/order': 'error',
		'import-x/prefer-default-export': 'off',
		'import-x/prefer-namespace-import': 'off'
	}
};
