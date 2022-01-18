module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['react-app', 'standard'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'import'],
  rules: {
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', 'ts', 'tsx'] }
    ],
    '@typescript-eslint/explicit-function-return-type': [
      0,
      { allowTypedFunctionExpressions: true }
    ],
    'no-unused-vars': 'off',
    'react/state-in-constructor': 0,
    'import/extensions': [
      2,
      'ignorePackages',
      { ts: 'never', tsx: 'never', json: 'never', js: 'never' }
    ],
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'react/jsx-props-no-spreading': 0,
    'no-unused-expressions': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-nested-ternary': 0,
    'react/static-property-placement': 0,
    'object-curly-newline': 0,
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-var-requires': 0
  },
  settings: {
    // ESLint 支持在配置文件添加共享设置。你可以添加 settings 对象到配置文件，它将提供给每一个将被执行的规则。
    // 如果你想添加的自定义规则而且使它们可以访问到相同的信息，这将会很有用，并且很容易配置。
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      typescript: {
        directory: './tsconfig.json'
      }
    }
  }
}
