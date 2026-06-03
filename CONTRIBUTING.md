# Contributing to AI Customer Support SaaS

Thank you for your interest in contributing to our project! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help maintain a positive community
- Report inappropriate behavior

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ai-customer-support-saas.git
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up your `.env` file (see README.md)
5. Run the development server:
   ```bash
   npm run dev
   ```

## Development Process

### Branch Naming

- `feature/` - New features (e.g., `feature/add-export-chat`)
- `fix/` - Bug fixes (e.g., `fix/login-redirect`)
- `docs/` - Documentation (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/chat-component`)
- `test/` - Test additions (e.g., `test/api-routes`)

### Workflow

1. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our coding standards

3. Test your changes:
   ```bash
   npm run lint
   npm run build
   ```

4. Commit your changes (see commit guidelines)

5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Open a Pull Request

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid `any` type when possible
- Use type inference where appropriate

### Code Style

- Use ESLint configuration provided
- Format code with Prettier (if configured)
- Follow existing code patterns
- Keep functions small and focused
- Write descriptive variable names

### Components

- Use functional components with hooks
- Keep components under 200 lines
- Extract reusable logic to custom hooks
- Use proper TypeScript types for props

```typescript
// Good
interface ChatMessageProps {
  message: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export function ChatMessage({ message, sender, timestamp }: ChatMessageProps) {
  // Component logic
}

// Avoid
export function ChatMessage(props: any) {
  // Component logic
}
```

### File Organization

- One component per file
- Co-locate related files
- Use barrel exports (index.ts) for folders
- Keep folder structure flat when possible

### Naming Conventions

- Components: PascalCase (e.g., `ChatInterface.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)
- Types: PascalCase (e.g., `UserProfile`)

## Commit Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting)
- `refactor` - Code refactoring
- `test` - Test additions or changes
- `chore` - Build process or auxiliary tool changes

### Examples

```bash
feat(chat): add message regeneration feature

fix(auth): resolve login redirect issue

docs(readme): update installation instructions

refactor(api): improve error handling
```

## Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Tests pass locally
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors or warnings
- [ ] Documentation updated if needed
- [ ] Commit messages follow guidelines

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How to test these changes

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
```

### Review Process

1. Maintainer will review your PR
2. Address any requested changes
3. Once approved, PR will be merged
4. Delete your feature branch

## Reporting Bugs

### Before Reporting

- Check existing issues
- Test on latest version
- Reproduce the bug
- Gather system information

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 18.17.0]

**Additional context**
Any other relevant information
```

## Suggesting Features

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of what you want

**Describe alternatives considered**
Other solutions you've considered

**Additional context**
Mockups, examples, etc.
```

## Development Tips

### Running Tests

```bash
# Run all tests
npm test

# Run specific test
npm test -- chat.test.ts

# Watch mode
npm test -- --watch
```

### Database Changes

```bash
# Create migration
npx prisma migrate dev --name your-migration-name

# Reset database
npx prisma migrate reset

# View database
npx prisma studio
```

### Debugging

- Use VS Code debugger
- Check browser console
- Review server logs
- Use React DevTools

## Questions?

- Open a discussion on GitHub
- Check existing documentation
- Review closed issues for similar questions

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing! 🎉
