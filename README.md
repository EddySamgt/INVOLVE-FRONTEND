# INVOLVE — Frontend

## Propósito

Base técnica de la aplicación web cliente para **INVOLVE**, sistema de gestión de inventario y ventas orientado a los procesos productivos de CECADE. Este repositorio contendrá la interfaz de usuario que interactuará con la API REST de `involve-backend`.

## Tecnologías

- **React 19**
- **Vite**
- **TypeScript**
- **Tailwind CSS v4**
- **TanStack Query**
- **Lucide React**
- **Recharts**
- **clsx / tailwind-merge** (base para integración de componentes de UI)

## Requisitos

- **Node.js**: v20.19.0 o superior (recomendado v22 LTS)
- **npm**: v10.8.2 o superior

## Instalación

1. Clonar el repositorio y acceder a la carpeta:
   ```bash
   cd involve-frontend
   ```

2. Configurar las variables de entorno locales copiando la plantilla:
   ```bash
   cp .env.example .env
   ```

3. Instalar dependencias:
   ```bash
   npm install
   ```

## Ejecución en desarrollo

Iniciar el servidor local de desarrollo con Vite:

```bash
npm run dev
```

La aplicación estará disponible de forma predeterminada en `http://localhost:5173`.

## Construcción para producción

Compilar la aplicación y verificar tipos con TypeScript:

```bash
npm run build
```

Los artefactos listos para producción se generarán en el directorio `dist/`. Para previsualizar el bundle de producción localmente:

```bash
npm run preview
```
