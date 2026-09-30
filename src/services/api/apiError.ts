import type { ApiErrorPayload } from '@/types/api'

/**
 * Error estandarizado para peticiones a la API en el frontend de INVOLVE.
 *
 * DECISIÓN PENDIENTE:
 * El formato exacto del cuerpo de error emitido por el backend (involve-backend)
 * aún no ha sido formalizado. Se asume provisionalmente que puede contener
 * un mensaje descriptivo, un código de error y detalles opcionales.
 */
export class ApiError extends Error {
  readonly status: number
  readonly statusText: string
  readonly code?: string
  readonly details?: unknown
  readonly raw?: unknown

  constructor(status: number, statusText: string, message: string, payload?: ApiErrorPayload) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.statusText = statusText
    this.code = payload?.code
    this.details = payload?.details
    this.raw = payload?.raw
  }
}

/**
 * Parsea la respuesta HTTP en caso de error y genera una instancia tipada de ApiError.
 *
 * DECISIÓN PENDIENTE:
 * La extracción de `message`, `code` y `details` se basa en un esquema provisional.
 * Se adaptará cuando se defina el formato final de errores del backend (ej. RFC 7807).
 */
export async function parseApiError(response: Response): Promise<ApiError> {
  let payload: ApiErrorPayload | undefined
  let message = `Error de API: ${response.status} ${response.statusText}`

  try {
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json()
      if (data && typeof data === 'object') {
        const dataObj = data as Record<string, unknown>
        payload = {
          message: typeof dataObj.message === 'string' ? dataObj.message : undefined,
          code: typeof dataObj.code === 'string' ? dataObj.code : undefined,
          details: dataObj.details ?? dataObj.errors,
          raw: data,
        }
        if (payload.message) {
          message = payload.message
        }
      }
    } else {
      const text = await response.text()
      if (text) {
        payload = { message: text, raw: text }
        message = text
      }
    }
  } catch {
    // Si el cuerpo no se puede leer o parsear, se conserva el mensaje HTTP por defecto
  }

  return new ApiError(response.status, response.statusText, message, payload)
}
