# Technical Stack

## 2.1 Frontend Tech Stack

The frontend tech stack is built on Vue 3 ecosystem, using the latest Composition API pattern for development.

### Core Frameworks & Libraries

- **Vue 3.5.32+**: Progressive JavaScript framework with reactive system and Composition API
- **TypeScript 5.9.3+**: Full type system support for better maintainability and refactoring
- **Vite 6.x**: Next-generation frontend build tool providing fast development experience
- **Vue Router**: Official routing management solution
- **Pinia**: Lightweight state management library for global application state

### UI & Styling

- **Custom Component Library (stage-ui)**: Project's self-developed Vue 3 component library providing unified visual style
- **TailwindCSS 4.x / UnoCSS**: Atomic CSS framework for rapid responsive UI development
- **@vueuse/core 14.1.0+**: Vue composition utilities library with many practical composable functions

### Build & Deployment

- **Rolldown**: High-performance JavaScript bundler
- **ESLint 10.2.1**: Code quality checking tool
- **TypeScript**: Type checking and compilation

## 2.2 Backend Tech Stack

The backend uses Node.js runtime environment, combined with modern web frameworks and database technologies to build efficient and reliable API services.

### Runtime & Framework

- **Node.js 18+**: JavaScript runtime environment
- **Hono**: Lightweight, high-performance web framework with middleware support
- **TypeScript**: Type safety for backend code

### Database & Cache

- **PostgreSQL**: Relational database for core business data
- **Drizzle ORM**: Type-safe object-relational mapping tool
- **Redis**: In-memory database for caching and session management

### Authentication & Security

- **JWT (JSON Web Token)**: Stateless authentication mechanism
- **bcrypt**: Password hashing
- **Stripe**: Payment and subscription management

## 2.3 Cross-Platform Tech Stack

### Desktop Application

- **Electron**: Desktop application framework based on Chromium and Node.js
- **Electron Forge**: Build and packaging tool for Electron applications

### Mobile Application

- **Capacitor**: Cross-platform native container supporting iOS and Android packaging
- **Vue 3 Mobile**: Vue components optimized for mobile

## 2.4 Key Dependencies

### Frontend Dependencies

```json
{
  "vue": "^3.5.x",
  "vue-router": "^4.x",
  "pinia": "^2.x",
  "@vueuse/core": "^14.x",
  "tailwindcss": "^4.x",
  "vite": "^6.x",
  "typescript": "^5.9.x"
}
```

### Backend Dependencies

```json
{
  "hono": "^4.x",
  "drizzle-orm": "^0.30.x",
  "drizzle-kit": "^0.20.x",
  "pg": "^8.x",
  "ioredis": "^5.x",
  "stripe": "^14.x"
}
```

### Build & Development Tools

- **pnpm**: Package manager for monorepo management
- **ESLint**: Code quality checking
- **Vitest**: Testing framework
- **Playwright**: End-to-end testing
