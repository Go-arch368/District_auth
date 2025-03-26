import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import globals from 'globals';

export default [
  // Base ESLint recommended config
  js.configs.recommended,
  
  // Next.js recommended configs
  ...nextPlugin.configs.recommended,
  ...nextPlugin.configs['core-web-vitals'],
  
  // Global variables
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  
  // Custom rules and ignores
  {
    rules: {
      // Add your custom rules here
      'prettier/prettier': 'error',
    },
    ignores: [
      '.next/',
      'node_modules/',
      'dist/',
      'build/'
    ],
  },
];