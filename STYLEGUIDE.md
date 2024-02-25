# NFT Wallet Fetcher Style Guide

This document outlines coding and styling guidelines for the NFT Wallet Fetcher project. Our goal is to maintain a cohesive, readable, and maintainable codebase that aligns with industry best practices and our team's preferences.

## TypeScript Style Guide

### Naming Conventions

- **Variables and Functions**: Use `camelCase` for variable and function names.
- **Classes and Interfaces**: Use `PascalCase` for classes, interfaces, and type names.
- **Constants**: Use `UPPER_CASE` for constants. When constants are used to define types or enums, `PascalCase` should be used.

### Types

- Prefer interfaces over types for object definitions when possible for consistency.
- Use explicit types instead of inferring types to improve readability and prevent unintended type assignments.
- Always define return types for functions and methods to ensure clarity and predictability.

### Functions

- Use arrow functions for anonymous functions.
- Prefer async/await over traditional promise syntax for better readability and error handling.
- Keep functions short and focused on a single task.

### Classes

- Use classes for encapsulating complex logic that involves state management.
- Implement interfaces for consistency in class structures.
- Prefer composition over inheritance to reduce complexity and increase modularity.

### Modules

- Organize code into modules that represent distinct features or functionalities.
- Use explicit imports and exports to make dependencies clear.
- Avoid using wildcard (`*`) imports to prevent namespace pollution.

### Error Handling

- Use try/catch blocks for error handling, especially in asynchronous code.
- Create custom error types for more specific error handling.

### Comments and Documentation

- Use JSDoc for function documentation, including parameters and return types.
- Write comments that explain "why" something is done, not "what" is being done.
- Keep comments up-to-date with code changes.

## Formatting

- Use [Prettier](https://prettier.io/) for code formatting to ensure consistency across the codebase.
- Configure Prettier to match the project's coding standards (e.g., tab width, single vs. double quotes).

## Linting

- Use [ESLint](https://eslint.org/) with the [TypeScript ESLint plugin](https://typescript-eslint.io/) for static code analysis.
- Customize ESLint rules to match the project's style guide and integrate with Prettier.

## Version Control

- Write clear, concise commit messages that explain the changes made.
- Use feature branches for development and merge them into the main branch using pull requests.

## Continuous Integration

- Integrate ESLint and Prettier checks into the CI pipeline to enforce coding standards.

## Conclusion

Adhering to this style guide will help maintain the quality and consistency of the NFT Wallet Fetcher codebase. Contributions should follow these guidelines to ensure that our project remains clean, readable, and maintainable.
