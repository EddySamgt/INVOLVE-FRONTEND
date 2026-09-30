import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utilidad estándar para combinación condicional y resolución de clases de Tailwind CSS.
 * Compatible con la integración de componentes shadcn/ui y Tailwind UI.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
