# 主要模块详解

## 4.1 Web 前端应用（stage-web）

stage-web 是项目的核心 Web 前端应用，提供用户在浏览器中访问的完整功能界面。

### 应用入口与初始化

应用的入口文件位于 `apps/stage-web/src/main.ts`，负责初始化 Vue 应用实例、配置路由和挂载根组件。

### 核心功能模块

- 用户注册登录
- 角色浏览选择
- 实时聊天交互
- 用户设置管理

### API 通信

前端通过 `packages/stage-ui/src/composables/api.ts` 中定义的 API 调用函数与后端进行通信。

## 4.2 桌面客户端应用（stage-tamagotchi）

stage-tamagotchi 是基于 Electron 开发的桌面客户端应用。

### 主进程与渲染进程

- **主进程** (`main/index.ts`): 创建应用窗口、管理系统托盘、处理系统级事件和 IPC 通信
- **渲染进程**: 运行 Vue 3 应用界面

### 窗口与系统集成

- 最小化、最大化、关闭等标准操作
- 自定义标题栏支持
- 系统托盘功能
- 深色/浅色主题切换

## 4.3 移动端应用（stage-pocket）

stage-pocket 是基于 Capacitor 构建的移动端应用，支持 iOS 和 Android 双平台。

### 移动端适配

- 小屏幕设备布局优化
- 更大的触摸目标
- 手势支持：滑动返回、长按菜单
- 离线缓存支持

## 4.4 后端服务（server）

server 是项目的后端 API 服务。

### 路由模块

- `auth/`: 用户认证 - 登录、注册、登出、令牌刷新
- `chats/`: 聊天功能 - 创建聊天、获取历史、发送消息
- `flux/`: Flux 业务逻辑
- `stripe/`: 支付 - 订阅管理

### 服务模块

- `chats.ts`: 聊天消息处理，包括消息存储、上下文管理、AI 回复生成
- `flux.ts`: Flux 核心业务逻辑实现

### 中间件

- `auth.ts`: JWT 令牌验证
- `cors.ts`: 跨域资源共享
- `error.ts`: 全局错误处理

## 4.5 UI 组件库（stage-ui）

stage-ui 是项目自研的 Vue 3 组件库。

### 组件目录结构

- **基础组件**: Button、Input、Modal、Card 等
- **业务组件**: ChatWindow、CharacterCard、MessageBubble 等
- **布局组件**: Container、Grid、Flex 等

### 状态管理

- `auth`: 用户登录状态和认证信息
- `chat`: 聊天会话和消息列表
- `character`: 角色数据和配置

### 组合式函数

- `api.ts`: 统一的 API 调用方法
- `auth.ts`: 认证相关的辅助函数

## 4.6 后端运行时库（server-runtime）

提供后端服务运行所需的基础设施和工具函数。

### 工具函数

- 日志记录
- 性能监控
- 错误追踪

## 4.7 后端 SDK（server-sdk）

供前端应用调用的后端服务 SDK。

### 使用示例

```typescript
import { authApi } from '@proj-airi/server-sdk'

const result = await authApi.login({ email, password })
```
