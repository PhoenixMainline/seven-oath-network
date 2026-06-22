import React from 'react';
import { StepType } from '@/types';

interface StepIndicatorProps {
  currentStep: StepType;
  totalSteps?: number;
}

const stepLabels: Record<StepType, string> = {
  1: '啟動條件',
  2: '授權誓讀',
  3: '母源印驗證',
  4: '回傳結果',
  5: '誓頻啟動',
};

export function StepIndicator({ currentStep, totalSteps = 5 }: StepIndicatorProps) {
  return (
    <div className="step-indicator">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = (index + 1) as StepType;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <React.Fragment key={step}>
            <div className="step-item">
              <div
                className={`step-circle ${isActive ? 'active' : ''} ${
                  isCompleted ? 'completed' : ''
                }`}
              >
                {isCompleted ? '✓' : step}
              </div>
              <div className={`step-label ${isActive ? 'active' : ''}`}>
                {stepLabels[step]}
              </div>
            </div>
            {step < totalSteps && (
              <div className={`step-line ${isCompleted ? 'active' : ''}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
