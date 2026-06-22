import React, { useState } from 'react';
import { useAppState } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Step3() {
  const { state, setQRScanned, setPurchaseNumber, setVerificationResult, setCurrentStep } = useAppState();
  const [isScanning, setIsScanning] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [purchaseInput, setPurchaseInput] = useState(state.purchaseNumber);

  const handleQRScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setQRScanned(true, 'SUPERVISOR_QR_12345');
      setIsScanning(false);
    }, 1500);
  };

  const handleVerify = () => {
    if (!purchaseInput.trim()) return;

    setIsVerifying(true);
    setPurchaseNumber(purchaseInput);

    setTimeout(() => {
      const isValid = /^ISBN\s?978-988-9\d{3}-\d-\d$/.test(purchaseInput);
      setVerificationResult(isValid ? 'passed' : 'failed');
      setIsVerifying(false);
    }, 2000);
  };

  const handleNext = () => {
    if (state.verificationResult === 'passed') {
      setCurrentStep(4);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gold mb-2">全球啟動流程 · 步驟三</h2>
        <p className="text-muted-foreground">母源印驗證</p>
      </div>

      <div className="sacred-card p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gold">督導 QR Code 掃描</h3>

        <div className="flex flex-col items-center justify-center py-6 border-2 border-dashed border-gold-dim rounded-lg">
          {state.qrScanned ? (
            <div className="text-center">
              <div className="text-3xl mb-2">✓</div>
              <p className="text-green-ok font-semibold text-sm">QR Code 掃描完成</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-3xl mb-3 text-cyan">📱</div>
              <Button
                onClick={handleQRScan}
                disabled={isScanning}
                className="btn-gold-glow text-sm"
              >
                {isScanning ? '掃描中...' : '掃描督導 QR Code'}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="sacred-card p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gold">購書序號輸入</h3>

        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            格式範例：ISBN 978-988-9**10-1-1
          </p>
          <Input
            type="text"
            placeholder="請輸入購書序號"
            value={purchaseInput}
            onChange={(e) => setPurchaseInput(e.target.value)}
            disabled={isVerifying}
            className="bg-purple-mid/50 border-gold-dim/50 text-foreground"
          />
        </div>
      </div>

      {state.verificationResult && (
        <div
          className={`sacred-card p-6 text-center ${
            state.verificationResult === 'passed'
              ? 'border-green-ok'
              : 'border-red-err'
          }`}
        >
          {state.verificationResult === 'passed' ? (
            <>
              <div className="text-4xl mb-2 text-green-ok">✓</div>
              <p className="text-green-ok font-semibold">誓印通過</p>
              <p className="text-xs text-muted-foreground mt-2">
                誓資續承成功
              </p>
            </>
          ) : (
            <>
              <div className="text-4xl mb-2 text-red-err">✕</div>
              <p className="text-red-err font-semibold">對頻未通過</p>
              <p className="text-xs text-muted-foreground mt-2">
                請進行補誓程序
              </p>
            </>
          )}
        </div>
      )}

      <div className="flex gap-4">
        <Button
          onClick={handleVerify}
          disabled={!purchaseInput.trim() || isVerifying || state.verificationResult !== null}
          className="flex-1 btn-gold-glow"
        >
          {isVerifying ? '驗證中...' : '送出驗證'}
        </Button>
        {state.verificationResult === 'failed' && (
          <Button
            onClick={() => {
              setPurchaseInput('');
            }}
            variant="outline"
            className="flex-1"
          >
            重新輸入
          </Button>
        )}
      </div>

      {state.verificationResult === 'passed' && (
        <Button onClick={handleNext} className="w-full btn-gold-glow">
          進入下一步驟
        </Button>
      )}
    </div>
  );
}
