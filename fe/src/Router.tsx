import React from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Recordings from './pages/recordings/Recordings'
import RouteError from './components/error/RouteError'
import Recording from './pages/recordings/Recording'
import App from './App'

const ROUTES = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteError />,
    children: [
      {
        path: '/recordings',
        element: <Recordings />,
        errorElement: <RouteError />,
        children: [
          {
            path: ':recordingIndex',
            element: <Recording />,
          },
        ],
      },
    ],
  },
])

const Router: React.FC = () => {
  return <RouterProvider router={ROUTES} />
}

export default Router
