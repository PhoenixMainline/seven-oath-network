import React from 'react';
import { useAppState } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

export default function Step5() {
  const { resetState } = useAppState();
  const [, setLocation] = useLocation();

  const handleEnterMain = () => {
    resetState();
    setLocation('/main');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gold mb-2">全球啟動流程 · 步驟五</h2>
        <p className="text-muted-foreground">誓頻啟動</p>
      </div>

      <div className="sacred-card p-12 text-center space-y-8">
        <div className="text-7xl animate-pulse">🎉</div>

        <div>
          <h3 className="text-4xl font-bold text-gold mb-4">誓印完成！</h3>
          <p className="text-2xl text-gold-light mb-6">
            歡迎加入七印誓網
          </p>
          <p className="text-muted-foreground text-lg">
            您已成功啟動靈性覺醒之旅
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 py-8 border-t border-b border-gold-dim/30">
          <div>
            <p className="text-xs text-muted-foreground mb-1">當前印階</p>
            <p className="text-2xl font-bold text-green-ok">消業印</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">進度</p>
            <p className="text-2xl font-bold text-cyan">1 / 7</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-green-ok">✓ 誓資已啟動</p>
          <p className="text-green-ok">✓ 七印通道已開啟</p>
          <p className="text-green-ok">✓ 靈性能量已連接</p>
        </div>
      </div>

      <Button onClick={handleEnterMain} className="w-full btn-gold-glow text-lg py-6">
        進入七印進度主頁面
      </Button>

      <div className="text-center text-xs text-muted-foreground">
        <p>願您在靈性覺醒的路上，步步光輝</p>
      </div>
    </div>
  );
}
