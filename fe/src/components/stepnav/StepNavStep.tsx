import React from 'react'
import { Link } from 'react-router-dom'

export interface StepNavStepProps {
  index: number
  title: string
  href: string
  isActive: boolean
  isCompleted: boolean
}

const StepNavStep: React.FC<StepNavStepProps> = ({ title, index, href, isActive, isCompleted }) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <Link to={href}>
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            {isCompleted ? (
              <svg
                className="w-4 h-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <span className="text-white">{index + 1}</span>
            )}
          </div>
        </Link>
        <div className="text-xs mt-2">{title}</div>
      </div>
    </>
  )
}

export default StepNavStep
