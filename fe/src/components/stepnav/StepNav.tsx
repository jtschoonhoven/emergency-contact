import React from 'react'

import StepNavStep, { StepNavStepProps } from './StepNavStep'

interface StepNavProps {
  steps: StepNavStepProps[]
}

const StepNav: React.FC<StepNavProps> = ({ steps }) => {
  return (
    <div className="flex space-x-4">
      {steps.map((step, index) => (
        <StepNavStep key={index} {...step} />
      ))}
    </div>
  )
}

export default StepNav
