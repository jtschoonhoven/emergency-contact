import React from 'react'

interface Props {
  stream: MediaStream | null
}

/**
 * Render a live MediaStream video.
 */
const RecordingVideoPreview: React.FC<Props> = ({ stream }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])
  if (!stream) {
    return null
  }

  return <video ref={videoRef} width={500} height={500} autoPlay controls />
}

export default RecordingVideoPreview
