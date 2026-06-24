import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useQRScanner } from '@/hooks/useQRScanner';

interface QRScannerProps {
  onScanComplete: (result: string) => void;
  onCancel: () => void;
}

export default function QRScanner({ onScanComplete, onCancel }: QRScannerProps) {
  const { videoRef, canvasRef, isScanning, scannedResult, error, startScanning, stopScanning } =
    useQRScanner({
      onScan: (result) => {
        onScanComplete(result);
      },
    });

  useEffect(() => {
    startScanning();
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-purple-deep rounded-lg p-6 max-w-md w-full mx-4 space-y-4">
        <h3 className="text-lg font-semibold text-gold text-center">掃描 QR Code</h3>

        {/* Video Stream */}
        <div className="relative bg-black rounded-lg overflow-hidden aspect-square">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <canvas ref={canvasRef} className="hidden" />

          {/* Scanning Frame Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-64 h-64">
              {/* Corner markers */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan"></div>

              {/* Scanning line animation */}
              <div className="absolute inset-0 overflow-hidden rounded">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-cyan to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="bg-red-err/20 border border-red-err rounded-lg p-3 text-center">
            <p className="text-red-err text-sm">{error}</p>
          </div>
        )}

        {scannedResult && (
          <div className="bg-green-ok/20 border border-green-ok rounded-lg p-3 text-center">
            <p className="text-green-ok text-sm font-semibold">✓ 掃描成功</p>
            <p className="text-green-ok text-xs mt-1">{scannedResult}</p>
          </div>
        )}

        {!error && !scannedResult && (
          <div className="text-center text-muted-foreground text-sm">
            <p>將 QR Code 對準掃描框</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1"
          >
            取消
          </Button>
          {scannedResult && (
            <Button
              onClick={() => onScanComplete(scannedResult)}
              className="flex-1 btn-gold-glow"
            >
              確認
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
