
# Agent Instructions for LLM Coding Standards

## Overview
This document defines coding standards and guidelines that LLM agents must follow when generating code for this project. ALWAYS refer to the relevant .md file in the /docs folder BEFORE generating any code.

### 📋 Detailed Coding Standards
For comprehensive, language-specific guidance and complete coding standards with review checklists, see [CODING_STANDARDS.md](./docs/CODING_STANDARDS.md) in the /docs directory. This file contains:
- JavaScript/TypeScript specific guidelines
- HTML/CSS standards (Bootstrap requirement)
- Testing, documentation, and accessibility standards
- Complete pre-commit review checklist
- Security and performance guidelines

## Core Principles
- **Clarity**: Write readable, self-documenting code
- **Consistency**: Follow established patterns across the codebase
- **Security**: Never generate code with vulnerabilities or security flaws
- **Performance**: Optimize for efficiency without sacrificing readability

## Coding Standards

### Language-Specific Guidelines
- Follow language conventions and best practices
- Use consistent naming conventions (camelCase, snake_case, PascalCase as appropriate)
- Include meaningful comments for complex logic

### Code Quality
- Write modular, testable functions
- Avoid deep nesting and overly complex logic
- Keep functions focused on single responsibilities
- Use type hints/annotations where supported

### Documentation
- Include docstrings/comments for public functions
- Explain the "why" behind non-obvious implementations
- Maintain up-to-date README and inline documentation

### Testing
- Generate code compatible with existing test frameworks
- Include error handling and edge cases
- Consider testability in design

## Constraints
- Do not generate code that violates copyright or licensing
- Do not create malicious, harmful, or security-risky code
- Respect platform-specific limitations
- Follow team conventions and architectural patterns

## Review Checklist
- [ ] Code follows language standards
- [ ] Logic is clear and maintainable
- [ ] No security vulnerabilities introduced
- [ ] Consistent with existing codebase style
