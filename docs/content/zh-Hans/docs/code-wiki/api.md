# API 接口文档

## 6.1 API 设计规范

项目采用 RESTful API 设计规范，遵循 HTTP 语义和资源导向的设计原则。

### 请求格式

- API 接受 JSON 格式的请求体
- 请求头需设置 `Content-Type: application/json`
- 查询参数用于分页、排序和过滤
- 路径参数用于指定特定资源

### 响应格式

API 返回统一格式的 JSON 响应：

```json
{
  "code": 200,
  "message": "Success",
  "data": { ... }
}
```

分页查询返回带有分页元数据：`total`、`page`、`pageSize`。

## 6.2 认证相关接口

### 用户登录

```
POST /auth/login
```

**请求体：**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### 用户注册

```
POST /auth/register
```

**请求体：**
```json
{
  "username": "username",
  "email": "user@example.com",
  "password": "password123"
}
```

### 令牌刷新

```
POST /auth/refresh
```

**请求体：**
```json
{
  "refresh_token": "eyJ..."
}
```

### 用户登出

```
POST /auth/logout
```

**认证**：需要有效的访问令牌

## 6.3 聊天相关接口

### 获取聊天列表

```
GET /chats
```

**查询参数：**
- `page`: 页码（默认：1）
- `pageSize`: 每页条数（默认：20）
- `characterId`: 按角色 ID 筛选（可选）

### 创建聊天

```
POST /chats
```

**请求体：**
```json
{
  "characterId": "uuid",
  "title": "聊天标题（可选）"
}
```

### 获取聊天详情

```
GET /chats/:id
```

### 发送消息

```
POST /chats/:id/messages
```

**请求体：**
```json
{
  "content": "消息内容"
}
```

## 6.4 角色相关接口

### 获取角色列表

```
GET /characters
```

### 获取角色详情

```
GET /characters/:id
```

## 6.5 支付相关接口

### 创建订阅

```
POST /stripe/subscriptions
```

### 获取订阅状态

```
GET /stripe/subscriptions/current
```

### 取消订阅

```
DELETE /stripe/subscriptions/current
```

## 6.6 错误码

| 状态码 | 描述 |
|--------|------|
| 200 | 成功 |
| 201 | 已创建 |
| 400 | 请求错误 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 404 | 未找到 |
| 500 | 服务器错误 |

## 6.7 速率限制

API 端点有速率限制以防止滥用。限制因端点和用户等级而异。
