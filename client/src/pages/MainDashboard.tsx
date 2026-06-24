import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SEALS } from '@/types';
import { content } from '@/locales/content';
import { useAppState } from '@/contexts/AppContext';

export default function MainDashboard() {
  const { state } = useAppState();
  const { language } = state;
  const t = content[language];
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
              <p className="text-sm text-muted-foreground">{t.mainDashboard.overallProgress}</p>
            </div>
            <Button variant="outline" className="text-xs">
              {t.mainDashboard.personalPage}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4">
        <div className="container max-w-4xl">
          {/* Progress Overview */}
          <div className="sacred-card p-8 mb-8">
            <h2 className="text-xl font-bold text-gold mb-6">{t.mainDashboard.overallProgress}</h2>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">{t.mainDashboard.completionProgress}</span>
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
                <p className="text-xs text-muted-foreground">{t.mainDashboard.completed}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-cyan">{SEALS.length - completedSeals}</p>
                <p className="text-xs text-muted-foreground">{t.mainDashboard.inProgress}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gold">{SEALS.length}</p>
                <p className="text-xs text-muted-foreground">{t.mainDashboard.total}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="seals">{t.mainDashboard.sevenSealsProgress}</TabsTrigger>
              <TabsTrigger value="resources">{t.mainDashboard.heavenlyTreasury}</TabsTrigger>
              <TabsTrigger value="oaths">{t.mainDashboard.oathDatabase}</TabsTrigger>
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
                            {t.seals[seal.id - 1].name}
                          </h3>
                          <p className="text-xs text-muted-foreground">{t.seals[seal.id - 1].description}</p>
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
                          ? t.mainDashboard.completed
                          : seal.status === 'active'
                          ? t.mainDashboard.inProgress
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
                <h3 className="text-xl font-bold text-gold">{t.mainDashboard.heavenlyTreasury}</h3>
                <div className="text-6xl font-bold text-cyan">78%</div>
                <p className="text-muted-foreground">{t.mainDashboard.heavenlyTreasuryEnergy}</p>
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
                <h3 className="text-xl font-bold text-gold mb-6">{t.mainDashboard.oathDatabaseTitle}</h3>
                <p className="text-muted-foreground mb-6">{t.mainDashboard.oathDatabaseDescription}</p>
                <div className="space-y-4">
                  {SEALS.map((seal) => (
                    <div
                      key={seal.id}
                      className="border border-gold-dim/30 rounded-lg p-4 hover:border-gold transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gold">{t.seals[seal.id - 1].name}</h4>
                        <Button variant="ghost" size="sm" className="text-xs">
                          {t.mainDashboard.completed}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">{t.seals[seal.id - 1].description}</p>
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
