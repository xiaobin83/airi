# 关键类与函数

## 7.1 前端关键组件

### App.vue（应用根组件）

App.vue 是 Vue 应用的根组件，定义应用的整体布局结构。

```vue
<script setup lang="ts">
onMounted(async () => {
  await authStore.initialize()
})
</script>
```

### ChatWindow 组件（聊天窗口组件）

ChatWindow 组件是聊天功能的核心组件。

**关键方法：**
- `loadMessages()`: 加载聊天消息
- `sendMessage()`: 发送用户消息
- `scrollToBottom()`: 滚动到最新消息

**功能特性：**
- 消息列表展示
- 消息分页加载
- 自动滚动到最新消息
- 消息时间戳显示

### CharacterCard 组件（角色卡片组件）

CharacterCard 组件展示角色的简要信息。

**Props：**
- `character`: 角色数据对象
- `selectable`: 是否可选择
- `size`: 显示大小变体

## 7.2 前端关键函数

### api.ts 中的 API 调用函数

位于 `packages/stage-ui/src/composables/api.ts`：

```typescript
export const get = async <T>(url: string, config?: RequestConfig): Promise<T>
export const post = async <T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>
export const put = async <T>(url: string, data?: unknown, config?: RequestConfig): Promise<T>
export const delete = async <T>(url: string, config?: RequestConfig): Promise<T>
```

功能：
- 自动添加认证令牌
- 统一错误处理
- 请求/响应拦截器
- 请求取消支持

### auth.ts 中的认证辅助函数

位于 `packages/stage-ui/src/libs/auth.ts`：

```typescript
export const login = async (email: string, password: string): Promise<User>
export const logout = async (): Promise<void>
export const getAccessToken = (): string | null
export const refreshToken = async (): Promise<TokenPair>
```

## 7.3 后端关键路由

### auth 路由

位于 `apps/server/src/routes/auth/index.ts`：

| 方法 | 端点 | 描述 |
|------|------|------|
| POST | /login | 用户登录 |
| POST | /register | 用户注册 |
| POST | /logout | 用户登出 |
| GET | /me | 获取当前用户信息 |

### chats 路由

位于 `apps/server/src/routes/chats/index.ts`：

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | / | 获取聊天列表 |
| POST | / | 创建聊天 |
| GET | /:id | 获取聊天详情 |
| POST | /:id/messages | 发送消息 |

## 7.4 后端关键服务

### chats 服务

位于 `apps/server/src/services/chats.ts`：

```typescript
export const createChat = async (userId: string, characterId: string, title?: string): Promise<Chat>
export const getChatMessages = async (chatId: string, page: number, pageSize: number): Promise<Message[]>
export const addMessage = async (chatId: string, userId: string, content: string): Promise<Message>
```

### flux 服务

位于 `apps/server/src/services/flux.ts`：

处理 Flux 业务模块的核心逻辑。

## 7.5 数据库操作

### accounts schema

```typescript
export const accounts = pgTable('accounts', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
```

### chats schema

```typescript
export const chats = pgTable('chats', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => accounts.id),
  characterId: uuid('character_id').references(() => characters.id),
  title: varchar('title', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow(),
  lastActiveAt: timestamp('last_active_at').defaultNow(),
})
```

## 7.6 数据库工具

### db.ts

位于 `apps/server/src/libs/db.ts`：

```typescript
import { drizzle } from 'drizzle-orm/node-postgres'
import { pool } from './pool'

export const db = drizzle({ pool })
```

### redis.ts

位于 `apps/server/src/libs/redis.ts`：

```typescript
import Redis from 'ioredis'

export const redis = new Redis(process.env.REDIS_URL)
```

用途：
- 会话缓存
- 实时消息存储
- 消息队列实现
