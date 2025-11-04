export type DealStage = 
  | 'Prospecting'
  | 'Active Discussions' 
  | 'Site Approved'
  | 'LOI'
  | 'IC Approved'
  | 'In Legal'
  | 'Executed'
  | 'On Hold'
  | 'Dead'
  | 'Withdrawn';

export type DealType = 'Direct' | 'Sublease' | 'Coworking';

export type DealBrand = 'Sike' | 'Mytherous';

export interface Deal {
  id: string;
  address: string;
  city: string;
  state: string;
  country: string;
  broker: string;
  bdd: string;
  dealNumber: number;
  status: DealStage;
  brand: DealBrand;
  ncoExisting: 'NCO' | 'Existing' | 'Takeover';
  dealType: DealType;
  notes: string;
  rsf: string;
  owner: string;
}

export interface WeeklyHistory {
  week: string;
  stage: DealStage;
}

export interface DealWithHistory extends Deal {
  weeklyHistory: WeeklyHistory[];
}

export const DEAL_STAGES: DealStage[] = [
  'Prospecting',
  'Active Discussions', 
  'Site Approved',
  'LOI',
  'IC Approved',
  'In Legal',
  'Executed',
  'On Hold',
  'Dead',
  'Withdrawn'
];

export const STAGE_DESCRIPTIONS: Record<DealStage, string> = {
  'Prospecting': 'Initial identification and outreach to potential locations',
  'Active Discussions': 'Preliminary negotiations and interest confirmed',
  'Site Approved': 'Location has been vetted and approved internally',
  'LOI': 'Terms being negotiated, LOI sent or received',
  'IC Approved': 'Deal approved by investment committee',
  'In Legal': 'Legal documentation and lease drafting in progress',
  'Executed': 'Deal completed and signed',
  'On Hold': 'Deal temporarily paused or delayed',
  'Dead': 'Deal terminated or fell through',
  'Withdrawn': 'Deal pulled by either party before completion'
};

export const STAGE_COLORS: Record<DealStage, string> = {
  'Prospecting': 'hsl(200 80% 60%)',
  'Active Discussions': 'hsl(210 80% 55%)',
  'Site Approved': 'hsl(120 60% 50%)',
  'LOI': 'hsl(35 100% 60%)',
  'IC Approved': 'hsl(260 80% 60%)',
  'In Legal': 'hsl(50 100% 60%)',
  'Executed': 'hsl(120 80% 40%)',
  'On Hold': 'hsl(220 10% 50%)',
  'Dead': 'hsl(0 70% 55%)',
  'Withdrawn': 'hsl(0 80% 40%)'
};