import React, { useState } from 'react';
import { useAppState } from '@/contexts/AppContext';
import { StepIndicator } from '@/components/StepIndicator';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';

export default function ActivationFlow() {
  const { state, setCurrentStep } = useAppState();

  const renderStep = () => {
    switch (state.currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      case 5:
        return <Step5 />;
      default:
        return <Step1 />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="py-6 px-4 border-b border-gold-dim/30">
        <div className="container">
          <h1 className="text-2xl font-bold text-gold mb-2">七印誓網</h1>
          <p className="text-sm text-muted-foreground">全球啟動流程</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div className="container max-w-2xl">
          {/* Step Indicator */}
          <StepIndicator currentStep={state.currentStep} />

          {/* Step Content */}
          <div className="mt-12">{renderStep()}</div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 px-4 border-t border-gold-dim/30 text-center text-xs text-muted-foreground">
        <p>步驟 {state.currentStep} / 5</p>
      </footer>
    </div>
  );
}
