module.exports = {
  extends: ['airbnb-base', 'prettier'],
  ignorePatterns: 'webpack.*.js',
  env: {
    browser: true,
    es2024: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
};
