# Running the Project

## 9.1 Environment Preparation

### Node.js Environment

The project requires Node.js 18.0 or higher. It's recommended to use nvm (Node Version Manager) to manage Node.js versions.

```bash
# Install nvm (macOS/Linux)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node.js 18
nvm install 18
nvm use 18
```

### pnpm Package Manager

The project uses pnpm as the package manager:

```bash
npm install -g pnpm
```

### Database Environment

The project depends on PostgreSQL database:
- Install PostgreSQL locally or use a cloud service
- Create the required database instance
- Redis for caching and session storage

## 9.2 Install Dependencies

```bash
cd /path/to/ProjectAiri
pnpm install
```

pnpm workspace automatically resolves and installs dependencies for all sub-packages and apps.

## 9.3 Environment Variables Configuration

Create `.env` file in `apps/server`:

```bash
# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/airi
DB_HOST=localhost
DB_PORT=5432
DB_NAME=airi
DB_USER=user
DB_PASSWORD=password

# Redis Configuration
REDIS_URL=redis://localhost:6379
REDIS_HOST=localhost
REDIS_PORT=6379

# Authentication Configuration
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=7d

# Third-party Services
STRIPE_SECRET_KEY=sk_test_...
OPENAI_API_KEY=sk-...
```

Frontend apps may require:
```bash
VITE_API_BASE_URL=http://localhost:3000
```

## 9.4 Database Initialization

```bash
cd apps/server
pnpm db:migrate
```

If needed, seed initial data:
```bash
pnpm db:seed
```

## 9.5 Development Mode

### Start Backend Service

```bash
cd apps/server
pnpm dev
```

Backend service runs at http://localhost:3000 with hot reload support.

### Start Web Frontend

```bash
cd apps/stage-web
pnpm dev
```

Web frontend runs at http://localhost:5173 with browser auto-preview.

### Start Desktop App

```bash
cd apps/stage-tamagotchi
pnpm dev
```

Desktop app opens in a separate Electron window.

### Start Mobile App

```bash
cd apps/stage-pocket
pnpm dev
```

Mobile app runs on emulator or device using Capacitor sync.

## 9.6 Build Production Version

### Build Frontend Apps

```bash
cd apps/stage-web
pnpm build
# Output: apps/stage-web/dist
```

### Build Desktop App

```bash
cd apps/stage-tamagotchi
pnpm build
# Output: apps/stage-tamagotchi/out
```

### Build Backend Service

```bash
cd apps/server
pnpm build
```

Output is compiled JavaScript ready for Node.js deployment.

## 9.7 Deployment

### Frontend Deployment

Web frontend build output can be deployed to any static file server:
- Nginx
- Vercel
- Netlify
- Cloudflare Pages

Configure SPA routing fallback to serve index.html for all routes.

### Backend Deployment

Backend service requires Node.js runtime:
- Recommended: PM2 or Docker for process management
- Database and Redis need independent deployment or use cloud services

### Environment Variables

Production requires all necessary environment variables. Use dedicated config management or environment variable injection mechanisms.

## 9.8 Docker Support

The project includes Docker configuration:

```bash
# Build Docker image
docker build -t airi-server -f apps/server/Dockerfile .

# Run with docker-compose
docker-compose -f apps/server/docker-compose.yml up
```
