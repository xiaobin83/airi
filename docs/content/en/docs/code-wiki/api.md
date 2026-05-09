# API Documentation

## 6.1 API Design Principles

The project follows RESTful API design principles with HTTP semantics and resource-oriented design.

### Request Format

- APIs accept JSON format request bodies
- Request header must set `Content-Type: application/json`
- Query parameters for pagination, sorting, and filtering
- Path parameters for specifying specific resources

### Response Format

APIs return unified JSON responses:

```json
{
  "code": 200,
  "message": "Success",
  "data": { ... }
}
```

Paginated queries return metadata including `total`, `page`, `pageSize`.

## 6.2 Authentication Endpoints

### User Login

```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "code": 200,
  "data": {
    "access_token": "eyJ...",
    "refresh_token": "eyJ...",
    "user": { ... }
  }
}
```

### User Registration

```
POST /auth/register
```

**Request Body:**
```json
{
  "username": "username",
  "email": "user@example.com",
  "password": "password123"
}
```

### Token Refresh

```
POST /auth/refresh
```

**Request Body:**
```json
{
  "refresh_token": "eyJ..."
}
```

### User Logout

```
POST /auth/logout
```

**Authentication:** Requires valid access token

## 6.3 Chat Endpoints

### Get Chat List

```
GET /chats
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `pageSize`: Items per page (default: 20)
- `characterId`: Filter by character ID (optional)

### Create Chat

```
POST /chats
```

**Request Body:**
```json
{
  "characterId": "uuid",
  "title": "Chat title (optional)"
}
```

### Get Chat Details

```
GET /chats/:id
```

**Path Parameters:**
- `id`: Chat ID

### Send Message

```
POST /chats/:id/messages
```

**Request Body:**
```json
{
  "content": "Message content"
}
```

## 6.4 Character Endpoints

### Get Character List

```
GET /characters
```

**Query Parameters:**
- `page`: Page number
- `pageSize`: Items per page
- `category`: Filter by category (optional)

### Get Character Details

```
GET /characters/:id
```

**Path Parameters:**
- `id`: Character ID

## 6.5 Payment Endpoints

### Create Subscription

```
POST /stripe/subscriptions
```

**Request Body:**
```json
{
  "planId": "plan_id",
  "paymentMethodId": "pm_..."
}
```

### Get Subscription Status

```
GET /stripe/subscriptions/current
```

### Cancel Subscription

```
DELETE /stripe/subscriptions/current
```

## 6.6 Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

## 6.7 Rate Limiting

API endpoints are rate-limited to prevent abuse. Limits vary by endpoint and user tier.
