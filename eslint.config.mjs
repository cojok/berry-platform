import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import nx from '@nx/eslint-plugin';
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import nestjs from 'eslint-plugin-nestjs';

export default [
  // Base ESLint recommended settings
  js.configs.recommended,
  // Nx configurations must be spread separately
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  // ✅ Enforce STRONG Vue rules
  ...vue.configs['flat/strongly-recommended'],
  {
    // Apply ESLint to JavaScript, TypeScript, and Vue files
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslintParser, // ✅ Use TypeScript parser inside Vue files
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      vue,
      '@typescript-eslint': tseslint,
      import: importPlugin,
    },
    rules: {
      // ✅ Vue Specific Enhancements
      'vue/multi-word-component-names': 'error', // Enforce multi-word component names
      'vue/require-default-prop': 'error', // Require default values for props
      'vue/require-prop-types': 'error', // Require prop types
      // ✅ Circular Dependency Detection
      'import/no-cycle': ['error', { maxDepth: 1 }],
      // ✅ No Floating Promises (Prevents unhandled promise rejections)
      '@typescript-eslint/no-floating-promises': 'error',
      // ✅ Strict TypeScript Rules
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-inferrable-types': 'error',
      // ✅ Best Practices
      eqeqeq: ['error', 'always'], // Force strict comparison (=== and !==)
      'no-console': 'warn', // Warn about console.logs
      'no-debugger': 'error', // Disallow `debugger` statements
      // ✅ Enforce module boundaries (Nx rule)
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
    ignores: [
      '**/node_modules/**', // Ignore node_modules
      '**/dist/**', // Ignore dist build files
      '**/*.config.ts', // Ignore config files (webpack, jest, vitest, etc.)
      '**/*.spec.ts', // Ignore test files
      '**/*.test.ts', // Ignore test files
      '**/*.d.ts', // Ignore declaration files
      '**/tsconfig.json', // Avoid parsing tsconfig.json
      'jest.config.ts', // Avoid parsing jest.config.ts
      '**/jest.config.js', // Avoid parsing jest.config.js
      'vitest.workspace.ts', // Avoid parsing vitest.workspace.ts
      '**/vitest.workspace.ts', // Avoid parsing vitest.workspace.ts
      'webpack.config.js', // Avoid parsing webpack.config.js
      '**/webpack.config.js', // Avoid parsing webpack.config.js
      'jest.preset.js', // Avoid parsing jest.preset.js
      '**/jest.preset.js', // Avoid parsing jest.preset.js,
      'dist/**/*', // Ignore dist build files
      'dist/apps/api-nest/main.js', // Ignore main.js file for NestJS
    ],
  },
  {
    files: ['apps/api/**/*.ts'], // ✅ Only apply these to the backend
    plugins: {
      nestjs,
    },
    rules: {
      'nestjs/use-validation-pipe': 'error', // ✅ Ensure all controllers use ValidationPipe
      'nestjs/use-class-validator-json-schema': 'warn', // ⚠️ Recommend JSON schema validation
    },
    ignores: [
      '**/node_modules/**', // Ignore node_modules
      '**/dist/**', // Ignore dist build files
      '**/*.config.ts', // Ignore config files (webpack, jest, vitest, etc.)
      '**/*.spec.ts', // Ignore test files
      '**/*.test.ts', // Ignore test files
      '**/*.d.ts', // Ignore declaration files
      '**/tsconfig.json', // Avoid parsing tsconfig.json
      'jest.config.ts', // Avoid parsing jest.config.ts
      '**/jest.config.js', // Avoid parsing jest.config.js
      'vitest.workspace.ts', // Avoid parsing vitest.workspace.ts
      '**/vitest.workspace.ts', // Avoid parsing vitest.workspace.ts
      'webpack.config.js', // Avoid parsing webpack.config.js
      '**/webpack.config.js', // Avoid parsing webpack.config.js
      'jest.preset.js', // Avoid parsing jest.preset.js
      '**/jest.preset.js', // Avoid parsing jest.preset.js,
      'dist/**/*', // Ignore dist build files
      'dist/apps/api-nest/main.js', // Ignore main.js file for NestJS
    ],
  },
  {
    ignores: ['**/vite.config.*.timestamp*', '**/vitest.config.*.timestamp*'],
  },
];
