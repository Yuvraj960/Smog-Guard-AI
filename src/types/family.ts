export type MemberVulnerability = 'infant' | 'child' | 'elderly' | 'respiratory' | 'pregnant' | 'healthy_adult' | 'pet';

export interface FamilyMember {
  id: string;
  name: string;
  role: string;
  vulnerability: MemberVulnerability;
  activityLevel: 'low' | 'moderate' | 'high';
  notes?: string;
}

export interface FamilyProfile {
  familyName: string;
  homeType: 'apartment' | 'detached_house' | 'townhouse' | 'old_construction';
  floorLevel: 'ground' | 'mid_floor' | 'top_floor';
  heatingType: 'heat_pump' | 'electric_radiator' | 'natural_gas' | 'biomass_wood' | 'district_heating';
  commuteMode: 'public_transit' | 'personal_car_gasoline' | 'carpool' | 'ev' | 'cycling_walking';
  hasAirPurifier: boolean;
  members: FamilyMember[];
}

export interface RoutineItem {
  id: string;
  timeSlot: string; // e.g. "07:00 - 08:30"
  activity: string;
  category: 'commute' | 'school' | 'indoor' | 'exercise' | 'heating' | 'ventilation';
  recommendedAction: string;
  conventionalAlternative: string;
  emissionSavedGramsPM25: number;
  personalExposureAvoidedHours: number;
  inhalationDeltaUg: number;
  vulnerabilityNotice?: string;
  badge: string;
}
