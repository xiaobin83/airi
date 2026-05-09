# Project Airi Code Wiki

Welcome to the Project Airi code wiki. This section provides comprehensive documentation about the project's architecture, technical stack, and implementation details.

## Overview

Project Airi is a modern AI character interaction platform that uses a monorepo architecture to organize code. The project supports multi-platform applications including web frontend, desktop client, and mobile app, while providing complete backend service support.

### Project Structure

```
ProjectAiri/
├── apps/                          # Application directory
│   ├── stage-web/                 # Web frontend application
│   ├── stage-tamagotchi/          # Desktop client application (Electron)
│   ├── stage-pocket/              # Mobile application (Capacitor)
│   └── server/                    # Backend API service
├── packages/                      # Shared packages directory
│   ├── stage-ui/                  # UI component library
│   ├── server-runtime/            # Backend runtime library
│   └── server-sdk/                # Backend SDK
└── package.json                   # Root package configuration
```

## Navigation

- [Project Overview](./project-overview.md) - Core features and project structure
- [Tech Stack](./tech-stack.md) - Frontend, backend, and cross-platform technologies
- [Architecture Design](./architecture.md) - System architecture and design patterns
- [Main Modules](./modules.md) - Key application modules details
- [Database Models](./database.md) - Database schema and data models
- [API Documentation](./api.md) - RESTful API endpoints and specifications
- [Key Components](./components.md) - Important classes and functions
- [Dependencies](./dependencies.md) - Package dependencies management
- [Running the Project](./running.md) - Development and production setup
- [Development Guide](./guide.md) - Code standards and best practices
