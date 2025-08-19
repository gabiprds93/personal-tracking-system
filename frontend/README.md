# Personal Tracker - Frontend

Sistema de seguimiento personal para hábitos, metas y métricas de bienestar con gamificación motivacional.

## 🚀 Características

- **Dashboard Interactivo** - Panel principal con métricas en tiempo real
- **Gestión de Hábitos** - Creación, seguimiento y completado de hábitos
- **Gestión de Metas** - Metas con milestones y notas de progreso
- **Analytics Avanzados** - Visualización de estadísticas y tendencias
- **Sistema de Logros** - Insignias y puntos de gamificación
- **Perfil de Usuario** - Estadísticas personalizadas y progreso
- **Modo Oscuro/Claro** - Tema adaptativo con soporte del sistema
- **Responsive Design** - Optimizado para escritorio y móvil
- **Interfaz en Español** - Completamente localizada

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **Iconos**: Lucide React
- **Formularios**: React Hook Form + Zod
- **Estado Global**: React Context API
- **Gráficos**: Recharts
- **Fechas**: date-fns
- **Temas**: next-themes
- **Fuentes**: Geist + Manrope

## 📋 Prerrequisitos

- Node.js 18+
- npm
- Backend API ejecutándose en http://localhost:3001

## 🚀 Instalación y Configuración

1. **Navegar al directorio del frontend**
```bash
cd frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en http://localhost:3000

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev      # Servidor de desarrollo con hot reload
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Ejecutar ESLint
```

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Dashboard principal
│   │   ├── layout.tsx         # Layout raíz con providers
│   │   ├── globals.css        # Estilos globales
│   │   ├── login/             # Páginas de autenticación
│   │   ├── habits/            # Página de hábitos
│   │   ├── goals/             # Página de metas
│   │   ├── analytics/         # Página de analytics
│   │   └── profile/           # Página de perfil
│   ├── components/            # Componentes React
│   │   ├── ui/               # shadcn/ui components
│   │   ├── auth/             # Componentes de autenticación
│   │   ├── dashboard/        # Componentes del dashboard
│   │   ├── habits/           # Componentes de hábitos
│   │   ├── goals/            # Componentes de metas
│   │   ├── analytics/        # Componentes de analytics
│   │   ├── profile/          # Componentes de perfil
│   │   ├── sidebar.tsx       # Barra lateral principal
│   │   ├── navigation.tsx    # Navegación móvil
│   │   └── layout-wrapper.tsx # Wrapper de layout
│   ├── contexts/             # React Contexts
│   │   ├── auth-context.tsx  # Estado de autenticación
│   │   └── stats-context.tsx # Estado de estadísticas
│   ├── hooks/                # Custom hooks globales
│   ├── lib/                  # Utilidades
│   │   ├── api.ts           # Cliente API
│   │   ├── utils.ts         # Utilidades generales
│   │   ├── storage.ts       # Utilidades de almacenamiento
│   │   └── validations.ts   # Esquemas de validación Zod
│   └── styles/              # Estilos adicionales
├── public/                  # Archivos estáticos
├── components.json         # Configuración shadcn/ui
├── next.config.mjs        # Configuración Next.js
├── tailwind.config.js     # Configuración Tailwind CSS
├── tsconfig.json          # Configuración TypeScript
└── package.json           # Dependencias y scripts
```

### Patrones de Arquitectura

#### **Componentes Modulares**
Cada funcionalidad está organizada en módulos con:
- `[feature].tsx` - Componente principal
- `[feature].types.ts` - Interfaces TypeScript
- `components/` - Sub-componentes
- `hooks/use-[feature].ts` - Hook personalizado
- `index.ts` - Exports del módulo

#### **Gestión de Estado**
- **React Context** para estado global (auth, stats)
- **Custom hooks** para lógica de estado local
- **React Hook Form** para estado de formularios

#### **Enrutamiento y Layout**
- **App Router** de Next.js 13+
- **Layout Wrapper** con protección de rutas
- **Páginas simples** que delegan a componentes

## 🎨 Componentes UI

### shadcn/ui Components Disponibles
- **Layout**: Card, Separator, Scroll Area
- **Navegación**: Button, Navigation Menu, Breadcrumb
- **Formularios**: Input, Select, Checkbox, Switch, Form
- **Feedback**: Alert, Toast, Progress, Badge
- **Overlays**: Dialog, Sheet, Popover, Tooltip
- **Datos**: Table, Pagination, Chart
- **Y muchos más...**

### Componentes Personalizados
- **Dashboard**: Métricas, hábitos del día, logros recientes
- **Habits**: Lista de hábitos, formulario de creación, filtros
- **Goals**: Gestión de metas, milestones, notas
- **Analytics**: Gráficos de tendencias, estadísticas
- **Profile**: Perfil de usuario, progreso de nivel, estadísticas

## 🔗 Integración con Backend

### API Client (`lib/api.ts`)
Cliente centralizado para comunicación con el backend:
- Autenticación automática con JWT
- Manejo de errores global
- Endpoints tipados con TypeScript

### Endpoints Principales
```typescript
// Autenticación
authApi.login(credentials)
authApi.register(userData)
authApi.getProfile()

