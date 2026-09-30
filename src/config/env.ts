/**
 * Configuración de variables de entorno del cliente web.
 * Contiene placeholders y referencias a variables sin asumir URLs reales de producción.
 */
export const env = {
  apiUrl: import.meta.env.VITE_API_URL ?? 'http://api-placeholder.local/api',
} as const
