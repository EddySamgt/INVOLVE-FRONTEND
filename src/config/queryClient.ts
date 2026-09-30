import { QueryClient } from '@tanstack/react-query'
import { ApiError } from '@/services/api/apiError'

/**
 * Cliente global de TanStack Query configurado para el frontend de INVOLVE.
 *
 * Preparado para soportar de manera uniforme:
 * - Queries: lectura de datos con caché y deduplicación.
 * - Mutations: operaciones de escritura/mutación sin reintentos automáticos.
 * - Loading / Error: manejo granular de estados en hooks y componentes.
 * - Caché e Invalidación: tiempos de vigencia (staleTime) y recolección de basura (gcTime).
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // No reintentar errores de cliente (4xx) ya que no son transitorios
        if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
          return false
        }
        return failureCount < 2
      },
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutos por defecto
      gcTime: 1000 * 60 * 10,   // 10 minutos de permanencia en caché
    },
    mutations: {
      retry: false, // Por seguridad no se reintentan mutaciones que alteren datos en el servidor
    },
  },
})
