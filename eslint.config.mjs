import js from '@eslint/js';
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    rules: {
      // If I had some, they'd go here.
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
		module: 'readonly'
      }
    },
  },
];
