"use client";

import React from "react";
import Link from "next/link";
import { Store, LogOut, CheckCircle2 } from "lucide-react";

interface AdminHeaderProps {
  onLogout: () => void;
  saveSuccess?: boolean;
}

export default function AdminHeader({ onLogout, saveSuccess }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-surface-1/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-purple to-brand-gold flex items-center justify-center font-display font-extrabold text-obsidian text-sm">
          D
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-sm text-white leading-none">
              DHARSHINI CRACKERS
            </span>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider text-brand-purpleLight bg-brand-purple/20 border border-brand-purple/40">
              Admin Panel
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
            Tiruvallur Store Management
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        {saveSuccess && (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[11px] text-emerald-400 font-bold animate-in fade-in">
            <CheckCircle2 size={13} />
            <span>Saved Live</span>
          </span>
        )}

        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Showroom: 8 AM – 8 PM</span>
        </div>

        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 hover:text-white border border-white/10 transition-colors"
        >
          <Store size={14} className="text-brand-gold" />
          <span className="hidden sm:inline">View Showroom</span>
        </Link>

        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/20 transition-colors"
          title="Sign out of admin"
        >
          <LogOut size={13} />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
}
