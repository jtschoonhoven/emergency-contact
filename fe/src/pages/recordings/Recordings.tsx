import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import StepNav from '../../components/stepnav/StepNav'
import { StepNavStepProps } from '../../components/stepnav/StepNavStep'
import { useRecordingsContext } from './RecordingsContext'

/**
 * Root page for video recordings.
 */
const Recordings: React.FC = () => {
  const { recordings, currentRecording } = useRecordingsContext()

  const steps: StepNavStepProps[] = recordings.map((recording, idx) => ({
    index: idx,
    title: recording.title,
    href: `/recordings/${recording.id}`,
    isActive: recording.id === currentRecording?.id,
    isCompleted: typeof currentRecording !== 'undefined' ? idx < currentRecording?.index : false,
  }))

  return (
    <>
      <p>
        <Link to="/">Go to /</Link>
      </p>
      <StepNav steps={steps} />
      <Outlet />
    </>
  )
}

export default Recordings
