# 开发指南

## 10.1 代码规范

### TypeScript 规范

- 项目使用 TypeScript 进行类型检查
- 自定义类型定义放在 `types` 或 `@types` 目录
- 避免使用 `any` 类型，尽量使用 `unknown` 或具体类型
- 接口和类型别名命名使用 PascalCase

```typescript
// 好的示例
interface User {
  id: string
  name: string
  email: string
}

// 应避免
const user: any = { ... }
```

### Vue 组件规范

- 组件文件采用 PascalCase 或 kebab-case 命名
- 组件 props 使用 TypeScript 接口定义
- 组件状态使用 `ref` 或 `reactive`
- 组合式逻辑抽离到 `composables` 目录
- 组件样式使用 `scoped` 限制作用域

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

### 后端代码规范

- 路由处理器保持简洁，业务逻辑委托给服务层
- 数据库操作使用 Drizzle ORM 的类型安全查询
- 错误处理使用统一的错误类
- 日志记录使用结构化日志格式

```typescript
// 路由处理器保持简洁
router.post('/chats', async (c) => {
  const { characterId, title } = await c.req.json()
  const userId = c.get('userId')

  const chat = await chatsService.createChat(userId, characterId, title)
  return c.json({ code: 201, data: chat })
})
```

## 10.2 Git 工作流程

项目使用 Git 进行版本控制，采用功能分支工作流：

### 分支命名

- `feature/xxx` - 新功能开发
- `bugfix/xxx` - Bug 修复分支
- `hotfix/xxx` - 紧急修复分支
- `refactor/xxx` - 代码重构

### Pull Request 流程

1. 从 `main` 创建功能分支
2. 进行修改并提交
3. 推送到远程并创建 PR
4. 团队成员代码审查
5. 批准后合并

## 10.3 测试

### 单元测试

使用 Vitest 作为测试框架：

```typescript
import { describe, it, expect } from 'vitest'
import { formatDate } from './utils'

describe('formatDate', () => {
  it('should format date correctly', () => {
    const result = formatDate(new Date('2024-01-01'))
    expect(result).toBe('2024-01-01')
  })
})
```

### 组件测试

使用 Vue Test Utils 进行组件测试：

```typescript
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

### 运行测试

```bash
# 运行所有测试
pnpm test

# 监听模式运行测试
pnpm test:watch

# 带覆盖率运行测试
pnpm test:coverage
```

## 10.4 文档维护

代码注释使用 JSDoc 风格，便于生成 API 文档。

## 10.5 代码检查与格式化

### ESLint

```bash
# 运行代码检查
pnpm lint

# 自动修复问题
pnpm lint:fix
```

### 类型检查

```bash
# TypeScript 类型检查
pnpm typecheck
```

## 10.6 性能注意事项

### 前端

- 使用 `v-memo` 优化大列表
- 懒加载路由和组件
- 使用正确的图片格式优化图片
- 使用 rollup-plugin-visualizer 监控包大小

### 后端

- 使用数据库连接池
- 实现缓存策略
- 使用分页处理大数据集
- 监控查询性能

## 10.7 安全最佳实践

- 绝不将密钥或 API 密钥提交到仓库
- 使用环境变量存储敏感配置
- 验证和清理所有用户输入
- 使用参数化查询防止 SQL 注入
- 实现正确的 CORS 配置
- 使用安全的密码哈希（bcrypt）
- 为 API 端点实现速率限制

## 10.8 贡献指南

1. Fork 仓库
2. 创建功能分支
3. 进行修改
4. 编写/更新测试
5. 确保所有测试通过
6. 提交 Pull Request
7. 等待代码审查
8. 根据反馈进行修改
9. 合并代码

感谢您对 Project Airi 的贡献！
