import React, { useState } from 'react';
import { X, Users, Plus, Trash2, Home, Car, Flame, Shield, Check } from 'lucide-react';
import { FamilyProfile, FamilyMember, MemberVulnerability } from '../../types/family';

interface FamilyProfileModalProps {
  isOpen: boolean;
  profile: FamilyProfile;
  onClose: () => void;
  onSave: (updated: FamilyProfile) => void;
}

export const FamilyProfileModal: React.FC<FamilyProfileModalProps> = ({
  isOpen,
  profile,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<FamilyProfile>({ ...profile });
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Child');
  const [newMemberVuln, setNewMemberVuln] = useState<MemberVulnerability>('child');

  if (!isOpen) return null;

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    const newMember: FamilyMember = {
      id: 'm_' + Date.now(),
      name: newMemberName.trim(),
      role: newMemberRole,
      vulnerability: newMemberVuln,
      activityLevel: 'moderate'
    };
    setFormData(prev => ({
      ...prev,
      members: [...prev.members, newMember]
    }));
    setNewMemberName('');
  };

  const handleRemoveMember = (id: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.filter(m => m.id !== id)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">Household & Lifestyle Profile</h3>
              <p className="text-xs text-slate-400">
                Tailors smog defense strategies, CADR requirements, and commute guidance.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Family Name */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Household Name
            </label>
            <input
              type="text"
              value={formData.familyName}
              onChange={(e) => setFormData({ ...formData, familyName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-teal-500"
              required
            />
          </div>

          {/* Members List */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Family Members & Vulnerabilities ({formData.members.length})
            </label>
            <div className="space-y-2 mb-3">
              {formData.members.map(member => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800/80"
                >
                  <div>
                    <span className="text-sm font-semibold text-slate-200">{member.name}</span>
                    <span className="ml-2 text-xs text-slate-400">({member.role})</span>
                    <span className={`ml-2 px-2 py-0.5 rounded text-[10px] font-bold ${
                      member.vulnerability === 'infant' || member.vulnerability === 'elderly' || member.vulnerability === 'respiratory'
                        ? 'bg-rose-950/60 text-rose-300 border border-rose-800/60'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {member.vulnerability}
                    </span>
                  </div>
                  {formData.members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(member.id)}
                      className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Member inline form */}
            <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
              <input
                type="text"
                placeholder="Name (e.g. Maya)"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                className="sm:col-span-4 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200"
              />
              <input
                type="text"
                placeholder="Role (e.g. Toddler, Parent)"
                value={newMemberRole}
                onChange={(e) => setNewMemberRole(e.target.value)}
                className="sm:col-span-3 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200"
              />
              <select
                value={newMemberVuln}
                onChange={(e) => setNewMemberVuln(e.target.value as MemberVulnerability)}
                className="sm:col-span-3 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200"
              >
                <option value="infant">Infant (&lt;2 yr)</option>
                <option value="child">Child (School age)</option>
                <option value="elderly">Elderly (65+)</option>
                <option value="respiratory">Asthma / COPD</option>
                <option value="pregnant">Pregnant Mother</option>
                <option value="healthy_adult">Healthy Adult</option>
                <option value="pet">Pet (Dog/Cat)</option>
              </select>
              <button
                type="button"
                onClick={handleAddMember}
                className="sm:col-span-2 py-1.5 px-3 rounded-lg bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Home & Lifestyle Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Home Type */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                <Home className="w-3.5 h-3.5 text-teal-400" />
                <span>Dwelling Type</span>
              </label>
              <select
                value={formData.homeType}
                onChange={(e) => setFormData({ ...formData, homeType: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
              >
                <option value="apartment">Apartment (Standard sealing)</option>
                <option value="detached_house">Detached Single Family House</option>
                <option value="townhouse">Townhouse / Row House</option>
                <option value="old_construction">Older / Leaky Construction (High Drafts)</option>
              </select>
            </div>

            {/* Commute Mode */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                <Car className="w-3.5 h-3.5 text-cyan-400" />
                <span>Primary Commute</span>
              </label>
              <select
                value={formData.commuteMode}
                onChange={(e) => setFormData({ ...formData, commuteMode: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
              >
                <option value="personal_car_gasoline">Personal Gasoline/Diesel Car (Solo)</option>
                <option value="carpool">Neighborhood Carpool / Rideshare</option>
                <option value="public_transit">Public Transit (Metro / Bus)</option>
                <option value="ev">Electric Vehicle (EV)</option>
                <option value="cycling_walking">Cycling or Walking</option>
              </select>
            </div>

            {/* Heating Type */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Primary Winter Heating</span>
              </label>
              <select
                value={formData.heatingType}
                onChange={(e) => setFormData({ ...formData, heatingType: e.target.value as any })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200"
              >
                <option value="electric_radiator">Electric Ceramic / Radiator (Clean)</option>
                <option value="heat_pump">Heat Pump / Inverter AC (Cleanest)</option>
                <option value="natural_gas">Natural Gas Central Heating</option>
                <option value="biomass_wood">Fireplace / Wood / Biomass (High PM2.5)</option>
                <option value="district_heating">Municipal District Heating</option>
              </select>
            </div>

            {/* Air Purifier Checkbox */}
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-950 border border-slate-800 self-end">
              <input
                type="checkbox"
                id="hasPurifier"
                checked={formData.hasAirPurifier}
                onChange={(e) => setFormData({ ...formData, hasAirPurifier: e.target.checked })}
                className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 bg-slate-900 border-slate-700"
              />
              <label htmlFor="hasPurifier" className="text-xs text-slate-300 cursor-pointer">
                We currently own at least one HEPA air purifier or DIY box fan
              </label>
            </div>
          </div>

          {/* Footer Save Button */}
          <div className="pt-4 border-t border-slate-800 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 font-bold text-xs transition-colors flex items-center space-x-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save & Update Routine</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
