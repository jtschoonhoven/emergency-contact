import React from 'react'
import AppBar from './components/appbar/AppBar'
import { useOutlet } from 'react-router-dom'
import Root from './pages/root/Root'
import { RecordingsProvider } from './pages/recordings/RecordingsContext'

const App: React.FC = () => {
  const outlet = useOutlet()
  return (
    <>
      <RecordingsProvider>
        <AppBar />
        <div className="container mx-auto px-4 pt-4">{outlet ? outlet : <Root />}</div>
      </RecordingsProvider>
    </>
  )
}

export default App
