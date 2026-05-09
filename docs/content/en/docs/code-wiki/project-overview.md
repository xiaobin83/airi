# Project Overview

## 1.1 Project Features

Project Airi has the following core features:

- **Multi AI Provider Integration**: Supports integration with multiple AI model providers
- **Real-time Chat Interaction**: Provides real-time chat interaction functionality
- **Complete User Authentication & Subscription System**: Implements user authentication and subscription payment system
- **Cross-platform Application Support**: Supports web, desktop, and mobile platforms

## 1.2 Project Structure Overview

The project uses pnpm workspace to manage monorepo structure, mainly containing application layer (apps) and shared packages layer (packages).

```
ProjectAiri/
├── apps/                          # Application directory
│   ├── stage-web/                 # Web frontend application
│   ├── stage-tamagotchi/          # Desktop client application (Electron)
│   ├── stage-pocket/              # Mobile application (Capacitor)
│   ├── component-calling/         # Component calling demo
│   ├── ui-server-auth/            # UI server authentication
│   └── server/                    # Backend API service
├── packages/                      # Shared packages directory
│   ├── stage-ui/                  # UI component library
│   ├── server-runtime/            # Backend runtime library
│   ├── server-sdk/                # Backend SDK
│   └── ... (many other packages)
├── services/                      # External services
│   ├── computer-use-mcp/          # Computer use MCP service
│   ├── discord-bot/              # Discord bot service
│   ├── minecraft/                # Minecraft bot service
│   ├── satori-bot/               # Satori bot service
│   └── telegram-bot/             # Telegram bot service
└── docs/                          # Documentation
```

## 1.3 Application Descriptions

### Web Frontend (stage-web)

The core web frontend application that provides complete functional interface for users to access through browsers. Built with Vue 3 + TypeScript + Vite.

### Desktop Client (stage-tamagotchi)

Desktop client application based on Electron, providing an independent desktop experience for users. Supports Windows, macOS, and Linux.

### Mobile Application (stage-pocket)

Mobile application based on Capacitor, supporting both iOS and Android platforms. Optimized for small screen devices with touch gestures.

### Backend Service (server)

Backend API service that provides data storage, business logic processing, and third-party service integration. Built with Node.js + Hono + Drizzle ORM.

## 1.4 Shared Packages

### stage-ui

Project's self-developed Vue 3 component library providing unified UI components and tool functions.

### server-runtime

Provides infrastructure and utility functions required for backend service operation.

### server-sdk

SDK for frontend applications to call backend services, encapsulating API call details.

## 1.5 External Services

The project includes several external services for enhanced functionality:

- **computer-use-mcp**: Computer use capability with browser automation
- **discord-bot**: Discord integration bot
- **minecraft**: Minecraft game bot integration
- **satori-bot**: Satori platform bot
- **telegram-bot**: Telegram bot integration
