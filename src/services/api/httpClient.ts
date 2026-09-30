import { env } from '@/config/env'
import { parseApiError } from './apiError'
import type { HttpMethod, QueryParams, RequestOptions } from '@/types/api'

/**
 * Construye la URL concatenando la base configurada, el endpoint y los parámetros de búsqueda.
 * Utiliza URLSearchParams para evitar suposiciones sobre el formato estricto del host en placeholders.
 */
function buildUrl(endpoint: string, params?: QueryParams): string {
  const normalizedBase = env.apiUrl.endsWith('/') ? env.apiUrl.slice(0, -1) : env.apiUrl
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  let fullUrl = `${normalizedBase}${normalizedEndpoint}`

  if (params) {
    const searchParams = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value))
      }
    }
    const queryString = searchParams.toString()
    if (queryString) {
      fullUrl += (fullUrl.includes('?') ? '&' : '?') + queryString
    }
  }

  return fullUrl
}

/**
 * Capa centralizada de cliente HTTP para peticiones hacia la API REST.
 * Soporta métodos GET, POST, PUT, PATCH y DELETE.
 * Preparada para recibir abort signals de TanStack Query y gestionar errores de forma homogénea.
 * No define endpoints reales ni rutas de negocio ficticias.
 */
export const httpClient = {
  async request<T>(method: HttpMethod, endpoint: string, data?: unknown, options: RequestOptions = {}): Promise<T> {
    const { params, headers = {}, ...restOptions } = options
    const url = buildUrl(endpoint, params)

    const requestHeaders: Record<string, string> = {
      Accept: 'application/json',
      ...headers,
    }

    const init: RequestInit = {
      ...restOptions,
      method,
      headers: requestHeaders,
    }

    if (data !== undefined && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      if (!(data instanceof FormData)) {
        requestHeaders['Content-Type'] = 'application/json'
        init.body = JSON.stringify(data)
      } else {
        init.body = data
      }
    }

    const response = await fetch(url, init)

    if (!response.ok) {
      throw await parseApiError(response)
    }

    if (response.status === 204) {
      return undefined as T
    }

    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return (await response.json()) as T
    }

    return (await response.text()) as unknown as T
  },

  get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('GET', endpoint, undefined, options)
  },

  post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>('POST', endpoint, data, options)
  },

  put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>('PUT', endpoint, data, options)
  },

  patch<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>('PATCH', endpoint, data, options)
  },

  delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('DELETE', endpoint, undefined, options)
  },
}
