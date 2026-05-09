# Development Guide

## 10.1 Code Standards

### TypeScript Standards

- Project uses TypeScript for type checking
- Custom type definitions go in `types` or `@types` directories
- Avoid using `any` type, prefer `unknown` or specific types
- Interface and type alias names use PascalCase

```typescript
// Good
interface User {
  id: string
  name: string
  email: string
}

// Avoid
const user: any = { ... }
```

### Vue Component Standards

- Component files use PascalCase or kebab-case naming
- Component props use TypeScript interfaces
- Component state uses `ref` or `reactive`
- Composable logic extracted to `composables` directory
- Component styles use `scoped` to limit scope

```vue
<script setup lang="ts">
interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})

const localState = ref(0)
</script>

<template>
  <div class="container">
    <h1>{{ title }}</h1>
  </div>
</template>

<style scoped>
.container {
  padding: 1rem;
}
</style>
```

### Backend Code Standards

- Follow Node.js best practices
- Route handlers stay concise, delegate business logic to service layer
- Database operations use Drizzle ORM type-safe queries
- Use unified error classes for error handling
- Use structured logging format

```typescript
// Route handler - keep it simple
router.post('/chats', async (c) => {
  const { characterId, title } = await c.req.json()
  const userId = c.get('userId')

  const chat = await chatsService.createChat(userId, characterId, title)
  return c.json({ code: 201, data: chat })
})
```

## 10.2 Git Workflow

The project uses Git for version control with feature branch workflow:

### Branch Naming

- `feature/xxx` - New feature development
- `bugfix/xxx` - Bug fix branches
- `hotfix/xxx` - Emergency fix branches
- `refactor/xxx` - Code refactoring

### Pull Request Process

1. Create feature branch from `main`
2. Make changes and commit
3. Push to remote and create PR
4. Code review by team members
5. Squash and merge after approval

## 10.3 Testing

### Unit Testing

Use Vitest as testing framework:

```typescript
// src/utils.test.ts
import { describe, it, expect } from 'vitest'
import { formatDate } from './utils'

describe('formatDate', () => {
  it('should format date correctly', () => {
    const result = formatDate(new Date('2024-01-01'))
    expect(result).toBe('2024-01-01')
  })
})
```

### Component Testing

Use Vue Test Utils with Vitest:

```typescript
// components/Button.test.ts
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button', () => {
  it('should emit click event', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
```

### API Testing

Use Supertest for backend API testing:

```typescript
import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from '../app'

describe('Auth API', () => {
  it('POST /auth/login should return token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' })

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('access_token')
  })
})
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

## 10.4 Documentation

### Code Comments

Use JSDoc style for API documentation:

```typescript
/**
 * Creates a new chat session for the user
 * @param userId - The ID of the user
 * @param characterId - The ID of the character
 * @param title - Optional title for the chat
 * @returns The created chat object
 */
export async function createChat(userId: string, characterId: string, title?: string): Promise<Chat> {
  // Implementation
}
```

### README Files

Keep README files updated with:
- Project introduction
- Installation steps
- Basic usage instructions

## 10.5 Linting & Formatting

### ESLint

```bash
# Run linting
pnpm lint

# Fix auto-fixable issues
pnpm lint:fix
```

### Type Checking

```bash
# Run TypeScript type check
pnpm typecheck

# Vue component type check
pnpm typecheck:vue
```

### Pre-commit Hooks

The project uses pre-commit hooks to ensure code quality:

```yaml
# .husky/pre-commit
pnpm lint-staged
```

## 10.6 Performance Considerations

### Frontend

- Use `v-memo` for large lists
- Lazy load routes and components
- Optimize images with proper formats
- Monitor bundle size with rollup-plugin-visualizer

### Backend

- Use database connection pooling
- Implement caching for frequently accessed data
- Use pagination for large datasets
- Monitor query performance with query logging

## 10.7 Security Best Practices

- Never commit secrets or API keys to repository
- Use environment variables for sensitive configuration
- Validate and sanitize all user input
- Use parameterized queries to prevent SQL injection
- Implement proper CORS configuration
- Use secure password hashing (bcrypt)
- Implement rate limiting for API endpoints

## 10.8 Contributing Guidelines

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Ensure all tests pass
6. Submit a pull request
7. Wait for code review
8. Address feedback if needed
9. Squash and merge

Thank you for contributing to Project Airi!
