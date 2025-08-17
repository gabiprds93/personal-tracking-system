"use client"

import { Component, ErrorInfo, ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <CardTitle className="text-xl">¡Algo salió mal!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Ha ocurrido un error inesperado. Por favor, intenta recargar la página.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="text-left p-3 bg-muted rounded-md">
                  <p className="text-xs font-mono text-destructive">
                    {this.state.error.message}
                  </p>
                </div>
              )}
              
              <div className="flex flex-col gap-2">
                <Button
                  onClick={() => window.location.reload()}
                  className="gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Recargar Página
                </Button>
                <Button
                  variant="outline"
                  onClick={() => this.setState({ hasError: false })}
                >
                  Intentar de Nuevo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

// Simple error fallback component for lighter usage
export function ErrorFallback({ 
  error, 
  resetError 
}: { 
  error: Error
  resetError: () => void 
}) {
  return (
    <Card className="m-4">
      <CardContent className="p-6 text-center">
        <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-4" />
        <h3 className="font-semibold mb-2">Error en esta sección</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {error.message || 'Ha ocurrido un error inesperado'}
        </p>
        <Button size="sm" onClick={resetError}>
          Intentar de Nuevo
        </Button>
      </CardContent>
    </Card>
  )
}