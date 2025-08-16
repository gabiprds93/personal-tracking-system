# Sistema de Seguimiento Personal

Una aplicación web moderna para realizar seguimiento en tiempo real de aspectos importantes de tu vida, enfocándose en motivar la consistencia y mostrar información valiosa.

## 🚀 Características

### 📊 Dashboard Principal
- **Vista general**: Estadísticas en tiempo real de todos tus seguimientos
- **Progreso diario**: Muestra el avance de hoy con barras de progreso
- **Mensajes motivacionales**: Frases inspiradoras que cambian cada día
- **Resumen rápido**: Número de seguimientos activos, items completados y tasa de cumplimiento

### 📝 Gestión de Seguimientos
- **6 categorías**: Hábitos, Metas, Salud, Aprendizaje, Finanzas y Productividad
- **Crear y editar**: Interfaz intuitiva para gestionar tus seguimientos
- **Estados**: Activar/desactivar seguimientos según tus necesidades
- **Filtros avanzados**: Buscar por tipo, estado o texto

### 📈 Análisis de Progreso
- **Estadísticas detalladas**: Progreso por categoría y seguimiento individual
- **Rachas**: Seguimiento de días consecutivos y mejores rachas históricas
- **Gráficos visuales**: Barras de progreso y métricas claras
- **Períodos**: Análisis semanal, mensual y anual

### ⏰ Sistema de Recordatorios
- **Notificaciones personalizables**: Configura hora, días y mensaje
- **Permisos del navegador**: Gestión automática de permisos de notificación
- **Pruebas**: Función para probar notificaciones antes de configurar
- **Configuración flexible**: Habilitar/deshabilitar según preferencias

## 🛠️ Tecnologías Utilizadas

- **Next.js 15**: Framework de React con App Router
- **TypeScript**: Tipado estático para mayor robustez
- **Tailwind CSS**: Framework de CSS utilitario para diseño responsive
- **localStorage**: Almacenamiento local de datos del usuario
- **Web Notifications API**: Sistema de notificaciones del navegador

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Páginas de Next.js (App Router)
│   ├── page.tsx           # Dashboard principal
│   ├── trackings/         # Página de gestión de seguimientos
│   ├── progress/          # Página de análisis de progreso
│   ├── reminders/         # Página de configuración de recordatorios
│   └── layout.tsx         # Layout principal
├── components/            # Componentes reutilizables
│   ├── Navigation.tsx     # Barra de navegación
│   ├── StatsCard.tsx      # Tarjeta de estadísticas
│   ├── ProgressBar.tsx    # Barra de progreso
│   ├── TrackingCard.tsx   # Tarjeta de seguimiento
│   ├── TrackingModal.tsx  # Modal para crear/editar seguimientos
│   └── SettingsModal.tsx  # Modal de configuración
├── hooks/                 # Hooks personalizados
│   └── useNotifications.ts # Hook para manejo de notificaciones
├── types/                 # Definiciones de tipos TypeScript
│   └── index.ts           # Tipos principales de la aplicación
└── utils/                 # Utilidades y funciones auxiliares
    ├── storage.ts         # Manejo de localStorage
    ├── calculations.ts    # Cálculos de estadísticas
    └── constants.ts       # Constantes de la aplicación
