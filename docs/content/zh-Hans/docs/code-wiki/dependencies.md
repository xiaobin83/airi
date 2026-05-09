# 依赖关系

## 8.1 应用间依赖

### stage-web

```json
{
  "dependencies": {
    "@proj-airi/stage-ui": "workspace:^",
    "@proj-airi/server-sdk": "workspace:^",
    "vue": "catalog:",
    "vue-router": "catalog:",
    "pinia": "catalog:"
  }
}
```

### stage-tamagotchi

```json
{
  "dependencies": {
    "@proj-airi/stage-ui": "workspace:^",
    "@proj-airi/server-sdk": "workspace:^",
    "@proj-airi/audio": "workspace:^",
    "electron": "catalog:"
  }
}
```

### stage-pocket

```json
{
  "dependencies": {
    "@proj-airi/stage-ui": "workspace:^",
    "@proj-airi/server-sdk": "workspace:^",
    "@capacitor/core": "catalog:",
    "vue": "catalog:"
  }
}
```

### server

```json
{
  "dependencies": {
    "@proj-airi/server-runtime": "workspace:^",
    "@proj-airi/server-schema": "workspace:^",
    "@proj-airi/server-shared": "workspace:^",
    "hono": "catalog:",
    "drizzle-orm": "catalog:",
    "pg": "catalog:",
    "ioredis": "catalog:",
    "stripe": "catalog:"
  }
}
```

## 8.2 包间依赖

### stage-ui

```json
{
  "dependencies": {
    "vue": "catalog:",
    "vue-router": "catalog:",
    "pinia": "catalog:",
    "@vueuse/core": "catalog:"
  }
}
```

### server-runtime

```json
{
  "dependencies": {
    "hono": "catalog:",
    "drizzle-orm": "catalog:",
    "pg": "catalog:",
    "ioredis": "catalog:"
  }
}
```

### server-sdk

```json
{
  "dependencies": {
    "@proj-airi/server-sdk-shared": "workspace:^"
  }
}
```

## 8.3 外部依赖

### 前端

| 包名 | 版本 | 用途 |
|------|------|------|
| vue | catalog | 核心框架 |
| vue-router | catalog | 路由 |
| pinia | catalog | 状态管理 |
| @vueuse/core | catalog | Vue 组合式工具 |
| tailwindcss/uno | catalog | 样式 |
| vite | catalog | 构建工具 |

### 后端

| 包名 | 版本 | 用途 |
|------|------|------|
| hono | catalog | Web 框架 |
| drizzle-orm | catalog | ORM |
| drizzle-kit | catalog | 迁移 |
| pg | catalog | PostgreSQL 驱动 |
| ioredis | catalog | Redis 客户端 |
| stripe | catalog | 支付 |

### 跨平台

| 包名 | 版本 | 用途 |
|------|------|------|
| electron | catalog | 桌面应用 |
| @capacitor/core | catalog | 移动容器 |

## 8.4 开发依赖

```json
{
  "devDependencies": {
    "typescript": "catalog:",
    "eslint": "catalog:",
    "vitest": "catalog:",
    "playwright": "catalog:",
    "vite": "catalog:",
    "tsx": "catalog:"
  }
}
```

## 8.5 Catalog 配置

项目使用 catalog 模式进行集中式依赖版本管理：

```json
{
  "pnpm": {
    "catalog": {
      "vue": "^3.5.x",
      "hono": "^4.x",
      "electron": "^32.x",
      "typescript": "^5.9.x"
    }
  }
}
```

这确保了 monorepo 中所有包使用一致的版本。
