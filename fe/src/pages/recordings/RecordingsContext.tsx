import React from 'react'

import { useParams } from 'react-router-dom'

interface RecordingData {
  id: string
  index: number
  title: string
  prompt: string
}

interface RecordedVideo {
  recordingId: string
  mediaBlobUrl: string
}

type AddRecordedVideo = (item: RecordedVideo) => void

interface RecordingsContextData {
  recordings: readonly RecordingData[]
  currentRecording: RecordingData | undefined
  currentRecordedVideo: RecordedVideo | undefined
  recordedVideos: readonly RecordedVideo[]
  addRecordedVideo: AddRecordedVideo
}

const _RECORDINGS: readonly Omit<RecordingData, 'index'>[] = [
  { id: '1-hello', title: 'Hello, world!', prompt: 'Favorite color?' },
  { id: '2-birds', title: 'Hello, birds!', prompt: 'Best food?' },
]
export const RECORDINGS: readonly RecordingData[] = _RECORDINGS.map((recording, index) => ({ index, ...recording }))

const defaultRecordingsContext: RecordingsContextData = {
  recordings: RECORDINGS,
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
  const { recordingId } = useParams()

  // Throw 404 response if recordingId is invalid
  const recordingIndex = RECORDINGS.findIndex((recording) => recordingId === recording.id)
  if (recordingId && recordingIndex < 0) {
    throw new Response(`No recording exists with ID "${recordingId}"`, {
      status: 404,
      statusText: 'Not Found',
    })
  }

  const addRecordedVideo: AddRecordedVideo = (newVideo) => {
    const oldRecordedVideos = recordedVideos.filter((oldVideo) => oldVideo.recordingId !== newVideo.recordingId)
    setRecordedVideos([...oldRecordedVideos, newVideo])
  }

  const currentRecordedVideo = recordedVideos.find(
    (recordedVideo) => recordedVideo.recordingId === recordingId && typeof recordingId !== 'undefined'
  )

  const context: RecordingsContextData = {
    recordings: RECORDINGS,
    currentRecording: typeof recordingIndex !== 'undefined' ? RECORDINGS[recordingIndex] : undefined,
    currentRecordedVideo,
    recordedVideos,
    addRecordedVideo,
  }

  return <RecordingsContext.Provider value={context}>{children}</RecordingsContext.Provider>
}
