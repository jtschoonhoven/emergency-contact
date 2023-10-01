import React from 'react'
import { useRouteError, isRouteErrorResponse } from 'react-router-dom'
import AppError from './AppError'

/**
 * A special type of error boundary used with React Router for handling errors inside routes.
 */
const RouteError: React.FC = () => {
  const error = useRouteError()
  console.error(error)

  let message = ''
  let statusCode = 0

  if (isRouteErrorResponse(error)) {
    statusCode = error.status
    message = error.data?.message || error.statusText
  } else if (error instanceof Response) {
    statusCode = error.status
    message = error.statusText
  } else if (error instanceof Error) {
    message = error.message
  } else if (typeof error === 'string') {
    message = error
  }
  message = message || 'Unknown Error'

  return <AppError message={message} statusCode={statusCode} />
}

export default RouteError
