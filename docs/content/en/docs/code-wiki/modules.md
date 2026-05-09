# Main Modules

## 4.1 Web Frontend Application (stage-web)

stage-web is the core web frontend application, providing complete functional interface for users to access through browsers.

### Application Entry & Initialization

The application entry file is located at `apps/stage-web/src/main.ts`, responsible for initializing Vue app instance, configuring routes, and mounting root component. Root component App.vue defines overall layout structure including navbar, sidebar, and main content area.

### Core Features

- User registration and login
- Character browsing and selection
- Real-time chat interaction
- User settings management

### API Communication

Frontend communicates with backend through API call functions defined in `packages/stage-ui/src/composables/api.ts`. All API requests go through unified error handling and response interception, supporting request cancellation and retry mechanisms.

## 4.2 Desktop Client Application (stage-tamagotchi)

stage-tamagotchi is a desktop client application based on Electron, providing independent desktop experience for users.

### Main Process & Renderer Process

The application uses Electron's main process and renderer process separation architecture:
- **Main Process** (`main/index.ts`): Creates app windows, manages system tray, handles system-level events and IPC communication
- **Renderer Process**: Runs Vue 3 app interface, responsible for UI display and interaction

### Window & System Integration

- Standard operations: minimize, maximize, close
- Custom titlebar support
- System tray functionality
- Dark/light theme switching

## 4.3 Mobile Application (stage-pocket)

stage-pocket is a mobile application based on Capacitor, supporting iOS and Android platforms.

### Capacitor Configuration

Native configuration managed through `capacitor.config.ts`, including app ID, name, version, and platform-specific settings.

### Mobile Adaptation

- Layout optimization for small screens
- Larger touch targets
- Gesture support: swipe-back, long-press menu
- Offline caching support

## 4.4 Backend Service (server)

server is the backend API service providing data storage, business logic processing, and third-party service integration.

### Application Entry

Backend application entry is located at `apps/server/src/app.ts`, configuring Express-style middleware pipeline, Hono routing system, and global error handling.

### Route Modules

Routes are defined in `apps/server/src/routes`:
- `auth/`: User authentication - login, register, logout, token refresh
- `chats/`: Chat functionality - create chat, get history, send messages
- `flux/`: Flux business logic
- `stripe/`: Payment routes - subscription management

### Service Modules

Business logic encapsulated in `apps/server/src/services`:
- `chats.ts`: Chat message processing including message storage, context management, AI reply generation
- `flux.ts`: Flux core business logic implementation

### Middleware

Defined in `apps/server/src/middlewares`:
- `auth.ts`: JWT token verification
- `cors.ts`: Cross-origin resource sharing
- `error.ts`: Global error handling

## 4.5 UI Component Library (stage-ui)

stage-ui is the project's self-developed Vue 3 component library.

### Component Structure

Components organized by function in `packages/stage-ui/src/components`:
- **Basic Components**: Button, Input, Modal, Card
- **Business Components**: ChatWindow, CharacterCard, MessageBubble
- **Layout Components**: Container, Grid, Flex

### State Management

Stores in `stores` directory:
- `auth`: User login state and authentication info
- `chat`: Chat sessions and message lists
- `character`: Character data and configuration

### Composables

Composable functions in `composables` directory:
- `api.ts`: Unified API calling methods
- `auth.ts`: Authentication helper functions

## 4.6 Backend Runtime Library (server-runtime)

Provides infrastructure and utility functions for backend service operation.

### Runtime Configuration

Package entry exports runtime configuration and initialization functions.

### Utilities

- Logging
- Performance monitoring
- Error tracking

## 4.7 Backend SDK (server-sdk)

SDK for frontend applications to call backend services.

### SDK Design

- TypeScript package export with typed API methods
- Complete IDE type hint support
- Request building, authentication, error handling

### Usage Example

```typescript
import { authApi } from '@proj-airi/server-sdk'

// Login
const result = await authApi.login({ email, password })
```
