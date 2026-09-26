"use client";

import React, { useState } from "react";
import { BusinessInfo } from "@/backend/models/types";
import { Save, ShieldCheck } from "lucide-react";

interface AdminStoreSettingsProps {
  business: BusinessInfo;
  onSaveBusiness: (updated: Partial<BusinessInfo>) => void;
}

export default function AdminStoreSettings({
  business,
  onSaveBusiness,
}: AdminStoreSettingsProps) {
  const [name, setName] = useState(business.name);
  const [phone, setPhone] = useState(business.phone);
  const [address, setAddress] = useState(business.address);
  const [hours, setHours] = useState(business.hours);
  const [announcement, setAnnouncement] = useState(business.heroAnnouncement);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveBusiness({
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      hours: hours.trim(),
      heroAnnouncement: announcement.trim(),
    });
  };

  return (
    <div className="max-w-2xl bg-surface-1 border border-white/10 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
        <div>
          <h3 className="font-display font-bold text-lg text-white">
            Store Profile & Operating Details
          </h3>
          <p className="text-xs text-slate-400">
            Configure verified business details for Dharshini Crackers Tiruvallur.
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-bold text-emerald-400">
          <ShieldCheck size={13} />
          <span>Tiruvallur Verified</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Store Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Verified Phone Number
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Showroom Address (Tiruvallur, TN)
          </label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Daily Operating Hours
            </label>
            <input
              type="text"
              required
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Google Maps Rating
            </label>
            <input
              type="text"
              disabled
              value={`${business.googleRating} / 5 (${business.googleReviewCount} reviews)`}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-400 cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Announcement Strip Message
          </label>
          <input
            type="text"
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
          />
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            type="submit"
            className="btn btn-primary px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md shadow-brand-purple/30 hover:scale-[1.02] active:scale-95 transition-transform"
          >
            <Save size={14} />
            <span>Save Store Details</span>
          </button>
        </div>
      </form>
    </div>
  );
}
