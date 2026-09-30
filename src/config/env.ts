/**
 * Configuración de variables de entorno del cliente web.
 * La URL base del backend representa un VALOR DE EJEMPLO para desarrollo local.
 */
export const env = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
} as const
