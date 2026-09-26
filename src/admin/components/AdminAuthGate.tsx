"use client";

import React, { useState } from "react";
import { Lock, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

interface AdminAuthGateProps {
  onAuthenticated: () => void;
}

export default function AdminAuthGate({ onAuthenticated }: AdminAuthGateProps) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === "admin123") {
      onAuthenticated();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-1 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-brand-purple/15 border border-brand-purple/30 text-brand-purpleLight flex items-center justify-center mx-auto mb-5 shadow-lg shadow-brand-purple/20">
            <Lock size={24} />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-gold block mb-1">
            Dharshini Crackers · Tiruvallur
          </span>
          <h1 className="font-display font-extrabold text-2xl text-white mb-2">
            Store Owner Portal
          </h1>
          <p className="text-xs text-slate-400 mb-8 leading-relaxed">
            Enter your management passcode to access live catalog controls, order inquiries, and store information.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Passcode (default: admin123)"
                className={`w-full px-4 py-3 rounded-2xl bg-white/5 border text-sm text-white text-center tracking-widest focus:outline-none transition-colors ${
                  error
                    ? "border-rose-500 bg-rose-500/10 text-rose-200"
                    : "border-white/10 focus:border-brand-purple"
                }`}
                autoFocus
              />
              {error && (
                <p className="text-[11px] text-rose-400 mt-1.5 animate-in fade-in">
                  Incorrect passcode. Try: admin123
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full btn btn-primary py-3 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-brand-purple/40 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <span>Unlock Admin Panel</span>
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
            <Link href="/" className="hover:text-white transition-colors">
              ← Back to Showroom
            </Link>
            <div className="flex items-center gap-1 text-[11px]">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span>Secure Local Portal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
