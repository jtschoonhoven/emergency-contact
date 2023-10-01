import React from 'react'
import AppError from './AppError'

interface ErrorInfo {
  componentStack: string
}

interface ErrorBoundaryClassProps extends React.PropsWithChildren {
  componentDidCatch: (error: Error, errorInfo: ErrorInfo) => void
}

// Class Component to actually catch errors
class ErrorBoundaryClass extends React.Component<ErrorBoundaryClassProps> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.componentDidCatch(error, errorInfo)
  }

  render() {
    return this.props.children
  }
}

const useErrorBoundary = () => {
  const [error, setError] = React.useState<Error | null>(null)
  const [errorInfo, setErrorInfo] = React.useState<ErrorInfo | null>(null)

  const componentDidCatch = React.useCallback((error: Error, errorInfo: ErrorInfo) => {
    setError(error)
    setErrorInfo(errorInfo)
  }, [])

  return { error, errorInfo, componentDidCatch }
}

interface ErrorBoundaryProps extends React.PropsWithChildren {
  fallback?: React.ReactNode
}

// Error Boundary Function Component Wrapper
const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children, fallback }) => {
  const { error, errorInfo, componentDidCatch } = useErrorBoundary()

  if (error) {
    const message = error.toString() || 'Unknown error'
    const stackTrace = errorInfo?.componentStack
    console.error(`${message} ${stackTrace ? `:\n${stackTrace}` : ''}`)
    return (
      <>
        <AppError message={message} />
        {fallback}
      </>
    )
  }

  return <ErrorBoundaryClass componentDidCatch={componentDidCatch}>{children}</ErrorBoundaryClass>
}

export default ErrorBoundary
