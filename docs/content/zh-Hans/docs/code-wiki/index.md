# Project Airi 代码维基

欢迎来到 Project Airi 代码维基。本节提供有关项目架构、技术栈和实现细节的完整文档。

## 概述

Project Airi 是一个现代化的 AI 角色交互平台，采用 monorepo（单体仓库）架构组织代码。项目支持多端应用，包括 Web 前端、桌面客户端和移动应用，并提供完整的后端服务支持。

## 项目结构

```
ProjectAiri/
├── apps/                          # 应用程序目录
│   ├── stage-web/                 # Web 前端应用
│   ├── stage-tamagotchi/          # 桌面客户端应用（Electron）
│   ├── stage-pocket/              # 移动端应用（Capacitor）
│   └── server/                    # 后端 API 服务
├── packages/                      # 共享包目录
│   ├── stage-ui/                  # UI 组件库
│   ├── server-runtime/            # 后端运行时库
│   └── server-sdk/                # 后端 SDK
└── package.json                   # 根包配置文件
```

## 导航目录

- [项目概述](./project-overview.md) - 核心功能和项目结构
- [技术栈](./tech-stack.md) - 前端、后端和跨平台技术
- [架构设计](./architecture.md) - 系统架构和设计模式
- [主要模块](./modules.md) - 核心应用模块详解
- [数据库模型](./database.md) - 数据库结构和数据模型
- [API 接口文档](./api.md) - RESTful API 端点和规范
- [关键组件](./components.md) - 重要的类和函数
- [依赖关系](./dependencies.md) - 包依赖管理
- [项目运行](./running.md) - 开发环境配置和生产部署
- [开发指南](./guide.md) - 代码规范和最佳实践
