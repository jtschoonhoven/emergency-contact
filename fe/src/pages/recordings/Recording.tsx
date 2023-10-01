import React from 'react'
import RecordingVideo from './RecordingVideo'
import { RecordingNotFoundError, useRecordingsContext } from './RecordingsContext'

export interface RecordingData {
  title: string
}

/**
 * A page to capture a single video recording.
 */
const Recording: React.FC = () => {
  const { currentRecording } = useRecordingsContext()

  if (typeof currentRecording === 'undefined') {
    console.error('Recording is undefined')
    throw RecordingNotFoundError
  }

  return (
    <>
      <p>Recording: {currentRecording.title}</p>
      <RecordingVideo />
    </>
  )
}

export default Recording
