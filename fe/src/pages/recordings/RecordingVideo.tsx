import React from 'react'
import { useReactMediaRecorder } from 'react-media-recorder-2'
import RecordingVideoPreview from './RecordingVideoPreview'

/**
 * Recording and display video.
 */
const RecordingVideo: React.FC = () => {
  const { status, startRecording, stopRecording, previewStream } = useReactMediaRecorder({ video: true })
  return (
    <>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      {/* <video src={mediaBlobUrl} controls autoPlay loop /> */}
      <RecordingVideoPreview stream={previewStream} />;
    </>
  )
}

export default RecordingVideo
