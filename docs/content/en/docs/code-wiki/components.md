# Key Components

## 7.1 Frontend Key Components

### App.vue (Root Component)

App.vue is the root component of the Vue application, defining the overall layout structure.

```vue
<script setup lang="ts">
// Initialize global state and load necessary data
onMounted(async () => {
  await authStore.initialize()
})
</script>
```

### ChatWindow Component

The ChatWindow component is the core component for chat functionality.

**Key Methods:**
- `loadMessages()`: Load chat messages
- `sendMessage()`: Send user message
- `scrollToBottom()`: Scroll to latest message

**Features:**
- Message list display
- Message pagination
- Auto-scroll to latest message
- Message timestamp display

### CharacterCard Component

CharacterCard component displays character summary information.

**Props:**
- `character`: Character data object
- `selectable`: Whether selectable
- `size`: Display size variant

## 7.2 Frontend Key Functions

### API Functions (api.ts)

Located at `packages/stage-ui/src/composables/api.ts`:

```typescript
// Base HTTP methods
export const get = async <T>(url: string, config?: RequestConfig): Promise<T>
export const post = async <T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>
export const put = async <T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>
export const delete = async <T>(url: string, config?: RequestConfig): Promise<T>
```

Features:
- Automatic authentication token injection
- Unified error handling
- Request/response interceptors
- Request cancellation support

### Auth Helpers (auth.ts)

Located at `packages/stage-ui/src/libs/auth.ts`:

```typescript
export const login = async (email: string, password: string): Promise<User>
export const logout = async (): Promise<void>
export const getAccessToken = (): string | null
export const refreshToken = async (): Promise<TokenPair>
```

## 7.3 Backend Key Routes

### auth Route

Located at `apps/server/src/routes/auth/index.ts`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /login | User login |
| POST | /register | User registration |
| POST | /logout | User logout |
| GET | /me | Get current user info |

### chats Route

Located at `apps/server/src/routes/chats/index.ts`:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | Get chat list |
| POST | / | Create chat |
| GET | /:id | Get chat details |
| POST | /:id/messages | Send message |

## 7.4 Backend Key Services

### chats Service

Located at `apps/server/src/services/chats.ts`:

```typescript
// Create chat session
export const createChat = async (userId: string, characterId: string, title?: string): Promise<Chat>

// Get chat messages (paginated)
export const getChatMessages = async (chatId: string, page: number, pageSize: number): Promise<Message[]>

// Add message and trigger AI response
export const addMessage = async (chatId: string, userId: string, content: string): Promise<Message>
```

### flux Service

Located at `apps/server/src/services/flux.ts`:

Handles Flux business module core logic with business rules and data flow control.

## 7.5 Database Operations

### accounts Schema

```typescript
// apps/server/src/schemas/accounts.ts
export const accounts = pgTable('accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
```

### chats Schema

```typescript
// apps/server/src/schemas/chats.ts
export const chats = pgTable('chats', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => accounts.id),
  characterId: uuid('character_id').references(() => characters.id),
  title: varchar('title', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  lastActiveAt: timestamp('last_active_at').defaultNow(),
})
```

## 7.6 Database Utilities

### db.ts

Located at `apps/server/src/libs/db.ts`:

```typescript
import { drizzle } from 'drizzle-orm/node-postgres'
import { pool } from './pool'

export const db = drizzle({ pool })

export async function initializeDatabase() {
  // Ensure tables and indexes exist
}
```

### redis.ts

Located at `apps/server/src/libs/redis.ts`:

```typescript
import Redis from 'ioredis'

export const redis = new Redis(process.env.REDIS_URL)

redis.on('error', (err) => {
  console.error('Redis connection error:', err)
})
```

Used for:
- Session caching
- Real-time message storage
- Message queue implementation
