module.exports = {
	env: {
		browser: true,
		es2020: true,
	},
	extends: [
		'plugin:react/recommended',
		// 'airbnb',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 11,
		sourceType: 'module',
	},
	plugins: [
		'react',
		'react-hooks',
	],
	rules: {
		'indent': ['error', 'tab'],
		'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
		'react-hooks/exhaustive-deps': 'warn', // 检查 effect 的依赖
	},
};
