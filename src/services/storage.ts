import { FamilyProfile } from '../types/family';
import { CorsiRosenthalConfig } from '../types/iaq';

const STORAGE_KEYS = {
  FAMILY_PROFILE: 'smogguard_family_profile',
  GEMINI_API_KEY: 'smogguard_gemini_api_key',
  LAST_LOCATION: 'smogguard_last_location',
  CLEAN_ROOM_PROGRESS: 'smogguard_clean_room_progress',
  COMMUNITY_PLEDGES: 'smogguard_community_pledges',
  CORSI_CONFIG: 'smogguard_corsi_config',
};

export const DEFAULT_FAMILY_PROFILE: FamilyProfile = {
  familyName: 'Sharma Family',
  homeType: 'apartment',
  floorLevel: 'mid_floor',
  heatingType: 'electric_radiator',
  commuteMode: 'personal_car_gasoline',
  hasAirPurifier: true,
  members: [
    {
      id: 'm1',
      name: 'Aarav (Child)',
      role: 'Child (6 yrs)',
      vulnerability: 'child',
      activityLevel: 'high',
      notes: 'Mild seasonal bronchitis / cough during winter'
    },
    {
      id: 'm2',
      name: 'Grandmother',
      role: 'Elderly (71 yrs)',
      vulnerability: 'elderly',
      activityLevel: 'low',
      notes: 'COPD history, sensitive to fine particulate'
    },
    {
      id: 'm3',
      name: 'Priya (Parent)',
      role: 'Working Parent',
      vulnerability: 'healthy_adult',
      activityLevel: 'moderate',
      notes: 'Daily office commuter'
    }
  ]
};

export const DEFAULT_CORSI_CONFIG: CorsiRosenthalConfig = {
  roomWidthFeet: 15,
  roomLengthFeet: 14,
  ceilingHeightFeet: 9,
  fanCFM: 1800,
  filterCount: 4,
  filterMERV: 13,
  filterThicknessInches: 2,
  fanSpeed: 'medium'
};

export function getStoredFamilyProfile(): FamilyProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAMILY_PROFILE);
    if (!raw) return DEFAULT_FAMILY_PROFILE;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_FAMILY_PROFILE;
  }
}

export function saveStoredFamilyProfile(profile: FamilyProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.FAMILY_PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save family profile to local storage', e);
  }
}

export function getStoredGeminiKey(): string {
  try {
    return localStorage.getItem(STORAGE_KEYS.GEMINI_API_KEY) || (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
  } catch {
    return '';
  }
}

export function saveStoredGeminiKey(key: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.GEMINI_API_KEY, key.trim());
  } catch (e) {
    console.error('Failed to save Gemini key', e);
  }
}

export function getStoredCorsiConfig(): CorsiRosenthalConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CORSI_CONFIG);
    if (!raw) return DEFAULT_CORSI_CONFIG;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_CORSI_CONFIG;
  }
}

export function saveStoredCorsiConfig(config: CorsiRosenthalConfig): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CORSI_CONFIG, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save Corsi config', e);
  }
}

export function getStoredCompletedChecklist(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CLEAN_ROOM_PROGRESS);
    return raw ? JSON.parse(raw) : ['c1', 'c2'];
  } catch {
    return ['c1', 'c2'];
  }
}

export function saveStoredCompletedChecklist(completedIds: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CLEAN_ROOM_PROGRESS, JSON.stringify(completedIds));
  } catch (e) {
    console.error('Failed to save checklist progress', e);
  }
}

export function getStoredPledges(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMMUNITY_PLEDGES);
    return raw ? JSON.parse(raw) : ['p1'];
  } catch {
    return ['p1'];
  }
}

export function saveStoredPledges(pledgeIds: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.COMMUNITY_PLEDGES, JSON.stringify(pledgeIds));
  } catch (e) {
    console.error('Failed to save pledges', e);
  }
}
