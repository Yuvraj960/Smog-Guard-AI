export interface CorsiRosenthalConfig {
  roomWidthFeet: number;
  roomLengthFeet: number;
  ceilingHeightFeet: number;
  fanCFM: number;           // Standard 20" box fan is ~1800-2000 CFM on high, ~1000 CFM throttled by filters
  filterCount: 4 | 5;       // 4-filter cube or 5-filter (Comparetto cube)
  filterMERV: 13 | 14;      // MERV 13 is the gold standard for PM2.5
  filterThicknessInches: 1 | 2; // 2" provides less resistance and longer life
  fanSpeed: 'low' | 'medium' | 'high';
}

export interface CorsiRosenthalOutput {
  roomVolumeCuFt: number;
  roomVolumeM3: number;
  achRequired: number;       // Air Changes per Hour (target 4 to 6 for smoggy days)
  effectiveCADR: number;     // Clean Air Delivery Rate (CFM)
  estimatedACHAchieved: number;
  smogClearanceTimeMinutes: number; // Time to drop PM2.5 by 80%
  totalBuildCostUSD: number;
  commercialPurifierCostEquiv: number;
  savingsUSD: number;
  estimatedWattage: number;
  monthlyElectricityCostUSD: number;
  filterLifespanMonths: number;
}

export interface CleanRoomStep {
  id: string;
  category: 'sealing' | 'purification' | 'behavior' | 'ventilation';
  title: string;
  instruction: string;
  diyMaterial: string;
  impactScore: 'High' | 'Critical' | 'Medium';
  completed: boolean;
}

export interface IAQMyth {
  id: string;
  myth: string;
  verdict: 'Busted' | 'Confirmed' | 'Partial Truth';
  scientificExplanation: string;
  practicalTakeaway: string;
  citation: string;
}
