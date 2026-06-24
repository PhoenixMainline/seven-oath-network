import React, { useState } from 'react';
import { useAppState } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { content } from '@/locales/content';
import QRScanner from '@/components/QRScanner';

export default function Step1() {
  const { state, updateConditions, setQRScanned, setCurrentStep } = useAppState();
  const { language } = state;
  const t = content[language];
  const [showScanner, setShowScanner] = useState(false);

  const canProceed =
    state.conditions.purchaseCodeVerified &&
    state.conditions.networkStable &&
    state.qrScanned;

  const handleScanComplete = (result: string) => {
    setQRScanned(true, result);
    setShowScanner(false);
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
        <h2 className="text-2xl font-bold text-gold mb-2">{t.step1.title}</h2>
        <p className="text-muted-foreground">{t.step1.subtitle}</p>
      </div>

      {/* Prerequisites */}
      <div className="sacred-card p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gold">{t.step1.prerequisitesTitle}</h3>

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
              {t.step1.purchaseCodeVerified}
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
              {t.step1.networkStable}
            </label>
          </div>
        </div>
      </div>

      {/* QR Code Scanning */}
      <div className="sacred-card p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gold">{t.step1.qrScanTitle}</h3>

        <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-gold-dim rounded-lg">
          {state.qrScanned ? (
            <div className="text-center">
              <div className="text-4xl mb-2">✓</div>
              <p className="text-green-ok font-semibold">QR Code 掃描完成</p>
              <p className="text-xs text-muted-foreground mt-2">
                {state.scannedQRCode}
              </p>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <img
                src="/qr-code.png"
                alt="誓導 QR Code"
                className="w-48 h-48 mx-auto border-2 border-gold rounded-lg"
              />
              <p className="text-muted-foreground text-sm">{t.step1.qrScanInstruction}</p>
              <Button
                onClick={() => setShowScanner(true)}
                className="btn-gold-glow"
              >
                {t.step1.qrScanButton}
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
          {t.step1.proceedButton}
        </Button>
      </div>

      {/* Status Info */}
      <div className="text-xs text-muted-foreground text-center">
        {!canProceed && (
          <p>
            {t.step1.statusInfo}
          </p>
        )}
      </div>

      {/* QR Scanner Modal */}
      {showScanner && (
        <QRScanner
          onScanComplete={handleScanComplete}
          onCancel={() => setShowScanner(false)}
        />
      )}
    </div>
  );
}
