# API Endpoints - Personal Tracking System

## Base URL
```
http://localhost:3001/api
```

## Autenticación

### POST /auth/register
Registrar un nuevo usuario.

**Body:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "username": "username",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "jwt_token"
  },
  "message": "User registered successfully"
}
```

### POST /auth/login
Iniciar sesión.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "username": "username",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "jwt_token"
  },
  "message": "Login successful"
}
```

### GET /auth/profile
Obtener perfil del usuario (requiere autenticación).

**Headers:**
```
Authorization: Bearer jwt_token
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "username": "username",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

## Hábitos

### GET /habits
Obtener todos los hábitos del usuario.

**Query Parameters:**
- `category` (opcional): Filtrar por categoría
- `isActive` (opcional): Filtrar por estado activo

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "habit_id",
      "userId": "user_id",
      "name": "Exercise",
      "description": "Daily workout",
      "category": "Health",
      "points": 10,
      "frequency": "daily",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### GET /habits/today
Obtener hábitos de hoy con estado de completado.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "habit_id",
      "name": "Exercise",
      "category": "Health",
      "points": 10,
      "completed": true
    }
  ]
}
```

### GET /habits/:id
Obtener un hábito específico con sus completados.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "habit_id",
    "name": "Exercise",
    "description": "Daily workout",
    "category": "Health",
    "points": 10,
    "frequency": "daily",
    "isActive": true,
    "completions": [
      {
        "id": "completion_id",
        "completedAt": "2024-01-01T10:00:00.000Z",
        "notes": "Great workout!"
      }
    ]
  }
}
```

### POST /habits
Crear un nuevo hábito.

**Body:**
```json
{
  "name": "Exercise",
  "description": "Daily workout",
  "category": "Health",
  "points": 10,
  "frequency": "daily"
}
```

### PUT /habits/:id
Actualizar un hábito.

**Body:**
```json
{
  "name": "Updated Exercise",
  "description": "Updated description",
  "category": "Fitness",
  "points": 15,
  "isActive": false
}
```

### DELETE /habits/:id
Eliminar un hábito.

### POST /habits/:id/complete
Completar un hábito para hoy.

**Body:**
```json
{
  "notes": "Completed successfully!"
}
```

## Metas

### GET /goals
Obtener todas las metas del usuario.

**Query Parameters:**
- `category` (opcional): Filtrar por categoría
- `status` (opcional): Filtrar por estado
- `search` (opcional): Buscar en título y descripción

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "goal_id",
      "title": "Learn TypeScript",
      "description": "Master TypeScript in 3 months",
      "category": "Learning",
      "targetDate": "2024-03-01T00:00:00.000Z",
      "progress": 60,
      "status": "ACTIVE",
      "milestones": [
        {
          "id": "milestone_id",
          "title": "Complete basics",
          "completed": true,
          "order": 0
        }
      ],
      "notes": [
        {
          "id": "note_id",
          "content": "Making good progress!",
          "createdAt": "2024-01-01T00:00:00.000Z"
        }
      ]
    }
  ]
}
```

### GET /goals/:id
Obtener una meta específica con milestones y notas.

### POST /goals
Crear una nueva meta.

**Body:**
```json
{
  "title": "Learn TypeScript",
  "description": "Master TypeScript in 3 months",
  "category": "Learning",
  "targetDate": "2024-03-01T00:00:00.000Z",
  "milestones": [
    "Complete basics",
    "Build a project",
    "Advanced concepts"
  ]
}
```

### PUT /goals/:id
Actualizar una meta.

**Body:**
```json
{
  "title": "Updated Goal",
  "progress": 75,
  "status": "COMPLETED"
}
```

### DELETE /goals/:id
Eliminar una meta.

### POST /goals/:goalId/milestones
Crear un nuevo milestone.

**Body:**
```json
{
  "title": "New milestone",
  "order": 1
}
```

### PUT /goals/:goalId/milestones/:milestoneId/toggle
Toggle el estado de completado de un milestone.

### POST /goals/:goalId/notes
Crear una nueva nota para una meta.

**Body:**
```json
{
  "content": "This is a note about the goal"
}
```

## Analytics

### GET /analytics/stats
Obtener estadísticas generales del usuario.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalPoints": 1250,
    "level": 13,
    "currentStreak": 7,
    "longestStreak": 15,
    "completionRate": 85,
    "todayCompleted": 3,
    "todayTotal": 5,
    "habitsCompleted": 45,
    "goalsCompleted": 2,
    "badgesEarned": 8,
    "joinedDate": "2024-01-01T00:00:00.000Z"
  }
}
```

### GET /analytics/trends
Obtener tendencias de hábitos.

**Query Parameters:**
- `timeRange` (opcional): "7d", "30d", "90d", "1y" (default: "30d")

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "date": "2024-01-01",
      "completed": 3,
      "total": 5,
      "rate": 60
    }
  ]
}
```

### GET /analytics/categories
Obtener distribución por categorías.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "name": "Health",
      "value": 25,
      "color": "#3B82F6"
    }
  ]
}
```

### GET /analytics/metrics
Obtener métricas clave.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "today-completions",
      "title": "Today's Completions",
      "value": 3,
      "change": "+2",
      "changeType": "positive",
      "icon": "check-circle",
      "iconColor": "text-green-500"
    }
  ]
}
```

## Códigos de Estado HTTP

- `200` - OK
- `201` - Created
- `400` - Bad Request (validación fallida)
- `401` - Unauthorized (token inválido o faltante)
- `404` - Not Found
- `500` - Internal Server Error

## Headers Requeridos

Para endpoints protegidos:
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## Formato de Respuesta

Todas las respuestas siguen este formato:

```json
{
  "success": true|false,
  "data": <response_data>,
  "message": "Optional message",
  "error": "Error message if success is false"
}
```

## Paginación

Para endpoints que soporten paginación:

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```
