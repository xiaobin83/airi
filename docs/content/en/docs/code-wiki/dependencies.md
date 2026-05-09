# Dependencies

## 8.1 Application Dependencies

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

## 8.2 Package Dependencies

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

## 8.3 External Dependencies

### Frontend

| Package | Version | Purpose |
|---------|---------|---------|
| vue | catalog | Core framework |
| vue-router | catalog | Routing |
| pinia | catalog | State management |
| @vueuse/core | catalog | Vue composables |
| tailwindcss/uno | catalog | Styling |
| vite | catalog | Build tool |

### Backend

| Package | Version | Purpose |
|---------|---------|---------|
| hono | catalog | Web framework |
| drizzle-orm | catalog | ORM |
| drizzle-kit | catalog | Migration |
| pg | catalog | PostgreSQL driver |
| ioredis | catalog | Redis client |
| stripe | catalog | Payment |

### Cross-platform

| Package | Version | Purpose |
|---------|---------|---------|
| electron | catalog | Desktop app |
| @capacitor/core | catalog | Mobile container |

## 8.4 Development Dependencies

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

## 8.5 Catalog Configuration

The project uses catalog mode for centralized dependency version management:

```json
// package.json
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

This ensures all packages use consistent versions across the monorepo.
