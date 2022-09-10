module.exports = {
  root: true,
  env: {
    node: true,
  }, 

  extends: ['next/core-web-vitals', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    // TS
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    // React
    'react-hooks/exhaustive-deps': 'off',
    // Other
    camelcase: 'warn',
    'no-underscore-dangle': 'warn',
    'linebreak-style': ['error', 'unix'],
    'consistent-return': 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
    'no-console': 'warn',
    'no-debugger': 'warn',
    'import/no-unresolved': 'off',
    'import/no-cycle': 'warn',
    'import/order': 'off',
    'no-template-curly-in-string': 'off',
    'class-methods-use-this': 'off',
    'lines-between-class-members': 'off',
    'no-return-assign': 'off',
    'max-len': 'off',
    'array-callback-return': 'off',
    'no-shadow': 'off',
    semi: 'error',
    'no-extra-semi': 'off',
    quotes: ['error', 'single'],
    'import/no-extraneous-dependencies': 'off',
    'no-param-reassign': 'off',
    // "import/no-cycle": "",
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'import/prefer-default-export': 'off',
    'no-useless-escape': 'off',
    'no-restricted-globals': 'warn',
    'no-extend-native': 'off',
    'import/extensions': 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'unicode-bom': 'off',
    'no-restricted-syntax': 'off',
    'no-prototype-builtins': 'warn',
    'no-useless-concat': 'warn',
    'prefer-destructuring': 'warn',
    'no-mixed-operators': 'warn',
    'no-use-before-define': 'warn',
    'import/no-useless-path-segments': 'error',

  },

};
