# 技术栈

## 2.1 前端技术栈

前端技术栈基于 Vue 3 生态系统构建，采用了最新的组合式 API（Composition API）模式进行开发。

### 核心框架与库

- **Vue 3.5.32+**：渐进式 JavaScript 框架，采用响应式系统和组合式 API
- **TypeScript 5.9.3+**：提供完整的类型系统支持，增强代码的可维护性和重构能力
- **Vite 6.x**：新一代前端构建工具，提供极速的开发体验
- **Vue Router**：官方路由管理解决方案
- **Pinia**：轻量级状态管理库，用于管理全局应用状态

### UI 与样式

- **自定义组件库（stage-ui）**：项目自研的 Vue 3 组件库，提供统一的视觉风格
- **TailwindCSS 4.x / UnoCSS**：原子化 CSS 框架，用于快速构建响应式界面
- **@vueuse/core 14.1.0+**：Vue 组合式工具库，提供大量实用的组合式函数

### 构建与部署

- **Rolldown**：高性能 JavaScript 打包工具
- **ESLint 10.2.1**：代码质量检查工具
- **TypeScript**：编译与类型检查

## 2.2 后端技术栈

后端采用 Node.js 运行时环境，结合现代化的 Web 框架和数据库技术构建高效可靠的 API 服务。

### 运行时与框架

- **Node.js 18+**：JavaScript 运行时环境
- **Hono**：轻量级、高性能的 Web 框架，支持中间件模式
- **TypeScript**：后端代码的类型安全保障

### 数据库与缓存

- **PostgreSQL**：关系型数据库，存储核心业务数据
- **Drizzle ORM**：类型安全的关系映射工具，提供数据库操作的类型提示
- **Redis**：内存数据库，用于缓存和会话管理

### 认证与安全

- **JWT（JSON Web Token）**：无状态身份认证机制
- **bcrypt**：密码哈希处理
- **Stripe**：支付和订阅管理

## 2.3 跨平台技术栈

### 桌面应用

- **Electron**：基于 Chromium 和 Node.js 的桌面应用框架
- **Electron Forge**：Electron 应用的构建和打包工具

### 移动应用

- **Capacitor**：跨平台原生容器，支持将 Web 应用打包为 iOS 和 Android 应用
- **Vue 3 Mobile**：针对移动端优化的 Vue 组件

## 2.4 核心依赖

### 前端依赖

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

### 后端依赖

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

### 构建与开发工具

- **pnpm**：Monorepo 管理的包管理器
- **ESLint**：代码质量检查
- **Vitest**：测试框架
- **Playwright**：端到端测试
