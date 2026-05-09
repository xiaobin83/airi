# Architecture Design

## 3.1 Overall Architecture

Project Airi uses a layered architecture design, from bottom to top: infrastructure layer, data layer, business logic layer, interface layer, and presentation layer.

### Infrastructure Layer

Contains database services, cache services, and file storage services, providing stable data storage and access capabilities for upper layers.

### Data Layer

Uses Drizzle ORM to define data models and database operation interfaces, implementing abstraction and encapsulation of data access.

### Business Logic Layer

Contains various service classes handling specific business rules and data flow logic.

### Interface Layer

Provides RESTful API and WebSocket interfaces for frontend and client applications.

### Presentation Layer

Various application interfaces for users, including web pages, desktop apps, and mobile apps.

## 3.2 Monorepo Architecture

The project uses pnpm workspace to manage monorepo structure, defined in the root package.json. This architecture brings advantages like high code reuse rate, unified version management, and convenient cross-project refactoring.

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
  - 'services/*'
```

Apps and packages reference each other through workspace protocol without manual node_modules management.

## 3.3 Frontend State Management

Frontend uses Pinia for state management, with multiple Store modules defined in packages/stage-ui/src/stores:

- **auth Store**: Manages user authentication state including login status, user info, and access tokens
- **chat Store**: Manages chat-related state including chat history, current conversation, and message sending status
- **character Store**: Manages character-related data including character list, character details, and character configuration

## 3.4 Backend Layered Architecture

Backend uses classic three-tier architecture: Routes, Services, and Schemas (Data Access Layer).

### Route Layer

Responsible for receiving HTTP requests, performing parameter validation and initial processing, then calling service layer to complete business logic.

### Service Layer

Encapsulates specific business rules, handles complex data operations and business decisions.

### Data Access Layer

Defines database table structures and provides basic CRUD operation interfaces.

### Middleware Layer

Provides cross-cutting concerns handling:
- **auth.ts**: JWT token verification middleware
- **cors.ts**: CORS configuration
- **error.ts**: Global error handling

### Utils Layer

Provides various utility functions like ID generation, date formatting, encryption/decryption.

## 3.5 Communication Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Web/Mobile    │────▶│   Backend API   │────▶│   PostgreSQL    │
│   Client        │     │   (Hono)        │     │   Database      │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                │
                                ▼
                        ┌─────────────────┐
                        │     Redis       │
                        │    Cache        │
                        └─────────────────┘
```

## 3.6 Data Flow

1. User interaction triggers API request
2. Frontend sends request with authentication token
3. Backend middleware verifies authentication
4. Route handler validates parameters
5. Service layer executes business logic
6. Data access layer queries/updates database
7. Response flows back through layers to frontend
