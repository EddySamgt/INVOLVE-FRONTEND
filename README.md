# INVOLVE — Frontend

## Propósito

Base arquitectónica de la aplicación web cliente para **INVOLVE**, sistema de gestión de inventario y ventas orientado a los procesos productivos de CECADE. Este repositorio contiene la infraestructura del frontend diseñada para interactuar ordenadamente con la API REST de `involve-backend`.

## Tecnologías

- **React 19**
- **Vite**
- **TypeScript**
- **Tailwind CSS v4**
- **TanStack Query v5**
- **Lucide React**
- **Recharts**
- **clsx / tailwind-merge** (`cn` utility para soporte de shadcn/ui y Tailwind UI)

## Arquitectura y Separación de Responsabilidades

El frontend sigue un flujo unidireccional y desacoplado:

```text
UI / Componentes
       ↓
    Páginas
       ↓
    Hooks
       ↓
Servicios API
       ↓
TanStack Query
       ↓
API REST Backend
```

### Principios Fundamentales

1. **Componentes libres de lógica de negocio**: La interfaz gráfica presenta información, captura interacciones y delega la gestión de datos a hooks dedicados.
2. **Autoridad en el Backend**: El frontend no asume la validación definitiva de reglas críticas de negocio (stock, autorización, integridad o cálculo contable de transacciones).
3. **Manejo homogéneo de red**: Las peticiones pasan por una capa centralizada (`httpClient`) que estandariza encabezados, parseo de respuestas y canalización tipada de excepciones (`ApiError`).
4. **Caché y sincronización reactiva**: TanStack Query gestiona los estados de carga (`isLoading`), errores (`isError`), deduplicación y políticas de vigencia/recolección de caché.

## Estructura del Proyecto

```text
src/
├── assets/          # Recursos estáticos (imágenes, SVGs)
├── components/      # Componentes UI reutilizables (sin lógica de negocio)
├── pages/           # Vistas y pantallas principales de la aplicación
├── layouts/         # Estructuras maestras visuales (navbars, sidebars)
├── hooks/           # Custom hooks y envoltorios de TanStack Query
├── services/        # Capa de comunicación HTTP
│   └── api/         # Cliente HTTP centralizado (httpClient, ApiError)
├── lib/             # Utilidades transversales agnósticas (cn helper)
├── types/           # Definiciones de tipos TypeScript e infraestructura API
├── contexts/        # Proveedores React Context para estado de cliente
├── config/          # Configuración global (env, queryClient)
├── App.tsx          # Componente raíz con QueryClientProvider
├── index.css        # Configuración de estilos globales con Tailwind CSS
└── main.tsx         # Punto de entrada de React en el DOM
```

## Configuración del Entorno

La ubicación del backend se configura a través de variables de entorno con prefijo `VITE_`:

| Variable | Descripción | Valor por defecto (Placeholder) |
|---|---|---|
| `VITE_API_URL` | URL base de la API REST del backend | `http://api-placeholder.local/api` |

Para configurar el entorno local:
```bash
cp .env.example .env
```
Ajuste el valor de `VITE_API_URL` cuando el backend esté desplegado o ejecutándose localmente.

## Requisitos

- **Node.js**: v20.19.0 o superior (recomendado v22 LTS)
- **npm**: v10.8.2 o superior

## Instalación

1. Clonar el repositorio y acceder a la carpeta:
   ```bash
   cd involve-frontend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

## Ejecución en desarrollo

Iniciar el servidor local de desarrollo con Vite:

```bash
npm run dev
```

La aplicación estará disponible de forma predeterminada en `http://localhost:5173`.

## Validación y Construcción

Para verificar tipos y compilar el paquete de producción:

```bash
npm run build
```

Para ejecutar el linter de código:

```bash
npm run lint
```

Para previsualizar el bundle de producción localmente:

```bash
npm run preview
```
