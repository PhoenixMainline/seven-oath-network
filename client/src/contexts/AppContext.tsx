import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppState, StepType } from '@/types';

interface AppContextType {
  state: AppState;
  setCurrentStep: (step: StepType) => void;
  updateConditions: (conditions: Partial<AppState['conditions']>) => void;
  setQRScanned: (scanned: boolean, code?: string) => void;
  setOathRecited: (recited: boolean) => void;
  setVerificationResult: (result: 'passed' | 'failed') => void;
  setPurchaseNumber: (number: string) => void;
  resetState: () => void;
}

const initialState: AppState = {
  currentStep: 1,
  conditions: {
    purchaseCodeVerified: false,
    networkStable: false,
  },
  qrScanned: false,
  scannedQRCode: '',
  oathRecited: false,
  verificationResult: null,
  purchaseNumber: '',
  seals: {
    1: 'inactive',
    2: 'inactive',
    3: 'inactive',
    4: 'inactive',
    5: 'inactive',
    6: 'inactive',
    7: 'inactive',
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  const setCurrentStep = (step: StepType) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  };

  const updateConditions = (conditions: Partial<AppState['conditions']>) => {
    setState((prev) => ({
      ...prev,
      conditions: { ...prev.conditions, ...conditions },
    }));
  };

  const setQRScanned = (scanned: boolean, code?: string) => {
    setState((prev) => ({
      ...prev,
      qrScanned: scanned,
      scannedQRCode: code || prev.scannedQRCode,
    }));
  };

  const setOathRecited = (recited: boolean) => {
    setState((prev) => ({ ...prev, oathRecited: recited }));
  };

  const setVerificationResult = (result: 'passed' | 'failed') => {
    setState((prev) => ({ ...prev, verificationResult: result }));
  };

  const setPurchaseNumber = (number: string) => {
    setState((prev) => ({ ...prev, purchaseNumber: number }));
  };

  const resetState = () => {
    setState(initialState);
  };

  const value: AppContextType = {
    state,
    setCurrentStep,
    updateConditions,
    setQRScanned,
    setOathRecited,
    setVerificationResult,
    setPurchaseNumber,
    resetState,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within AppProvider');
  }
  return context;
}
