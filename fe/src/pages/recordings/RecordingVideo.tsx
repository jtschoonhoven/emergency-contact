import React from 'react'
import { useReactMediaRecorder } from 'react-media-recorder-2'
import RecordingVideoPreview from './RecordingVideoPreview'
import { useRecordingsContext } from './RecordingsContext'

/**
 * Recording and display video.
 */
const RecordingVideo: React.FC = () => {
  const { addRecordedVideo, currentRecording, currentRecordedVideo, recordedVideos } = useRecordingsContext()
  const { status, startRecording, stopRecording, previewStream, mediaBlobUrl } = useReactMediaRecorder({
    video: true,
  })

  React.useEffect(() => {
    if (
      mediaBlobUrl &&
      currentRecording &&
      !recordedVideos.find((oldVideo) => oldVideo.mediaBlobUrl === mediaBlobUrl)
    ) {
      addRecordedVideo({ recordingId: currentRecording.id, mediaBlobUrl })
    }
  }, [mediaBlobUrl, recordedVideos])

  return (
    <>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      {!previewStream?.active && currentRecordedVideo?.mediaBlobUrl ? (
        <video src={currentRecordedVideo.mediaBlobUrl} controls autoPlay />
      ) : null}
      {previewStream?.active ? <RecordingVideoPreview stream={previewStream} /> : null}
    </>
  )
}

export default RecordingVideo
