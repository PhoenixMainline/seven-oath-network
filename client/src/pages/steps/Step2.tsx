import React, { useState, useEffect } from 'react';
import { useAppState } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';

const OATH_TEXT = `吾以誠心，立此誓言。
願以光輝之印，守護靈性之路。
誓印啟動，覺醒開始。
七印相連，通往圓滿。`;

const MEDITATION_TIME = 10; // seconds

export default function Step2() {
  const { state, setOathRecited, setCurrentStep } = useAppState();
  const [timeLeft, setTimeLeft] = useState(MEDITATION_TIME);
  const [isReciting, setIsReciting] = useState(false);

  useEffect(() => {
    if (!isReciting) return;

    if (timeLeft <= 0) {
      setOathRecited(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, isReciting, setOathRecited]);

  const handleStartReciting = () => {
    setIsReciting(true);
    setTimeLeft(MEDITATION_TIME);
  };

  const handleNext = () => {
    if (state.oathRecited) {
      setCurrentStep(3);
    }
  };

  const handleSkip = () => {
    setIsReciting(false);
    setTimeLeft(MEDITATION_TIME);
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-gold mb-2">全球啟動流程 · 步驟二</h2>
        <p className="text-muted-foreground">授權誓讀</p>
      </div>

      {/* Oath Text */}
      <div className="sacred-card p-8 space-y-6">
        <h3 className="text-lg font-semibold text-gold text-center">主頻啟令誓文</h3>

        <div className="bg-purple-mid/50 rounded-lg p-6 border border-gold-dim/30">
          <p className="text-center text-lg leading-relaxed whitespace-pre-line font-serif text-gold">
            {OATH_TEXT}
          </p>
        </div>

        {/* Meditation Timer */}
        <div className="space-y-4">
          {!isReciting ? (
            <Button
              onClick={handleStartReciting}
              className="w-full btn-gold-glow"
            >
              開始靜心誦讀
            </Button>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="text-6xl font-bold text-cyan glow-cyan">
                {timeLeft}
              </div>
              <p className="text-center text-muted-foreground">
                靜心誦讀 {MEDITATION_TIME} 秒
              </p>

              {/* Progress Bar */}
              <div className="w-full progress-gold">
                <div
                  className="progress-gold-fill"
                  style={{
                    width: `${((MEDITATION_TIME - timeLeft) / MEDITATION_TIME) * 100}%`,
                  }}
                />
              </div>

              {state.oathRecited && (
                <div className="text-center">
                  <p className="text-green-ok font-semibold mb-2">✓ 誦讀完成</p>
                  <p className="text-xs text-muted-foreground">
                    誓文已銘刻於心
                  </p>
                </div>
              )}

              {!state.oathRecited && timeLeft > 0 && (
                <Button
                  onClick={handleSkip}
                  variant="outline"
                  className="w-full"
                >
                  取消
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={handleNext}
          disabled={!state.oathRecited}
          className="flex-1 btn-gold-glow"
        >
          進入下一步驟
        </Button>
      </div>

      {/* Status Info */}
      <div className="text-xs text-muted-foreground text-center">
        {!state.oathRecited && (
          <p>請完成靜心誦讀後才能繼續</p>
        )}
      </div>
    </div>
  );
}
