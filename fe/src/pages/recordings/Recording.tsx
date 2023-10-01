import React from 'react'
import RecordingVideo from './RecordingVideo'
import { useRecordingsContext } from './RecordingsContext'

/**
 * A page to capture a single video recording.
 */
const Recording: React.FC = () => {
  const { currentRecording } = useRecordingsContext()

  if (typeof currentRecording === 'undefined') {
    console.error('Recording is undefined')
    throw new Response('Recording not found.', {
      status: 404,
      statusText: 'Not Found',
    })
  }

  return (
    <>
      <p>Recording: {currentRecording.title}</p>
      <RecordingVideo />
    </>
  )
}

export default Recording
