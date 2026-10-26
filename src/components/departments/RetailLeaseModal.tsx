import React, { useState } from 'react';
import { X, Building2, Check, Send } from 'lucide-react';

interface RetailLeaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RetailLeaseModal: React.FC<RetailLeaseModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    businessName: '',
    category: 'Specialty Food & Beverage',
    spaceSize: 'Standard Kiosk (15 - 25 sqm)',
    contactPerson: '',
    phone: '',
    email: '',
    proposalNotes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#091224] border border-blue-900/60 rounded-3xl shadow-2xl overflow-hidden my-auto p-7 sm:p-10">
        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900/40 border border-blue-500/40 text-blue-400 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">Commercial Leasing Application</h3>
              <p className="text-xs font-mono text-slate-400">Master Energy Promenade · Naze, Imo State</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-bold text-white font-display">Leasing Proposal Received!</h4>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Thank you for applying to join the commercial promenade at Master Energy Naze. Our Commercial Real Estate directorate will review your application and reach out within 48 hours with lease terms and space availability.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition-colors cursor-pointer mt-4"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Brand or Business Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Blossom Patisserie"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:border-blue-400 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Retail Sector Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:border-blue-400 outline-none"
                >
                  <option value="Specialty Food & Beverage">Specialty Food & Beverage</option>
                  <option value="Pharmacy & Health Store">Pharmacy & Health Store</option>
                  <option value="Banking & ATM Gallery">Banking & ATM Gallery</option>
                  <option value="Electronics & Accessories">Electronics & Mobile Accessories</option>
                  <option value="Courier & Logistics Agency">Courier & Logistics Desk</option>
                  <option value="Other Commercial Concept">Other Commercial Concept</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Space Requirement</label>
                <select
                  value={formData.spaceSize}
                  onChange={(e) => setFormData({ ...formData, spaceSize: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:border-blue-400 outline-none"
                >
                  <option value="Outdoor Kiosk (12 - 20 sqm)">Outdoor Kiosk (12 - 20 sqm)</option>
                  <option value="Standard Retail Suite (35 - 60 sqm)">Standard Retail Suite (35 - 60 sqm)</option>
                  <option value="Anchor Showroom (100+ sqm)">Anchor Showroom (100+ sqm)</option>
                  <option value="ATM / POS Pod (4 - 8 sqm)">ATM / POS Pod (4 - 8 sqm)</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Contact Person Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:border-blue-400 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Phone Number (Nigeria) *</label>
                <input
                  type="tel"
                  required
                  placeholder="+234 800 000 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:border-blue-400 outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Business Email *</label>
                <input
                  type="email"
                  required
                  placeholder="contact@brand.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:border-blue-400 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Brief Business Concept & Products</label>
              <textarea
                rows={3}
                placeholder="Briefly describe what your business will offer to travelers and residents at Naze Hub..."
                value={formData.proposalNotes}
                onChange={(e) => setFormData({ ...formData, proposalNotes: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:border-blue-400 outline-none resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-red-600/25"
              >
                <Send className="w-4 h-4" />
                <span>Submit Retail Lease Expression of Interest</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
