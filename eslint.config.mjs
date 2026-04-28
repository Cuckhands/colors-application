import js from '@eslint/js';
import globals from "globals";

export default [
  js.configs.recommended,
{
  ignores: ["coverage/**", "node_modules/**"]
},
{
  files: ['**/*.js'],
  rules: {},
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      ...globals.browser,
      module: 'readonly'
    }
  },
},
// Override for test files
{
  files: ['__tests__/**/*.js', '**/*.test.js'],
  languageOptions: {
    globals: {
      ...globals.jest,
      ...globals.node,
    }
  },
},
// Override for scripts
{
  files: ['scripts/**/*.js'],
  languageOptions: {
    globals: {
      ...globals.node,
    }
  },
},
];
