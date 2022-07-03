module.exports = {
  extends: [
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors.
    'prettier',
    'eslint:recommended',
    'airbnb-base',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  plugins: ['@typescript-eslint', 'prettier', 'no-relative-import-paths'],
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  // Fine tune rules
  rules: {
    'no-void': [
      'error',
      {
        allowAsStatement: true,
      },
    ],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': 'error',
    'operator-linebreak': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-param-reassign': ['error'],
    'prettier/prettier': 'warn',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowDirectConstAssertionInArrowFunctions: true,
        allowExpressions: true,
      },
    ],
    '@typescript-eslint/method-signature-style': ['error', 'method'],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/indent': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'implicit-arrow-linebreak': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'no-relative-import-paths/no-relative-import-paths': [
      'warn',
      { allowSameFolder: false },
    ],
    'import/order': [
      'error',
      {
        groups: [
          ['external', 'builtin'],
          ['index', 'sibling', 'internal', 'parent'],
        ],
        'newlines-between': 'always',
      },
    ],
    'newline-after-var': ['error', 'always'],
    'newline-before-return': 'error',
    'object-curly-newline': 'off',
  },
  overrides: [
    {
      files: ['configs/**/*.js', 'express.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
