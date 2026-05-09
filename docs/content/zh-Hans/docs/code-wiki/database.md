# 数据库模型

## 5.1 数据库概览

项目使用 PostgreSQL 作为主数据库，采用 Drizzle ORM 进行数据访问和模型管理。数据库 schema 定义在 `apps/server/src/schemas`。

## 5.2 核心数据表

### 账户表（accounts）

accounts 表是用户系统的核心表，存储用户的认证信息和基本资料。

| 字段 | 类型 | 描述 |
|------|------|------|
| id | UUID | 唯一标识符 |
| username | VARCHAR | 用户名 |
| email | VARCHAR | 邮箱地址（唯一） |
| password_hash | VARCHAR | Bcrypt 哈希密码 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

### 角色表（characters）

characters 表存储 AI 角色的定义和配置信息。

| 字段 | 类型 | 描述 |
|------|------|------|
| id | UUID | 角色唯一标识 |
| name | VARCHAR | 角色名称 |
| description | TEXT | 角色描述 |
| avatar_url | VARCHAR | 头像 URL |
| config | JSONB | 角色配置 |
| user_id | UUID | 所属用户 ID |
| created_at | TIMESTAMP | 创建时间 |

### 聊天记录表（chats）

chats 表存储用户与角色之间的对话记录。

| 字段 | 类型 | 描述 |
|------|------|------|
| id | UUID | 聊天唯一标识 |
| user_id | UUID | 用户 ID |
| character_id | UUID | 角色 ID |
| title | VARCHAR | 聊天标题 |
| created_at | TIMESTAMP | 创建时间 |
| last_active_at | TIMESTAMP | 最后活跃时间 |

### 用户角色关联表（user_character）

user_character 表实现用户和角色的多对多关系。

| 字段 | 类型 | 描述 |
|------|------|------|
| user_id | UUID | 用户 ID |
| character_id | UUID | 角色 ID |
| relation_type | VARCHAR | 关联类型 |
| created_at | TIMESTAMP | 创建时间 |

### AI 提供商表（providers）

providers 表管理不同的 AI 模型服务商配置。

| 字段 | 类型 | 描述 |
|------|------|------|
| id | UUID | 提供商标识 |
| name | VARCHAR | 提供商名称 |
| api_endpoint | VARCHAR | API 端点 |
| api_key | VARCHAR | 加密存储的 API 密钥 |
| models | JSONB | 模型列表 |
| status | BOOLEAN | 状态标识 |

### Stripe 相关表

**subscriptions 表：**

| 字段 | 类型 | 描述 |
|------|------|------|
| id | UUID | 订阅 ID |
| user_id | UUID | 用户 ID |
| stripe_subscription_id | VARCHAR | Stripe 订阅 ID |
| plan_type | VARCHAR | 计划类型 |
| start_at | TIMESTAMP | 开始时间 |
| end_at | TIMESTAMP | 结束时间 |
| status | VARCHAR | 状态 |

**payments 表：**

| 字段 | 类型 | 描述 |
|------|------|------|
| id | UUID | 交易 ID |
| subscription_id | UUID | 订阅 ID |
| amount | DECIMAL | 金额 |
| currency | VARCHAR | 货币类型 |
| status | VARCHAR | 支付状态 |
| stripe_payment_id | VARCHAR | Stripe 支付 ID |

## 5.3 数据库索引与优化

为提高查询性能，数据库表建立了适当的索引。常用的查询字段如 user_id、character_id、created_at 等都建立了索引。外键约束确保引用完整性。

## 5.4 数据库迁移

项目使用 Drizzle Kit 管理数据库迁移：

```bash
cd apps/server
pnpm db:migrate
```

迁移文件位于 `apps/server/drizzle` 目录。

## 5.5 Schema 定义示例

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
