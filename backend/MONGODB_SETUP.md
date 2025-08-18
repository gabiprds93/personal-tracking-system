# MongoDB Setup Guide

Esta guía te ayudará a configurar MongoDB para el Personal Tracking System.

## 🚀 Instalación de MongoDB

### macOS (usando Homebrew)
```bash
# Instalar MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Iniciar MongoDB como servicio
brew services start mongodb-community

# Verificar que esté ejecutándose
brew services list | grep mongodb
```

### Ubuntu/Debian
```bash
# Importar la clave pública de MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Agregar el repositorio de MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Actualizar paquetes
sudo apt-get update

# Instalar MongoDB
sudo apt-get install -y mongodb-org

# Iniciar MongoDB
sudo systemctl start mongod

# Habilitar MongoDB para que inicie automáticamente
sudo systemctl enable mongod

# Verificar estado
sudo systemctl status mongod
```

### Windows
1. Descargar MongoDB Community Server desde [mongodb.com](https://www.mongodb.com/try/download/community)
2. Ejecutar el instalador
3. Seguir las instrucciones del wizard
4. MongoDB se iniciará automáticamente como servicio

### Docker (Alternativa)
```bash
# Ejecutar MongoDB en Docker
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:6.0

# Para desarrollo local, usar sin autenticación
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  mongo:6.0
```

## 🔧 Configuración del Proyecto

### 1. Variables de Entorno
Edita tu archivo `.env`:

```env
# Para MongoDB local sin autenticación
DATABASE_URL="mongodb://localhost:27017/personal_tracking_db"

# Para MongoDB con autenticación
DATABASE_URL="mongodb://username:password@localhost:27017/personal_tracking_db?authSource=admin"

# Para MongoDB Atlas (cloud)
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/personal_tracking_db?retryWrites=true&w=majority"
```

### 2. Generar Cliente Prisma
```bash
npm run db:generate
```

### 3. Sincronizar Esquema
```bash
npm run db:push
```

### 4. Poblar con Datos de Ejemplo
```bash
npm run db:seed
```

## 🛠️ Herramientas de Administración

### MongoDB Compass (GUI)
1. Descargar [MongoDB Compass](https://www.mongodb.com/try/download/compass)
2. Conectar a `mongodb://localhost:27017`
3. Navegar a la base de datos `personal_tracking_db`

### Prisma Studio
```bash
npm run db:studio
```
Abre http://localhost:5555 en tu navegador

### MongoDB Shell (CLI)
```bash
# Conectar a MongoDB
mongosh

# Cambiar a la base de datos
use personal_tracking_db

# Ver colecciones
show collections

# Ver documentos en una colección
db.users.find()

# Salir
exit
```

## 📊 Estructura de la Base de Datos

### Colecciones Principales
- `users` - Información de usuarios
- `habits` - Hábitos de los usuarios
- `habit_completions` - Registro de completado de hábitos
- `goals` - Metas de los usuarios
- `milestones` - Hitos dentro de las metas
- `notes` - Notas asociadas a metas
- `badges` - Insignias disponibles
- `user_badges` - Relación usuario-insignia
- `challenges` - Desafíos semanales
- `challenge_tasks` - Tareas de desafíos
- `user_challenges` - Participación en desafíos
- `user_analytics` - Datos analíticos diarios

### Índices Recomendados
```javascript
// Crear índices para mejorar el rendimiento
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "username": 1 }, { unique: true })
db.habits.createIndex({ "userId": 1 })
db.habit_completions.createIndex({ "userId": 1, "completedAt": 1 })
db.goals.createIndex({ "userId": 1 })
db.user_analytics.createIndex({ "userId": 1, "date": 1 }, { unique: true })
```

## 🔍 Troubleshooting

### Error: "ECONNREFUSED"
```bash
# Verificar que MongoDB esté ejecutándose
# macOS
brew services list | grep mongodb

# Ubuntu
sudo systemctl status mongod

# Windows
# Verificar en Servicios de Windows
```

### Error: "Authentication failed"
```bash
# Verificar credenciales en DATABASE_URL
# Para desarrollo local, usar sin autenticación:
DATABASE_URL="mongodb://localhost:27017/personal_tracking_db"
```

### Error: "Database not found"
```bash
# La base de datos se creará automáticamente al ejecutar
npm run db:push
```

### Error: "Prisma Client not generated"
```bash
# Regenerar el cliente Prisma
npm run db:generate
```

## 🚀 Producción

### MongoDB Atlas (Recomendado)
1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crear un cluster
3. Configurar red (IP whitelist)
4. Crear usuario de base de datos
5. Obtener connection string
6. Configurar en variables de entorno

### Variables de Entorno de Producción
```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/personal_tracking_db?retryWrites=true&w=majority"
NODE_ENV=production
```

## 📚 Recursos Adicionales

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Prisma MongoDB Guide](https://www.prisma.io/docs/concepts/database-connectors/mongodb)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass)
