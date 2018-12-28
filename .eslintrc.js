module.exports = {
  env: {
    browser: true,
    jest: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
      },
    ],
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  // https://github.com/AtomLinter/linter-eslint/issues/610
  settings: {
    'import/resolver': {
      node: { paths: ['src'] },
    },
  },
};
