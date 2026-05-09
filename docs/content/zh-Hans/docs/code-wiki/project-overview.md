# 项目概述

## 1.1 项目特点

Project Airi 具备以下核心特性：

- **多 AI 提供商集成**：支持多种 AI 模型提供商的集成
- **实时聊天交互**：提供实时聊天交互功能
- **完整的用户认证与订阅体系**：实现用户认证和订阅支付系统
- **跨平台应用支持**：支持 Web、桌面和移动平台

## 1.2 项目结构总览

项目采用 pnpm workspace 管理的 monorepo 结构，主要包含应用层（apps）和共享包层（packages）。

```
ProjectAiri/
├── apps/                          # 应用程序目录
│   ├── stage-web/                 # Web 前端应用
│   ├── stage-tamagotchi/          # 桌面客户端应用（Electron）
│   ├── stage-pocket/              # 移动端应用（Capacitor）
│   ├── component-calling/         # 组件调用演示
│   ├── ui-server-auth/            # UI 服务器认证
│   └── server/                    # 后端 API 服务
├── packages/                      # 共享包目录
│   ├── stage-ui/                  # UI 组件库
│   ├── server-runtime/            # 后端运行时库
│   ├── server-sdk/                # 后端 SDK
│   └── ... (其他共享包)
├── services/                      # 外部服务
│   ├── computer-use-mcp/          # 计算机使用 MCP 服务
│   ├── discord-bot/              # Discord 机器人服务
│   ├── minecraft/                # Minecraft 机器人服务
│   ├── satori-bot/               # Satori 机器人服务
│   └── telegram-bot/             # Telegram 机器人服务
└── docs/                          # 文档目录
```

## 1.3 应用说明

### Web 前端（stage-web）

核心 Web 前端应用，提供用户在浏览器中访问的完整功能界面。基于 Vue 3 + TypeScript + Vite 构建。

### 桌面客户端（stage-tamagotchi）

基于 Electron 开发的桌面客户端应用，为用户提供独立的桌面使用体验。支持 Windows、macOS 和 Linux 系统。

### 移动端应用（stage-pocket）

基于 Capacitor 构建的移动端应用，支持 iOS 和 Android 双平台。针对小屏幕设备进行了布局优化，支持手势操作。

### 后端服务（server）

后端 API 服务，提供数据存储、业务逻辑处理和第三方服务集成。基于 Node.js + Hono + Drizzle ORM 构建。

## 1.4 共享包

### stage-ui

项目自研的 Vue 3 组件库，提供统一的 UI 组件和工具函数。

### server-runtime

提供后端服务运行所需的基础设施和工具函数。

### server-sdk

供前端应用调用的后端服务 SDK，封装了 API 调用细节。

## 1.5 外部服务

项目包含多个外部服务以增强功能：

- **computer-use-mcp**：具备浏览器自动化能力的计算机使用服务
- **discord-bot**：Discord 集成机器人
- **minecraft**：Minecraft 游戏机器人集成
- **satori-bot**：Satori 平台机器人
- **telegram-bot**：Telegram 机器人集成
