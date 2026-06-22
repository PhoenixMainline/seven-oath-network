import React from 'react';
import { useAppState } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';

export default function Step4() {
  const { state, setCurrentStep } = useAppState();

  const handleNext = () => {
    setCurrentStep(5);
  };

  const isPassed = state.verificationResult === 'passed';

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gold mb-2">全球啟動流程 · 步驟四</h2>
        <p className="text-muted-foreground">回傳結果</p>
      </div>

      <div
        className={`sacred-card p-12 text-center ${
          isPassed ? 'border-green-ok' : 'border-red-err'
        }`}
      >
        <div className={`text-6xl mb-6 ${isPassed ? 'text-green-ok' : 'text-red-err'}`}>
          {isPassed ? '✓' : '✕'}
        </div>

        <h3
          className={`text-3xl font-bold mb-4 ${
            isPassed ? 'text-green-ok' : 'text-red-err'
          }`}
        >
          {isPassed ? '誓印通過' : '對頻未通過'}
        </h3>

        <p className="text-lg mb-8 text-muted-foreground">
          {isPassed
            ? '誓資續承成功'
            : '請進行補誓程序'}
        </p>

        <div className="bg-purple-mid/50 rounded-lg p-6 border border-gold-dim/30 mb-8">
          <p className="text-sm text-muted-foreground mb-2">購書序號</p>
          <p className="text-lg font-semibold text-gold">{state.purchaseNumber}</p>
        </div>

        {isPassed && (
          <div className="space-y-2 mb-8">
            <p className="text-sm text-green-ok">✓ 前置條件已驗證</p>
            <p className="text-sm text-green-ok">✓ 誓文已誦讀</p>
            <p className="text-sm text-green-ok">✓ 序號已驗證</p>
          </div>
        )}
      </div>

      <Button onClick={handleNext} className="w-full btn-gold-glow">
        {isPassed ? '進入下一步驟' : '返回修正'}
      </Button>
    </div>
  );
}
