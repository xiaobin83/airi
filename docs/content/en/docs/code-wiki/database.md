# Database Models

## 5.1 Database Overview

The project uses PostgreSQL as the primary database, using Drizzle ORM for data access and model management. Database schemas are defined in `apps/server/src/schemas`.

## 5.2 Core Data Tables

### Accounts Table (accounts)

The accounts table is the core of the user system, storing user authentication information and basic profile.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Unique identifier |
| username | VARCHAR | Username |
| email | VARCHAR | Email address (unique) |
| password_hash | VARCHAR | Bcrypt hashed password |
| created_at | TIMESTAMP | Creation time |
| updated_at | TIMESTAMP | Last update time |

### Characters Table (characters)

Stores AI character definitions and configuration information.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Character unique identifier |
| name | VARCHAR | Character name |
| description | TEXT | Character description |
| avatar_url | VARCHAR | Avatar URL |
| config | JSONB | Character configuration |
| user_id | UUID | Owner user ID |
| created_at | TIMESTAMP | Creation time |

### Chats Table (chats)

Stores conversation records between users and characters.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Chat unique identifier |
| user_id | UUID | User ID |
| character_id | UUID | Character ID |
| title | VARCHAR | Chat title |
| created_at | TIMESTAMP | Creation time |
| last_active_at | TIMESTAMP | Last activity time |

### User Character Relation Table (user_character)

Implements many-to-many relationship between users and characters.

| Column | Type | Description |
|--------|------|-------------|
| user_id | UUID | User ID |
| character_id | UUID | Character ID |
| relation_type | VARCHAR | Relation type |
| created_at | TIMESTAMP | Creation time |

### AI Providers Table (providers)

Manages different AI model service provider configurations.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Provider identifier |
| name | VARCHAR | Provider name |
| api_endpoint | VARCHAR | API endpoint |
| api_key | VARCHAR | Encrypted API key |
| models | JSONB | Model list |
| status | BOOLEAN | Status flag |

### Stripe Related Tables

**subscriptions table:**

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Subscription ID |
| user_id | UUID | User ID |
| stripe_subscription_id | VARCHAR | Stripe subscription ID |
| plan_type | VARCHAR | Plan type |
| start_at | TIMESTAMP | Start time |
| end_at | TIMESTAMP | End time |
| status | VARCHAR | Status |

**payments table:**

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Transaction ID |
| subscription_id | UUID | Subscription ID |
| amount | DECIMAL | Amount |
| currency | VARCHAR | Currency type |
| status | VARCHAR | Payment status |
| stripe_payment_id | VARCHAR | Stripe payment ID |

### Flux System Tables (flux_related)

Stores core data of Flux business system.

## 5.3 Database Indexes & Optimization

Appropriate indexes are created for query performance:
- Common query fields like user_id, character_id, created_at have indexes
- Foreign key constraints ensure referential integrity
- Update time fields auto-maintained via triggers or application logic

## 5.4 Database Migrations

The project uses Drizzle Kit to manage database migrations:

```bash
cd apps/server
pnpm db:migrate
```

Migration files are located in `apps/server/drizzle` directory.

## 5.5 Schema Definition Example

```typescript
// apps/server/src/schemas/accounts.ts
import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core'

export const accounts = pgTable('accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
```
