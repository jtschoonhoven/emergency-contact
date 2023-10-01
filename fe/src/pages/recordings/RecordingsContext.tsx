import React from 'react'

import { useParams } from 'react-router-dom'

interface RecordingData {
  title: string
}

interface RecordedVideo {
  index: number
  mediaBlobUrl: string
}

type AddRecordedVideo = (item: { index: number; mediaBlobUrl: string }) => void

interface RecordingsContextData {
  recordings: readonly RecordingData[]
  recordingIndex: number | undefined
  currentRecording: RecordingData | undefined
  currentRecordedVideo: RecordedVideo | undefined
  recordedVideos: readonly RecordedVideo[]
  addRecordedVideo: AddRecordedVideo
}

export const RECORDINGS: RecordingData[] = [{ title: 'Hello, world!' }, { title: 'Hello, birds!' }]

export const RecordingNotFoundError = new Response('Not Found', {
  status: 404,
  statusText: 'Not Found',
})

const defaultRecordingsContext: RecordingsContextData = {
  recordings: RECORDINGS,
  recordingIndex: undefined,
  currentRecording: undefined,
  currentRecordedVideo: undefined,
  recordedVideos: [],
  addRecordedVideo: () => undefined,
}

const RecordingsContext = React.createContext<RecordingsContextData>(defaultRecordingsContext)
export default RecordingsContext

export const useRecordingsContext = () => {
  return React.useContext(RecordingsContext)
}

export const RecordingsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [recordedVideos, setRecordedVideos] = React.useState<readonly RecordedVideo[]>([])
  const { recordingIndex: recordingIndexStr } = useParams()
  let recordingIndex: number | undefined = undefined

  // Attempt to parse the recording index as a positive integer
  if (typeof recordingIndexStr !== 'undefined') {
    try {
      recordingIndex = parseInt(recordingIndexStr, 10)
    } catch (err) {
      console.error('Recording index is not an integer')
      throw RecordingNotFoundError
    }
    if (typeof recordingIndex !== 'number') {
      console.error('Recording index is not a number')
      throw RecordingNotFoundError
    }
    if (recordingIndex < 0 || recordingIndex >= RECORDINGS.length) {
      console.error('Recording index out of bounds')
      throw RecordingNotFoundError
    }
  }

  const addRecordedVideo: AddRecordedVideo = (item) => setRecordedVideos([...recordedVideos, item])

  const currentRecordedVideo = recordedVideos.find(
    ({ index }) => index === recordingIndex && typeof recordingIndex !== 'undefined'
  )

  const context: RecordingsContextData = {
    recordings: RECORDINGS,
    recordingIndex,
    currentRecording: typeof recordingIndex !== 'undefined' ? RECORDINGS[recordingIndex] : undefined,
    currentRecordedVideo,
    recordedVideos,
    addRecordedVideo,
  }

  return <RecordingsContext.Provider value={context}>{children}</RecordingsContext.Provider>
}
