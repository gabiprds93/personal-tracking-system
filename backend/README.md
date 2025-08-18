# Personal Tracking System - Backend API

Backend API para el sistema de seguimiento personal de hábitos, metas y analytics.

## 🚀 Características

- **Autenticación JWT** - Sistema seguro de autenticación
- **Gestión de Hábitos** - CRUD completo para hábitos con completado diario
- **Gestión de Metas** - Metas con milestones y notas
- **Analytics** - Estadísticas y métricas de progreso
- **Sistema de Badges** - Insignias y logros
- **Desafíos** - Desafíos semanales con tareas
- **Base de Datos MongoDB** - Con Prisma ORM
- **Validación** - Con Zod
- **Seguridad** - Helmet, CORS, Rate Limiting
- **TypeScript** - Tipado completo

## 📋 Prerrequisitos

- Node.js 18+
- MongoDB 4.4+
- npm o pnpm

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
cd backend
```

2. **Instalar dependencias**
```bash
npm install
# o
pnpm install
```

3. **Configurar variables de entorno**
```bash
cp env.example .env
```

Editar `.env` con tus configuraciones:
```env
NODE_ENV=development
PORT=3001
DATABASE_URL="mongodb://localhost:27017/personal_tracking_db"
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
```

4. **Configurar la base de datos**
```bash
# Asegúrate de que MongoDB esté ejecutándose
# En macOS con Homebrew: brew services start mongodb-community
# En Ubuntu: sudo systemctl start mongod

# Generar cliente Prisma
npm run db:generate

# Sincronizar el esquema con MongoDB
npm run db:push

# Poblar con datos de ejemplo (opcional)
npm run db:seed
```

5. **Ejecutar el servidor**
```bash
# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

## 📚 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Obtener perfil (protegido)

### Hábitos
- `GET /api/habits` - Obtener todos los hábitos
- `GET /api/habits/today` - Obtener hábitos de hoy
- `GET /api/habits/:id` - Obtener hábito específico
- `POST /api/habits` - Crear hábito
- `PUT /api/habits/:id` - Actualizar hábito
- `DELETE /api/habits/:id` - Eliminar hábito
- `POST /api/habits/:id/complete` - Completar hábito

### Metas
- `GET /api/goals` - Obtener todas las metas
- `GET /api/goals/:id` - Obtener meta específica
- `POST /api/goals` - Crear meta
- `PUT /api/goals/:id` - Actualizar meta
- `DELETE /api/goals/:id` - Eliminar meta
- `POST /api/goals/:goalId/milestones` - Crear milestone
- `PUT /api/goals/:goalId/milestones/:milestoneId/toggle` - Toggle milestone
- `POST /api/goals/:goalId/notes` - Crear nota

### Analytics
- `GET /api/analytics/stats` - Estadísticas del usuario
- `GET /api/analytics/trends` - Tendencias de hábitos
- `GET /api/analytics/categories` - Distribución por categorías
- `GET /api/analytics/metrics` - Métricas clave

## 🗄️ Estructura de la Base de Datos

### Entidades Principales

#### User
- Información básica del usuario
- Autenticación y preferencias

#### Habit
- Hábitos del usuario
- Categorías, puntos, frecuencia

#### HabitCompletion
- Registro de completado de hábitos
- Notas y timestamps

#### Goal
- Metas del usuario
- Progreso, estado, fecha objetivo

#### Milestone
- Hitos dentro de las metas
- Estado de completado

#### Note
- Notas asociadas a metas o generales

#### Badge
- Insignias disponibles
- Requisitos y categorías

#### UserBadge
- Relación usuario-insignia
- Fecha de desbloqueo

#### Challenge
- Desafíos semanales
- Fechas y descripción

#### ChallengeTask
- Tareas dentro de los desafíos
- Objetivos y puntos

#### UserChallenge
- Participación en desafíos
- Progreso y completado

#### UserAnalytics
- Datos analíticos diarios
- Métricas de rendimiento

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo con hot reload
npm run build        # Compilar TypeScript
npm run start        # Servidor de producción

# Base de datos
npm run db:generate  # Generar cliente Prisma
npm run db:push      # Sincronizar esquema con MongoDB
npm run db:studio    # Abrir Prisma Studio
npm run db:seed      # Poblar con datos de ejemplo

# Linting y testing
npm run lint         # Ejecutar ESLint
npm run lint:fix     # Corregir errores de linting
npm run test         # Ejecutar tests
npm run test:watch   # Tests en modo watch
```

## 🛡️ Seguridad

- **JWT Authentication** - Tokens seguros con expiración
- **Password Hashing** - Bcrypt con salt rounds configurables
- **CORS** - Configuración de orígenes permitidos
- **Rate Limiting** - Protección contra ataques de fuerza bruta
- **Helmet** - Headers de seguridad HTTP
- **Input Validation** - Validación con Zod
- **SQL Injection Protection** - Prisma ORM

## 📊 Monitoreo

- **Morgan** - Logging de requests HTTP
- **Error Handling** - Manejo global de errores
- **Health Check** - Endpoint `/health` para monitoreo

## 🚀 Despliegue

### Variables de Entorno de Producción
```env
NODE_ENV=production
PORT=3001
DATABASE_URL="mongodb://..."
JWT_SECRET="..."
CORS_ORIGIN="https://yourdomain.com"
```

### Docker (opcional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.
