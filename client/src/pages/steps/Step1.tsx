import React, { useState } from 'react';
import { useAppState } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export default function Step1() {
  const { state, updateConditions, setQRScanned, setCurrentStep } = useAppState();
  const [isScanning, setIsScanning] = useState(false);

  const canProceed =
    state.conditions.purchaseCodeVerified &&
    state.conditions.networkStable &&
    state.qrScanned;

  const handleQRScan = () => {
    setIsScanning(true);
    // Simulate QR code scanning
    setTimeout(() => {
      setQRScanned(true, 'QR_CODE_12345');
      setIsScanning(false);
    }, 1500);
  };

  const handleNext = () => {
    if (canProceed) {
      setCurrentStep(2);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-gold mb-2">全球啟動流程 · 步驟一</h2>
        <p className="text-muted-foreground">啟動條件</p>
      </div>

      {/* Prerequisites */}
      <div className="sacred-card p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gold">前置條件</h3>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Checkbox
              id="purchase-code"
              checked={state.conditions.purchaseCodeVerified}
              onCheckedChange={(checked) =>
                updateConditions({ purchaseCodeVerified: checked as boolean })
              }
            />
            <label
              htmlFor="purchase-code"
              className="text-sm cursor-pointer flex-1"
            >
              已完成驗證之購書序號誓導碼
            </label>
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              id="network"
              checked={state.conditions.networkStable}
              onCheckedChange={(checked) =>
                updateConditions({ networkStable: checked as boolean })
              }
            />
            <label htmlFor="network" className="text-sm cursor-pointer flex-1">
              穩定網路環境
            </label>
          </div>
        </div>
      </div>

      {/* QR Code Scanning */}
      <div className="sacred-card p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gold">誓導 QR Code 掃描</h3>

        <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-gold-dim rounded-lg">
        {state.qrScanned ? (
  <div className="text-center">
    <div className="text-4xl mb-2">✅</div>
    <p className="text-green-ok font-semibold">QR Code 掃描完成</p>
    <p className="text-xs text-muted-foreground mt-2">
      {state.scannedQRCode}
    </p>
  </div>
) : (
  <div className="text-center">
    <div className="text-4xl mb-4 text-cyan">📷</div>
    <p className="text-muted-foreground mb-4">請使用手機掃描下方 QR Code</p>
    <img 
      src="/qr-code.png" 
      alt="誓導 QR Code"
      style={{ 
        width: '200px', 
        height: '200px', 
        margin: '0 auto',
        border: '2px solid var(--gold-dim)',
        borderRadius: '12px',
        padding: '8px',
        background: 'white'
      }}
    />
    <Button
      onClick={handleQRScan}
      className="btn-gold-now"
      style={{ marginTop: '16px' }}
    >
      ✅ 已掃描完成
    </Button>
  </div>
)}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={handleNext}
          disabled={!canProceed}
          className="flex-1 btn-gold-glow"
        >
          進入下一步驟
        </Button>
      </div>

      {/* Status Info */}
      <div className="text-xs text-muted-foreground text-center">
        {!canProceed && (
          <p>
            請完成所有條件並掃描 QR Code 後才能繼續
          </p>
        )}
      </div>
    </div>
  );
}
