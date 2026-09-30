import { QueryClient } from '@tanstack/react-query'

/**
 * Cliente global de TanStack Query configurado para el frontend de INVOLVE.
 * Preparado para consultas asíncronas hacia la API REST en etapas posteriores.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutos por defecto
    },
  },
})