// Hábitos
habitsApi.getHabits()
habitsApi.createHabit(habit)
habitsApi.completeHabit(habitId)

// Metas
goalsApi.getGoals()
goalsApi.createGoal(goal)

// Analytics
analyticsApi.getStats()
analyticsApi.getTrends()
```

## 🎮 Funcionalidades Principales

### **Dashboard**
- Panel de control principal
- Resumen de métricas del día
- Hábitos pendientes y completados
- Logros recientes
- Mensajes motivacionales

### **Gestión de Hábitos**
- Crear, editar y eliminar hábitos
- Categorización por colores
- Sistema de puntos y dificultad
- Seguimiento de rachas (streaks)
- Completado diario con celebraciones

### **Gestión de Metas**
- Metas con fechas objetivo
- Sistema de milestones
- Notas de progreso
- Estados: activa, completada, pausada

### **Analytics**
- Gráficos de tendencias
- Análisis de consistencia
- Distribución por categorías
- Métricas de rendimiento
- Predicciones de progreso

### **Sistema de Logros**
- Insignias desbloqueables
- Sistema de puntos
- Niveles de usuario
- Desafíos semanales

## 🎨 Personalización de Temas

### Soporte de Temas
- **Modo Claro** - Tema por defecto
- **Modo Oscuro** - Tema oscuro completo
- **Sistema** - Se adapta al tema del sistema

### Configuración CSS
Variables CSS personalizables en `globals.css`:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  /* ... más variables */
}
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Componentes Adaptativos
- Navegación que se convierte en sidebar móvil
- Grillas flexibles que se adaptan al tamaño
- Diálogos que se convierten en sheets en móvil

## 🚀 Despliegue

### Build de Producción
```bash
npm run build
npm start
```

### Variables de Entorno
```bash
NEXT_PUBLIC_API_URL=https://api.tu-dominio.com/api
```

### Opciones de Deploy
- **Vercel** (Recomendado)
- **Netlify**
- **Docker**
- **Servidor tradicional**

## 🧪 Desarrollo

### Añadir Nuevo Componente UI
```bash
npx shadcn-ui@latest add [component-name]
```

### Crear Nuevo Módulo de Funcionalidad
1. Crear directorio en `components/[feature]/`
2. Seguir la estructura modular estándar
3. Añadir tipos en `[feature].types.ts`
4. Crear hook personalizado en `hooks/use-[feature].ts`
5. Crear página en `app/[feature]/page.tsx`

### Convenciones de Código
- **Componentes**: PascalCase con displayName
- **Archivos**: kebab-case
- **Hooks**: camelCase comenzando con 'use'
- **Tipos**: PascalCase con sufijo 'Type' o 'Props'

## 🔧 Utilidades

### Funciones Helper
```typescript
// lib/utils.ts
cn() // Combina clases de Tailwind
formatDate() // Formatea fechas
calculateStreak() // Calcula rachas

// lib/storage.ts
getFromStorage() // Obtiene datos del localStorage
setToStorage() // Guarda datos en localStorage
```

### Validaciones
```typescript
// lib/validations.ts
habitSchema // Esquema de validación para hábitos
goalSchema // Esquema de validación para metas
userSchema // Esquema de validación para usuarios
```

## 🤝 Contribución

### Flujo de Trabajo
1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### Standards de Código
- Usar TypeScript estricto
- Seguir convenciones de ESLint
- Documentar componentes con JSDoc
- Escribir código accesible (a11y)

## 🆘 Soporte

Para reportar problemas o solicitar funcionalidades:
1. Crear un issue en el repositorio
2. Proporcionar descripción detallada
3. Incluir pasos para reproducir (si aplica)

---

**Personal Tracker** - Tu sistema de seguimiento personal con gamificación motivacional 🚀