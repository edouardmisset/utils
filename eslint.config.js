import eslint from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import functional from 'eslint-plugin-functional'

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        Deno: 'readonly',
        fetch: 'readonly',
        URL: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        VoidFunction: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      functional,
    },
    rules: {
      // Functional programming rules from eslint-plugin-functional
      // Immutability rules
      'functional/immutable-data': ['error', {
        ignoreImmediateMutation: true,
        ignoreAccessorPattern: ['**.current', '**.current.*'],
      }],
      'functional/no-let': 'error',
      'functional/prefer-readonly-type': ['warn', {
        allowLocalMutation: true,
        allowMutableReturnType: true,
        ignoreClass: true,
        ignoreInterface: false,
        ignoreCollections: false,
      }],
      
      // No statements rules
      'functional/no-expression-statements': 'off', // Too strict for most codebases
      'functional/no-return-void': 'off', // Allow void returns for test functions
      
      // No exceptions rules
      'functional/no-throw-statements': 'off', // Allow throw for error handling
      'functional/no-try-statements': 'off', // Allow try-catch for error handling
      
      // Currying rules
      'functional/functional-parameters': 'off', // Can be too strict
      
      // No other paradigm rules
      'functional/no-class-inheritance': 'error',
      'functional/no-classes': 'off', // Allow classes when needed
      'functional/no-mixed-types': 'off',
      'functional/no-this-expressions': 'off', // Allow this in classes
      
      // TypeScript specific
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      
      // ESLint core
      'no-undef': 'error',
      'no-unused-vars': 'off', // Use @typescript-eslint/no-unused-vars instead
      'no-useless-escape': 'error',
      'no-redeclare': 'off', // Allow function overloads in TypeScript
    },
  },
  {
    // Relax rules for test files
    files: ['**/*.test.ts'],
    rules: {
      'functional/no-return-void': 'off',
      'functional/prefer-readonly-type': 'off',
      'functional/immutable-data': 'off',
    },
  },
  {
    // Relax rules for internal tools
    files: ['_internal-tools/**/*.ts'],
    rules: {
      'functional/no-let': 'warn',
      'functional/immutable-data': 'warn',
      'functional/prefer-readonly-type': 'warn',
    },
  },
  {
    ignores: [
      'node_modules/**',
      'coverage/**',
      'docs/**',
      '.git/**',
      'dist/**',
      '*.config.js',
    ],
  },
]
