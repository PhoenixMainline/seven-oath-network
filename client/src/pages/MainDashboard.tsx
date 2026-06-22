import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SEALS } from '@/types';

export default function MainDashboard() {
  const [activeTab, setActiveTab] = useState('seals');

  const completedSeals = SEALS.filter((s) => s.status === 'completed').length;
  const progressPercentage = (completedSeals / SEALS.length) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="py-6 px-4 border-b border-gold-dim/30 sticky top-0 z-10">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gold">七印誓網</h1>
              <p className="text-sm text-muted-foreground">印階進度</p>
            </div>
            <Button variant="outline" className="text-xs">
              個人頁面
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div className="container max-w-4xl">
          {/* Progress Overview */}
          <div className="sacred-card p-8 mb-8">
            <h2 className="text-xl font-bold text-gold mb-6">整體進度</h2>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">完成進度</span>
                <span className="text-lg font-bold text-cyan">{progressPercentage.toFixed(0)}%</span>
              </div>
              <div className="progress-gold">
                <div
                  className="progress-gold-fill"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-ok">{completedSeals}</p>
                <p className="text-xs text-muted-foreground">已完成</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-cyan">{SEALS.length - completedSeals}</p>
                <p className="text-xs text-muted-foreground">進行中</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gold">{SEALS.length}</p>
                <p className="text-xs text-muted-foreground">總計</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="seals">七印進度</TabsTrigger>
              <TabsTrigger value="resources">天庫資糧</TabsTrigger>
              <TabsTrigger value="oaths">誓文資料庫</TabsTrigger>
            </TabsList>

            {/* Seven Seals Tab */}
            <TabsContent value="seals" className="space-y-4">
              {SEALS.map((seal) => (
                <div key={seal.id} className="sacred-card p-6 hover:border-gold transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            seal.status === 'completed'
                              ? 'bg-green-ok text-purple-deep'
                              : seal.status === 'active'
                              ? 'bg-gold text-purple-deep'
                              : 'bg-purple-light text-muted-foreground'
                          }`}
                        >
                          {seal.status === 'completed' ? '✓' : seal.id}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gold">
                            {seal.chineseName}
                          </h3>
                          <p className="text-xs text-muted-foreground">{seal.name}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {seal.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          seal.status === 'completed'
                            ? 'bg-green-ok/20 text-green-ok'
                            : seal.status === 'active'
                            ? 'bg-gold/20 text-gold'
                            : 'bg-purple-light/20 text-muted-foreground'
                        }`}
                      >
                        {seal.status === 'completed'
                          ? '已通過'
                          : seal.status === 'active'
                          ? '進行中'
                          : '未啟動'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources">
              <div className="sacred-card p-8 text-center space-y-6">
                <h3 className="text-xl font-bold text-gold">天庫資糧 · 誓資狀態</h3>
                <div className="text-6xl font-bold text-cyan">78%</div>
                <p className="text-muted-foreground">誓資能量值</p>
                <div className="space-y-2">
                  <p className="text-sm text-green-ok">✓ 撥補通道已開啟</p>
                  <p className="text-xs text-muted-foreground">
                    最後更新：2026-06-22 14:30
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Oaths Tab */}
            <TabsContent value="oaths">
              <div className="sacred-card p-8">
                <h3 className="text-xl font-bold text-gold mb-6">誓文資料庫</h3>
                <div className="space-y-4">
                  {SEALS.map((seal) => (
                    <div
                      key={seal.id}
                      className="border border-gold-dim/30 rounded-lg p-4 hover:border-gold transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gold">{seal.chineseName}</h4>
                        <Button variant="ghost" size="sm" className="text-xs">
                          已誦讀
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">{seal.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
