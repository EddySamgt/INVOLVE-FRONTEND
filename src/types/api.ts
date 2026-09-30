/**
 * Tipos base y genéricos de infraestructura de comunicación HTTP.
 * No define modelos de entidades de negocio ni campos ficticios.
 */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type QueryParams = Record<string, string | number | boolean | undefined | null>

export interface RequestOptions extends Omit<RequestInit, 'body' | 'method'> {
  params?: QueryParams
  headers?: Record<string, string>
}

/**
 * DECISIÓN PENDIENTE:
 * Estructura provisional para errores devueltos por la API.
 * El backend definirá el contrato formal de errores (ej. ProblemDetails RFC 7807, Spring ErrorResponse, etc.).
 */
export interface ApiErrorPayload {
  message?: string
  status?: number
  code?: string
  details?: unknown
  raw?: unknown
}
