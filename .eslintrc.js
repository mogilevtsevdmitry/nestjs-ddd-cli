module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
      project: 'tsconfig.json',
      tsconfigRootDir: __dirname,
      sourceType: 'module',
      ecmaVersion: 'latest',
  },
  plugins: ['@typescript-eslint', '@typescript-eslint/eslint-plugin'],
  extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'plugin:prettier/recommended',
  ],
  root: true,
  env: {
      node: true,
      jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': [
        'error',
        {
          'endOfLine': 'auto',
        }
      ]
  },
};
