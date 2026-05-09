# 项目运行方式

## 9.1 环境准备

### Node.js 环境

项目要求 Node.js 18.0 或更高版本。建议使用 nvm（Node Version Manager）管理 Node.js 版本。

```bash
# 安装 nvm (macOS/Linux)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 安装并使用 Node.js 18
nvm install 18
nvm use 18
```

### pnpm 包管理器

项目使用 pnpm 作为包管理器：

```bash
npm install -g pnpm
```

### 数据库环境

项目依赖 PostgreSQL 数据库。需要安装 PostgreSQL 并创建项目所需的数据库实例。Redis 用于缓存和会话存储。

## 9.2 安装依赖

```bash
cd /path/to/ProjectAiri
pnpm install
```

pnpm workspace 会自动解析和安装所有子包和应用的依赖。

## 9.3 环境变量配置

在 `apps/server` 目录下创建 `.env` 文件：

```bash
# 数据库配置
DATABASE_URL=postgresql://user:password@localhost:5432/airi
DB_HOST=localhost
DB_PORT=5432
DB_NAME=airi
DB_USER=user
DB_PASSWORD=password

# Redis 配置
REDIS_URL=redis://localhost:6379
REDIS_HOST=localhost
REDIS_PORT=6379

# 认证配置
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=7d

# 第三方服务
STRIPE_SECRET_KEY=sk_test_...
OPENAI_API_KEY=sk-...
```

前端应用可能需要配置：
```bash
VITE_API_BASE_URL=http://localhost:3000
```

## 9.4 数据库初始化

```bash
cd apps/server
pnpm db:migrate
```

如有需要，填充初始数据：
```bash
pnpm db:seed
```

## 9.5 开发模式运行

### 启动后端服务

```bash
cd apps/server
pnpm dev
```

后端服务默认运行在 http://localhost:3000，支持热重载。

### 启动 Web 前端

```bash
cd apps/stage-web
pnpm dev
```

Web 前端默认运行在 http://localhost:5173。

### 启动桌面应用

```bash
cd apps/stage-tamagotchi
pnpm dev
```

桌面应用会打开独立的 Electron 窗口运行。

### 启动移动应用

```bash
cd apps/stage-pocket
pnpm dev
```

移动应用需要在模拟器或真机上运行。

## 9.6 构建生产版本

### 构建前端应用

```bash
cd apps/stage-web
pnpm build
# 输出：apps/stage-web/dist
```

### 构建桌面应用

```bash
cd apps/stage-tamagotchi
pnpm build
# 输出：apps/stage-tamagotchi/out
```

### 构建后端服务

```bash
cd apps/server
pnpm build
```

## 9.7 部署

### 前端部署

Web 前端构建产物可以部署到任何静态文件服务器，如 Nginx、Vercel、Netlify 等。

### 后端部署

后端服务需要 Node.js 运行环境。推荐使用 PM2 或 Docker 进行进程管理。

### Docker 支持

项目包含 Docker 配置：

```bash
# 构建 Docker 镜像
docker build -t airi-server -f apps/server/Dockerfile .

# 使用 docker-compose 运行
docker-compose -f apps/server/docker-compose.yml up
```
