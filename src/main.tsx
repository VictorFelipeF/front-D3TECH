import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from 'sonner'
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
        <Toaster
          position="top-center"
          richColors
          closeButton
          gap={12}
          toastOptions={{
            style: {
              borderRadius: 0,
              padding: "14px 20px",
              fontSize: "1rem",
              fontWeight: 500,
              border: "1px solid rgba(124, 58, 237, 0.2)",
            },
            className: "shadow-lg shadow-d3-purple/10",
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
