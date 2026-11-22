export interface ImpactMetrics {
  personalExposureAvoidedHours: number;
  personalPM25InhaledAvoidedUg: number;
  co2EmissionsSavedKg: number;
  pm25EmissionsPreventedGrams: number;
  cigaretteEquivalentsAvoided: number;
}

export interface CommunityPledge {
  id: string;
  category: 'transit' | 'heating' | 'school' | 'monitoring';
  title: string;
  description: string;
  impactPerHouseholdWeekly: {
    co2Kg: number;
    pm25Grams: number;
  };
  pledged: boolean;
  participantCount: number;
}
