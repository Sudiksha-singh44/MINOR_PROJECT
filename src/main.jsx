import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/ui/theme-provider'
import { AppErrorBoundary } from './components/error-boundary'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppErrorBoundary>
      <ThemeProvider defaultTheme="light" storageKey="resume-analyzer-theme">
        <App />
        <Toaster position="top-right" richColors closeButton />
      </ThemeProvider>
    </AppErrorBoundary>
  </StrictMode>,
)
