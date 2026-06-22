/**
 * Seven Oath Network - Type Definitions
 * 七印誓網應用的數據類型定義
 */

export type StepType = 1 | 2 | 3 | 4 | 5;

export type SealStatus = 'inactive' | 'active' | 'completed';

export interface AppState {
  currentStep: StepType;
  conditions: {
    purchaseCodeVerified: boolean;
    networkStable: boolean;
  };
  qrScanned: boolean;
  scannedQRCode: string;
  oathRecited: boolean;
  verificationResult: 'pending' | 'passed' | 'failed' | null;
  purchaseNumber: string;
  seals: {
    [key: number]: SealStatus;
  };
}

export interface Seal {
  id: number;
  name: string;
  chineseName: string;
  description: string;
  status: SealStatus;
}

export const SEALS: Seal[] = [
  {
    id: 1,
    name: 'Karma Seal',
    chineseName: '消業印',
    description: '清淨業障，開啟靈性之路',
    status: 'inactive',
  },
  {
    id: 2,
    name: 'Heart Seal',
    chineseName: '修心印',
    description: '修養心性，開發內在力量',
    status: 'inactive',
  },
  {
    id: 3,
    name: 'Vow Seal',
    chineseName: '守願印',
    description: '堅守誓願，實踐精神承諾',
    status: 'inactive',
  },
  {
    id: 4,
    name: 'Oath Seal',
    chineseName: '誓令印',
    description: '誓言啟動，激發靈性能量',
    status: 'inactive',
  },
  {
    id: 5,
    name: 'Awakening Seal',
    chineseName: '覺醒印',
    description: '覺醒意識，提升靈性境界',
    status: 'inactive',
  },
  {
    id: 6,
    name: 'Disciple Seal',
    chineseName: '誥徒誓印',
    description: '誓成弟子，承擔靈性使命',
    status: 'inactive',
  },
  {
    id: 7,
    name: 'Phoenix Seal',
    chineseName: '鳳徽印',
    description: '鳳凰涅槃，完成靈性蛻變',
    status: 'inactive',
  },
];
