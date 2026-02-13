# LLM Agent Coding Standards & Guidelines

## Purpose
This document provides specific, actionable coding standards and guidelines that LLM agents must follow when generating code for this project.

---

## Core Principles

### 1. Clarity
- Write readable, self-documenting code that is easily understood by human developers
- Use descriptive variable and function names that convey intent
- Break complex logic into smaller, digestible functions
- Include comments explaining the "why" behind non-obvious implementations

### 2. Consistency
- Follow established patterns and conventions across the codebase
- Maintain uniform code style and formatting throughout all files
- Adhere to the project's architectural patterns and directory structure
- Use consistent naming conventions across all modules

### 3. Security
- Never introduce code with known vulnerabilities or security flaws
- Validate all user inputs and sanitize data
- Avoid hardcoding sensitive information (API keys, passwords, credentials)
- Follow security best practices for the specific technology stack
- Implement proper error handling without exposing sensitive information

### 4. Performance
- Optimize for efficiency without sacrificing readability or maintainability
- Avoid unnecessary computations and redundant operations
- Use appropriate algorithms and data structures for the task
- Consider memory usage and optimize resource allocation
- Profile code where performance is critical

---

## Language-Specific Guidelines

### JavaScript/TypeScript

#### Naming Conventions
- Use `camelCase` for variables and functions
- Use `PascalCase` for classes and constructors
- Use `UPPER_SNAKE_CASE` for constants
- Use `camelCase` for object properties and method names

#### File Organization
```javascript
// ✓ Good: Clear, descriptive names
function calculateUserDiscountPercentage(customerTier, orderTotal) {
  return customerTier === 'premium' ? 0.15 : 0.05;
}

// ✗ Bad: Unclear abbreviations
function calcUD(ct, ot) {
  return ct === 'p' ? 0.15 : 0.05;
}
```

#### Code Quality Standards
- Write modular, testable functions
- Keep functions under 50 lines when possible
- Maximum nesting depth: 3 levels
- Avoid deep nesting and overly complex logic
- Keep functions focused on single responsibilities

#### Error Handling
```javascript
// ✓ Good: Specific error handling
try {
  const result = performOperation(data);
} catch (error) {
  console.error('Operation failed:', error.message);
  // Handle specific error
}

// ✗ Bad: Silent failure or generic error
try {
  const result = performOperation(data);
} catch (e) {
  // Silent fail - no handling
}
```

#### Async/Promises
- Use `async/await` over raw Promises where possible
- Always handle Promise rejections with `.catch()` or try/catch blocks
- Avoid Promise chains that exceed 2-3 levels

#### Comments & Documentation
```javascript
/**
 * Calculates the final price after applying discounts
 * @param {number} basePrice - The original price in dollars
 * @param {number} discountPercent - Discount percentage (0-100)
 * @returns {number} The discounted price
 */
function applyDiscount(basePrice, discountPercent) {
  return basePrice * (1 - discountPercent / 100);
}
```

#### Testing Requirements
- Write compatible tests with Jest framework (project standard)
- Test edge cases, error conditions, and happy paths
- Maintain test coverage above 80%
- Use descriptive test names: `test('should return discount when customer is premium')`

### HTML/CSS - UI Framework Requirements

#### **CRITICAL: Bootstrap Usage Only**
**All UI elements MUST use Bootstrap classes. DO NOT create any custom components or custom CSS styling.**

- Use Bootstrap Grid System for all layouts
- Use Bootstrap utility classes for spacing, alignment, and display
- Use Bootstrap components for: buttons, cards, modals, forms, navbars, alerts, etc.
- Use Bootstrap color utilities for theming
- Bootstrap Version: 5.x (or latest stable version in package.json)

#### Valid Bootstrap Usage
```html
<!-- ✓ Good: Bootstrap classes only -->
<div class="container mt-5">
  <div class="row">
    <div class="col-md-6">
      <button class="btn btn-primary">Submit</button>
    </div>
  </div>
</div>

<form class="mt-4">
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email" placeholder="name@example.com">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

#### Prohibited Patterns
```html
<!-- ✗ Bad: Custom CSS components -->
<div class="custom-container">
  <button class="custom-btn">Submit</button>
</div>

<!-- ✗ Bad: Custom styling instead of Bootstrap utilities -->
<div style="margin-top: 20px;">
  <p style="color: blue; font-size: 16px;">Text</p>
</div>

<!-- ✗ Bad: Custom grid instead of Bootstrap grid -->
<div class="my-grid">
  <div class="my-col">Column</div>
</div>
```

#### HTML Structure
- Use semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Maintain proper heading hierarchy (`<h1>`, `<h2>`, `<h3>`, etc.)
- Include `alt` attributes for all images
- Use meaningful `id` and `class` attributes aligned with Bootstrap naming

#### CSS Standards
- **ONLY use Bootstrap utility classes** for styling
- Do NOT create custom CSS files for component styling
- If Bootstrap utilities are insufficient, discuss with the team before creating custom CSS
- Never mix custom CSS frameworks with Bootstrap

#### Accessibility
- Ensure keyboard navigation support for all interactive elements
- Use proper ARIA labels where necessary
- Maintain sufficient color contrast ratios (WCAG AA standard: 4.5:1 for text)
- Include form labels and error messages for all inputs
- Use semantic HTML for better screen reader support

---

## Code Quality Standards

### Modularity
- Export only what's necessary from modules
- Minimize circular dependencies
- Group related functionality into logical modules
- Keep files under 300 lines when possible

### Documentation Standards

#### Public APIs
- Document all public functions with JSDoc comments
- Include parameter types, return types, and descriptions
- Provide usage examples for non-obvious functions

#### Inline Comments
- Explain complex algorithms or business logic
- Avoid comments that merely repeat code
- Use comments to explain "why," not "what"

```javascript
// ✓ Good: Explains the reasoning
// Use Map instead of Object to preserve insertion order
const userMap = new Map();

