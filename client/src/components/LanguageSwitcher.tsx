import React from 'react';
import { useAppState } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';

export default function LanguageSwitcher() {
  const { state, setLanguage } = useAppState();

  const toggleLanguage = () => {
    setLanguage(state.language === 'zh' ? 'en' : 'zh');
  };

  return (
    <Button
      onClick={toggleLanguage}
      variant="ghost"
      className="text-gold hover:bg-gold-dim hover:text-gold-foreground"
    >
      {state.language === 'zh' ? 'English' : '中文'}
    </Button>
  );
}
