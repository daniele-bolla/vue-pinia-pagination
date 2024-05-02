/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')
const pluginVueA11y = require('eslint-plugin-vuejs-accessibility')

module.exports = {
  root: true,
  ...pluginVueA11y.configs['flat/recommended'],
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    'plugin:vuejs-accessibility/recommended'
  ],
  overrides: [
    {
      files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:playwright/recommended']
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}
