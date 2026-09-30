import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/config/queryClient'
import { Box } from 'lucide-react'

function AppContent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6 text-gray-900">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <Box className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-semibold">INVOLVE</h1>
        <p className="mt-2 text-sm text-gray-600">
          Base técnica del frontend inicializada correctamente.
        </p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  )
}
