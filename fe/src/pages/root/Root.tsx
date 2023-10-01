import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Root: React.FC = () => {
  return (
    <>
      <p>TODO: Root</p>
      <Link to="/recordings">Go to /recordings</Link>
      <Outlet />
    </>
  )
}

export default Root