```

## 🎯 Tipos de Seguimiento

### 🔄 Hábitos
- Seguimiento de rutinas diarias
- Formación de nuevos hábitos
- Consistencia en actividades regulares

### 🎯 Metas
- Objetivos a largo plazo
- Metas personales y profesionales
- Seguimiento de logros importantes

### 💪 Salud
- Actividad física
- Alimentación y nutrición
- Bienestar mental y físico

### 📚 Aprendizaje
- Estudios y cursos
- Desarrollo de habilidades
- Lectura y formación continua

### 💰 Finanzas
- Control de gastos
- Ahorros y inversiones
- Objetivos financieros

### ⚡ Productividad
- Gestión de tareas
- Proyectos personales
- Eficiencia y organización

## 📊 Sistema de Datos

### Estructura de un Seguimiento
```typescript
interface Tracking {
  id: string;
  type: TrackingType;
  title: string;
  description?: string;
  items: TrackingItem[];
  createdAt: Date;
  isActive: boolean;
  goal?: string;
  targetValue?: number;
  currentValue: number;
}
```

### Estructura de un Item
```typescript
interface TrackingItem {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed' | 'skipped';
  createdAt: Date;
  completedAt?: Date;
  targetDate?: Date;
  frequency: 'daily' | 'weekly' | 'monthly';
  streak: number;
  bestStreak: number;
}
```

## 🔧 Funcionalidades Técnicas

### Almacenamiento Local
- **localStorage**: Todos los datos se guardan localmente en el navegador
- **Persistencia**: Los datos se mantienen entre sesiones
- **Sincronización**: Cambios automáticos sin necesidad de guardar manualmente

### Cálculos de Progreso
- **Tasa de cumplimiento**: Porcentaje de items completados
- **Rachas**: Días consecutivos de actividad
- **Estadísticas temporales**: Progreso semanal y mensual
- **Métricas agregadas**: Estadísticas generales de todos los seguimientos

### Sistema de Notificaciones
- **Permisos automáticos**: Solicitud y gestión de permisos del navegador
- **Recordatorios programados**: Notificaciones según configuración del usuario
- **Personalización**: Mensajes y horarios configurables
- **Compatibilidad**: Funciona en navegadores modernos

## 🎨 Diseño y UX

### Principios de Diseño
- **Interfaz limpia**: Diseño minimalista y fácil de usar
- **Responsive**: Funciona perfectamente en móviles y desktop
- **Accesibilidad**: Contraste adecuado y navegación por teclado
- **Feedback visual**: Animaciones y transiciones suaves

### Componentes Reutilizables
- **Tarjetas**: Diseño consistente para mostrar información
- **Modales**: Interfaz para formularios y configuraciones
- **Barras de progreso**: Visualización clara del avance
- **Navegación**: Menú responsive con indicadores de página activa

## 🚀 Instalación y Uso

### Requisitos
- Node.js 18+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd personal-tracking-system/frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### Scripts Disponibles
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construir para producción
npm run start    # Servidor de producción
npm run lint     # Verificar código
```

## 📱 Uso de la Aplicación

### 1. Primeros Pasos
1. Abre la aplicación en tu navegador
2. Crea tu primer seguimiento usando el botón "Nuevo Seguimiento"
3. Selecciona una categoría y completa la información
4. Configura recordatorios si lo deseas

### 2. Gestión Diaria
1. Revisa el dashboard para ver tu progreso general
2. Marca items como completados en tus seguimientos
3. Revisa las estadísticas de rachas y cumplimiento
4. Ajusta configuraciones según tus necesidades

### 3. Análisis de Progreso
1. Ve a la página de "Progreso" para análisis detallado
2. Revisa estadísticas por categoría
3. Analiza tus mejores rachas
4. Identifica áreas de mejora

### 4. Configuración de Recordatorios
1. Ve a "Recordatorios" para configurar notificaciones
2. Permite notificaciones del navegador
3. Configura hora, días y mensaje personalizado
4. Prueba las notificaciones

## 🔒 Privacidad y Datos

- **Almacenamiento local**: Todos los datos se guardan en tu navegador
- **Sin servidor**: No se envían datos a servidores externos
- **Control total**: Tú tienes control completo sobre tus datos
- **Exportación**: Los datos se pueden exportar desde localStorage

## 🎯 Beneficios del Sistema

### Motivación
- **Feedback visual**: Ver progreso en tiempo real
- **Rachas**: Mantener consistencia con seguimiento de días consecutivos
- **Mensajes motivacionales**: Frases inspiradoras que cambian diariamente

### Organización
- **Categorización**: Organizar objetivos por áreas de vida
- **Filtros**: Encontrar rápidamente lo que necesitas
- **Estados**: Activar/desactivar seguimientos según prioridades

### Análisis
- **Estadísticas detalladas**: Entender patrones y tendencias
- **Progreso temporal**: Ver evolución semanal y mensual
- **Identificación de áreas**: Encontrar oportunidades de mejora

## 🔮 Futuras Mejoras

- **Sincronización en la nube**: Backup y sincronización entre dispositivos
- **Gráficos avanzados**: Más tipos de visualizaciones
- **Exportación de datos**: Funciones para exportar estadísticas
- **Temas personalizables**: Múltiples temas visuales
- **Integración con calendarios**: Sincronización con Google Calendar
- **API de terceros**: Integración con apps de fitness y productividad

## 🤝 Contribución

Este proyecto está diseñado como una aplicación personal, pero las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:

1. Revisa la documentación en este README
2. Verifica los comentarios en el código
3. Abre un issue en el repositorio

---

**¡Comienza tu viaje hacia una vida más organizada y productiva con el Sistema de Seguimiento Personal!** 🚀
