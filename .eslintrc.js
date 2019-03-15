module.exports = {
  root: true,
  env: { node: true },
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 6,
    sourceType: 'module'
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'html'],
  rules: {
    'no-debugger': 'off',
    eqeqeq: 'error',
    'no-console': 'off',
    'comma-dangle': [2, 'always-multiline'],
    'no-new': 0,
    'prefer-promise-reject-errors': 0,
    semi: [2, 'never'],
    'no-dupe-keys': 'error',
    indent: ['error', 2],
  },
}
