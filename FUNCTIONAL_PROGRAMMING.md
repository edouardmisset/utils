# Functional Programming with ESLint

This project enforces functional programming principles using
[eslint-plugin-functional](https://github.com/eslint-functional/eslint-plugin-functional).

## Setup

The project uses ESLint alongside Deno's built-in linter to enforce functional
programming patterns:

- **ESLint**: Enforces functional programming rules
- **Deno Lint**: Enforces TypeScript and JavaScript best practices

## Installation

```bash
npm install
```

## Usage

### Run ESLint

```bash
npm run lint:eslint
```

### Run all checks (including ESLint)

```bash
deno task check
```

## Functional Programming Rules

The following functional programming rules are enforced:

### Immutability

- **`functional/immutable-data`** (warning): Prevents direct mutation of data
  structures
  - Allows immediate mutations (e.g., in `reduce` accumulators)
  - Allows mutations on specific patterns like `.id`, `.current`

- **`functional/no-let`** (error): Enforces use of `const` instead of `let`
  - Exceptions: Test files

- **`functional/prefer-readonly-type`** (warning): Encourages readonly types for
  function parameters
  - Allows mutable return types
  - Allows local mutations

### No OOP Paradigm

- **`functional/no-class-inheritance`** (warning): Discourages class inheritance
  - Encourages composition over inheritance

### Disabled Rules

The following rules are disabled as they are too strict for practical use:

- `functional/no-expression-statements`: Would require all code to be
  expressions
- `functional/no-return-void`: Needed for test functions and side effects
- `functional/no-throw-statements`: Exceptions are useful for error handling
- `functional/no-classes`: Classes are allowed when appropriate
- `functional/no-this-expressions`: This is allowed in class contexts

## Configuration Files

- **`eslint.config.js`**: ESLint configuration with functional plugin
- **`tsconfig.json`**: TypeScript configuration for ESLint type checking
- **`package.json`**: npm dependencies for ESLint

## Test Files

Test files (`**/*.test.ts`) have relaxed rules:

- `functional/no-let` is disabled
- `functional/immutable-data` is disabled
- `functional/prefer-readonly-type` is disabled

This allows for more flexible test code while maintaining functional principles
in production code.

## Internal Tools

Files in `_internal-tools/` have warnings instead of errors for:

- `functional/no-let`
- `functional/immutable-data`
- `functional/prefer-readonly-type`

This provides flexibility for utility scripts while still encouraging functional
patterns.
