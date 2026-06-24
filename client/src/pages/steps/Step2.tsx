import React, { useState, useEffect } from 'react';
import { useAppState } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { content } from '@/locales/content';



const MEDITATION_TIME = 10; // seconds

export default function Step2() {
  const { state, setOathRecited, setCurrentStep } = useAppState();
  const { language } = state;
  const t = content[language];
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
        <h2 className="text-2xl font-bold text-gold mb-2">{t.step2.title}</h2>
        <p className="text-muted-foreground">{t.step2.subtitle}</p>
      </div>

      {/* Oath Text */}
      <div className="sacred-card p-8 space-y-6">
        <div className="space-y-4">
          <p className="text-muted-foreground text-center">{t.step2.instruction1}</p>
          <h3 className="text-lg font-semibold text-gold text-center">{t.step2.oathProclamationTitle}</h3>
          <div className="bg-purple-mid/50 rounded-lg p-6 border border-gold-dim/30">
            <p className="text-center text-lg leading-relaxed whitespace-pre-line font-serif text-gold">
              {t.step2.oathProclamation}
            </p>
          </div>
          <p className="text-muted-foreground text-center">{t.step2.instruction2}</p>
          <p className="text-muted-foreground text-center">{t.step2.instruction3}</p>
        </div>

        {/* Meditation Timer */}
        <div className="space-y-4">
          {!isReciting ? (
            <Button
              onClick={handleStartReciting}
              className="w-full btn-gold-glow"
            >
              {t.step2.reciteButton}
            </Button>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="text-6xl font-bold text-cyan glow-cyan">
                {timeLeft}
              </div>
              <p className="text-center text-muted-foreground">
                {t.step2.countdownText.replace('{countdown}', String(timeLeft))}
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
                  <p className="text-green-ok font-semibold mb-2">✓ {t.step2.recitationComplete}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.step2.recitationCompleteHint}
                  </p>
                </div>
              )}

              {!state.oathRecited && timeLeft > 0 && (
                <Button
                  onClick={handleSkip}
                  variant="outline"
                  className="w-full"
                >
                  {t.step2.cancelButton}
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
          {t.step2.proceedButton}
        </Button>
      </div>

      {/* Status Info */}
      <div className="text-xs text-muted-foreground text-center">
        {!state.oathRecited && (
          <p>{t.step2.instruction2}</p>
        )}
      </div>
    </div>
  );
}