// ✗ Bad: Repeats code
// Create a new map
const userMap = new Map();
```

#### README Documentation
- Include clear description of module/component purpose
- Document setup and installation instructions
- Provide usage examples
- List dependencies and version requirements

### Testing Standards

#### Coverage Requirements
- Maintain minimum 80% code coverage
- Test critical business logic thoroughly
- Include integration tests for key workflows

#### Test Structure
```javascript
describe('calculateUserDiscountPercentage', () => {
  test('should return 15% for premium customers', () => {
    const result = calculateUserDiscountPercentage('premium', 100);
    expect(result).toBe(0.15);
  });

  test('should return 5% for regular customers', () => {
    const result = calculateUserDiscountPercentage('regular', 100);
    expect(result).toBe(0.05);
  });
});
```

#### Edge Cases to Test
- Null and undefined inputs
- Boundary values and limit conditions
- Error conditions and exceptions
- Empty collections and zero values
- Type mismatches and invalid data

---

## Constraints & Prohibited Practices

### Security
- ✗ Do NOT hardcode secrets or credentials
- ✗ Do NOT use `eval()` or `Function()` constructors
- ✗ Do NOT disable security features
- ✗ Do NOT commit API keys to version control
- ✗ Always validate and sanitize user inputs

### Intellectual Property
- ✗ Do NOT generate code that violates copyright
- ✗ Do NOT use proprietary algorithms without attribution
- ✗ Respect open-source licensing requirements

### Code Safety
- ✗ Do NOT create memory leaks or resource exhaustion vectors
- ✗ Do NOT use deprecated or unsafe APIs without justification
- ✗ Do NOT ignore error conditions

### UI Development (CRITICAL)
- ✗ Do NOT create custom CSS components or styling
- ✗ Do NOT mix Bootstrap with custom CSS frameworks
- ✗ Do NOT use inline styles instead of Bootstrap utilities
- ✓ ALWAYS use Bootstrap classes for ALL UI elements
- ✓ ALWAYS use Bootstrap components (buttons, cards, forms, etc.)

---

## Pre-Commit Review Checklist

Before generating or submitting code for review, verify all items:

- [ ] **Naming**: Variables, functions, and classes follow correct naming conventions (camelCase, PascalCase, UPPER_SNAKE_CASE)
- [ ] **Clarity**: Code is readable and includes necessary comments explaining "why"
- [ ] **Consistency**: Code style matches existing codebase patterns
- [ ] **Modularity**: Functions have single responsibility; logic is not overly nested (max 3 levels)
- [ ] **Code Length**: Functions are under 50 lines; files are under 300 lines
- [ ] **Error Handling**: All error cases are handled appropriately with try/catch or .catch()
- [ ] **Testing**: Code is testable; tests are included/updated with 80%+ coverage
- [ ] **Security**: No vulnerabilities, hardcoded secrets, or unsafe patterns (eval, etc.)
- [ ] **Performance**: Code is efficient; no unnecessary computations or data operations
- [ ] **Documentation**: Comments, docstrings, and README are present and clear
- [ ] **Bootstrap Only** (UI Code): All UI elements use Bootstrap classes, NO custom components or CSS
- [ ] **Accessibility** (UI Code): ARIA labels, semantic HTML, and color contrast are implemented
- [ ] **Dependencies**: All external dependencies are appropriate and properly documented
- [ ] **No Lint Errors**: Code produces no console warnings or ESLint errors
- [ ] **HTML Semantics** (UI Code): Uses semantic tags (header, nav, main, section, footer)
- [ ] **Forms** (UI Code): All forms use Bootstrap form classes and include proper labels

---

## Project-Specific Tools & Frameworks

### Testing Framework
- **Primary**: Jest
- **Coverage Tools**: nyc/Istanbul

### UI Framework (MANDATORY)
- **Framework**: Bootstrap 5.x
- **Requirement**: ALL UI elements must use Bootstrap
- **Prohibited**: Custom CSS components, inline styles, custom frameworks

### Code Quality Tools
- **Linting**: ESLint (follow project configuration)
- **Code Formatting**: Prettier (if configured)

---

## Quick Reference

### Do's ✓
- ✓ Use Bootstrap for all UI elements
- ✓ Use semantic HTML
- ✓ Write meaningful comments
- ✓ Handle errors explicitly
- ✓ Test edge cases
- ✓ Keep functions focused
- ✓ Follow naming conventions

### Don'ts ✗
- ✗ Create custom CSS components
- ✗ Hardcode secrets or API keys
- ✗ Use eval() or Function()
- ✗ Ignore error conditions
- ✗ Write overly complex functions
- ✗ Mix different CSS frameworks
- ✗ Commit without linting

---

## Additional Resources

Refer to these files for project-specific information:
- [AGENTS.md](../AGENTS.md) - General agent instructions overview
- [package.json](../../package.json) - Dependencies and project metadata
- [jest.config.js](../../jest.config.js) - Jest testing configuration
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.x/) - Bootstrap 5.x reference
