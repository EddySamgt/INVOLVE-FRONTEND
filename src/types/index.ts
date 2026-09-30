/**
 * Estrategia de Tipos del Frontend de INVOLVE:
 *
 * 1. Infraestructura:
 *    Tipos base de transporte, HTTP y errores en `./api.ts`.
 *
 * 2. Dominio y Modelos de Negocio:
 *    Cuando existan los contratos reales del backend (involve-backend),
 *    los modelos y DTOs se agregarán en archivos dedicados por dominio
 *    (ej. auth.ts, products.ts, inventory.ts, sales.ts, etc.) sin inventar
 *    campos previos a la definición del contrato.
 */

export * from './api'
