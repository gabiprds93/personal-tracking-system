# Personal Tracking System 🚀

Sistema completo de seguimiento personal para hábitos, metas y métricas de bienestar con gamificación motivacional.

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Prerrequisitos](#-prerrequisitos)
- [Instalación Rápida](#-instalación-rápida)
- [Configuración Paso a Paso](#-configuración-paso-a-paso)
- [Uso de la Aplicación](#-uso-de-la-aplicación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Desarrollo](#-desarrollo)
- [Troubleshooting](#-troubleshooting)
- [Contribución](#-contribución)

## 🎯 Descripción

**Personal Tracking System** es una aplicación full-stack diseñada para ayudar a los usuarios a rastrear y mejorar sus hábitos diarios, establecer y alcanzar metas personales, y visualizar su progreso a través de analytics detallados. Incluye un sistema de gamificación con puntos, niveles, insignias y desafíos semanales para mantener la motivación.

## ✨ Características

### 🏠 **Dashboard Interactivo**
- Panel principal con métricas en tiempo real
- Resumen de hábitos del día
- Progreso de metas activas
- Logros recientes y celebraciones
- Mensajes motivacionales personalizados

### 📋 **Gestión de Hábitos**
- Crear, editar y eliminar hábitos
- Categorización por colores y íconos
- Sistema de puntos y dificultad
- Seguimiento de rachas (streaks)
- Completado diario con animaciones

### 🎯 **Gestión de Metas**
- Metas con fechas objetivo
- Sistema de milestones
- Notas de progreso
- Estados: activa, completada, pausada
- Tracking visual de avance

### 📊 **Analytics Avanzados**
- Gráficos de tendencias y progreso
- Análisis de consistencia
- Distribución por categorías
- Métricas de rendimiento
- Predicciones basadas en datos históricos

### 🏆 **Sistema de Gamificación**
- Sistema de puntos y niveles
- Insignias desbloqueables
- Desafíos semanales
- Logros por categorías
- Rankings de progreso

### 👤 **Perfil y Configuración**
- Perfil personalizado
- Estadísticas detalladas
- Configuración de preferencias
- Historial de logros

## 🛠️ Stack Tecnológico

### **Frontend**
- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI**: shadcn/ui (Radix UI + Tailwind)
- **Estado**: React Context API
- **Formularios**: React Hook Form + Zod
- **Gráficos**: Recharts
- **Temas**: next-themes

### **Backend**
- **Runtime**: Node.js 18+
- **Framework**: Express.js con TypeScript
- **Base de Datos**: MongoDB con Prisma ORM
- **Autenticación**: JWT + bcryptjs
- **Validación**: Zod
- **Seguridad**: Helmet, CORS, Rate Limiting
- **Testing**: Jest + Supertest

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js 18+** - [Descargar aquí](https://nodejs.org/)
- **npm** (viene con Node.js)
- **MongoDB** - Ver [guía de instalación](#instalación-de-mongodb)
- **Git** - [Descargar aquí](https://git-scm.com/)

### Instalación de MongoDB

#### **macOS (Homebrew)**
```bash
# Instalar MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Iniciar MongoDB
brew services start mongodb-community
```

#### **Ubuntu/Debian**
```bash
# Importar clave
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Agregar repositorio
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Instalar
sudo apt-get update
sudo apt-get install -y mongodb-org

# Iniciar servicio
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### **Windows**
1. Descargar MongoDB Community Server desde [mongodb.com](https://www.mongodb.com/try/download/community)
2. Ejecutar el instalador y seguir las instrucciones
3. MongoDB se iniciará automáticamente como servicio

#### **Docker (Alternativa rápida)**
```bash
docker run -d --name mongodb -p 27017:27017 mongo:6.0
```

## ⚡ Instalación Rápida

Si tienes MongoDB ejecutándose, puedes usar este script para configuración automática:

```bash
# Clonar repositorio
git clone <repository-url>
cd personal-tracking-system

# Configurar backend
cd backend
npm install
cp env.example .env
npm run db:generate
npm run db:push
npm run db:seed

# Configurar frontend (en nueva terminal)
cd ../frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:3001/api" > .env.local

# Ejecutar aplicación (en terminales separadas)
cd ../backend && npm run dev    # Terminal 1
cd frontend && npm run dev      # Terminal 2
```

## 🔧 Configuración Paso a Paso

### 1. **Clonar el Repositorio**
```bash
git clone <repository-url>
cd personal-tracking-system
```

### 2. **Configurar Backend**

#### a) Instalar dependencias
```bash
cd backend
npm install
```

#### b) Configurar variables de entorno
```bash
# Copiar archivo de ejemplo
cp env.example .env

# Editar .env con tus configuraciones
nano .env
```

**Configuración básica del .env:**
```env
# Entorno
NODE_ENV=development
PORT=3001

# Base de datos (MongoDB local)
DATABASE_URL="mongodb://localhost:27017/personal_tracking_db"

# JWT (Cambiar por una clave segura)
JWT_SECRET=mi-clave-super-secreta-de-al-menos-32-caracteres
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Seguridad
BCRYPT_ROUNDS=12
```

#### c) Configurar base de datos
```bash
# Generar cliente Prisma
npm run db:generate

# Sincronizar esquema con MongoDB
npm run db:push

# Poblar con datos de ejemplo
npm run db:seed
```

#### d) Ejecutar backend
```bash
npm run dev
```

✅ **Backend funcionando en**: http://localhost:3001

### 3. **Configurar Frontend**

#### a) Navegar y instalar dependencias
```bash
cd ../frontend
npm install
```

#### b) Configurar variables de entorno
```bash
# Crear archivo de entorno
echo "NEXT_PUBLIC_API_URL=http://localhost:3001/api" > .env.local
```

#### c) Ejecutar frontend
```bash
npm run dev
```

✅ **Frontend funcionando en**: http://localhost:3000

### 4. **Verificar Instalación**

1. **Abrir**: http://localhost:3000
2. **Crear cuenta** o usar credenciales de prueba:
   - Email: `test@example.com`
   - Password: `password123`

## 🎮 Uso de la Aplicación

### **Primera vez usando la aplicación:**

1. **Registro**: Crea tu cuenta desde la página de login
2. **Dashboard**: Explora el panel principal
3. **Crear Hábitos**: Ve a la sección "Hábitos" y crea tu primer hábito
4. **Establecer Metas**: Ve a "Metas" y define tus objetivos
5. **Completar Actividades**: Marca hábitos como completados
6. **Ver Progreso**: Revisa tus estadísticas en "Analytics"
7. **Perfil**: Explora tu progreso y logros en "Perfil"

### **Flujo diario típico:**
1. Abrir dashboard
2. Revisar hábitos pendientes del día
3. Marcar hábitos completados
4. Ver celebraciones y puntos ganados
5. Revisar progreso de metas
6. Añadir notas si es necesario

## 📁 Estructura del Proyecto

```
personal-tracking-system/
├── 📁 backend/                 # API Backend
│   ├── 📁 src/
│   │   ├── 📁 controllers/    # Lógica de negocio
│   │   ├── 📁 routes/         # Rutas de API
│   │   ├── 📁 middleware/     # Middleware personalizado
│   │   ├── 📁 config/         # Configuración
│   │   └── 📄 index.ts        # Entry point
│   ├── 📁 prisma/
│   │   └── 📄 schema.prisma   # Esquema de base de datos
│   ├── 📄 package.json
│   └── 📄 env.example
├── 📁 frontend/               # Aplicación Next.js
│   ├── 📁 src/
│   │   ├── 📁 app/           # Pages (App Router)
│   │   ├── 📁 components/    # Componentes React
│   │   ├── 📁 contexts/      # Contextos globales
│   │   ├── 📁 hooks/         # Custom hooks
│   │   └── 📁 lib/          # Utilidades
│   ├── 📄 package.json
│   └── 📄 components.json
├── 📄 README.md              # Este archivo
└── 📄 CLAUDE.md             # Guía para Claude Code
```

## 🔗 API Endpoints

### **Autenticación**
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Obtener perfil

### **Hábitos**
- `GET /api/habits` - Obtener hábitos
- `POST /api/habits` - Crear hábito
- `POST /api/habits/:id/complete` - Completar hábito
- `PUT /api/habits/:id` - Actualizar hábito
- `DELETE /api/habits/:id` - Eliminar hábito

### **Metas**
- `GET /api/goals` - Obtener metas
- `POST /api/goals` - Crear meta
- `PUT /api/goals/:id` - Actualizar meta
- `DELETE /api/goals/:id` - Eliminar meta

### **Analytics**
- `GET /api/analytics/stats` - Estadísticas del usuario
- `GET /api/analytics/trends` - Tendencias de hábitos
- `GET /api/analytics/metrics` - Métricas clave

### **Insignias**
- `GET /api/badges` - Obtener insignias disponibles
- `GET /api/badges/user` - Obtener insignias del usuario

## 👨‍💻 Desarrollo

### **Scripts de Backend**
```bash
cd backend

npm run dev          # Desarrollo con hot reload
npm run build        # Compilar TypeScript
npm run start        # Servidor de producción
npm run lint         # Ejecutar ESLint
npm run test         # Ejecutar tests
npm run db:generate  # Generar cliente Prisma
npm run db:push      # Sincronizar esquema
npm run db:seed      # Datos de ejemplo
npm run db:studio    # Abrir Prisma Studio
```

### **Scripts de Frontend**
```bash
cd frontend

npm run dev          # Desarrollo con hot reload
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Ejecutar ESLint
```

### **Herramientas de Desarrollo**

#### **Prisma Studio** (Explorar base de datos)
```bash
cd backend
npm run db:studio
```
Abre: http://localhost:5555

#### **MongoDB Compass** (GUI para MongoDB)
- Conectar a: `mongodb://localhost:27017`
- Base de datos: `personal_tracking_db`

## 🐛 Troubleshooting

### **Error: "ECONNREFUSED" (MongoDB)**
```bash
# Verificar si MongoDB está ejecutándose
# macOS
brew services list | grep mongodb

# Ubuntu
sudo systemctl status mongod

# Iniciar MongoDB si no está ejecutándose
# macOS
brew services start mongodb-community

# Ubuntu
sudo systemctl start mongod
```

### **Error: "Port 3000/3001 already in use"**
```bash
# Encontrar proceso usando el puerto
lsof -i :3000  # o :3001

# Terminar proceso
kill -9 <PID>

# O usar puerto diferente
PORT=3002 npm run dev
```

### **Error: "Prisma Client not generated"**
```bash
cd backend
npm run db:generate
```

### **Error: "Database not found"**
```bash
cd backend
npm run db:push
npm run db:seed
```

### **Frontend no se conecta al Backend**
- Verificar que el backend esté ejecutándose en puerto 3001
- Verificar variable de entorno en `.env.local`:
  ```
  NEXT_PUBLIC_API_URL=http://localhost:3001/api
  ```

### **Problemas de CORS**
- Verificar `CORS_ORIGIN` en `backend/.env`
- Debe ser: `http://localhost:3000`

## 🚀 Despliegue

### **Variables de Entorno de Producción**

#### Backend
```env
NODE_ENV=production
PORT=3001
DATABASE_URL="mongodb+srv://user:pass@cluster.mongodb.net/db"
JWT_SECRET="clave-super-secreta-para-produccion"
CORS_ORIGIN=https://tu-frontend.vercel.app
```

#### Frontend
```env
NEXT_PUBLIC_API_URL=https://tu-backend.railway.app/api
```

### **Plataformas Recomendadas**
- **Frontend**: Vercel, Netlify
- **Backend**: Railway, Render, Heroku
- **Base de Datos**: MongoDB Atlas

## 🤝 Contribución

### **Flujo de Trabajo**
1. Fork del proyecto
2. Crear rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'Añadir nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

### **Estándares de Código**
- Usar TypeScript estricto
- Seguir convenciones ESLint
- Documentar componentes
- Escribir tests para nuevas funcionalidades

## 🆘 Soporte

- **Issues**: Reportar problemas en GitHub Issues
- **Documentación**: Ver `CLAUDE.md` para detalles técnicos
- **API**: Ver `backend/API_ENDPOINTS.md`
- **MongoDB**: Ver `backend/MONGODB_SETUP.md`

---

¡Gracias por usar **Personal Tracking System**! 🚀 

**¿Listo para transformar tus hábitos y alcanzar tus metas?** 💪