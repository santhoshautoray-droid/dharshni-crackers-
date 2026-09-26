"use client";

import React from "react";
import { ShieldCheck, Compass, Eye, Droplets, Users, Ban, Clock } from "lucide-react";

export default function SafetySection() {
  const guidelines = [
    {
      icon: <Compass size={22} className="text-brand-purpleLight" />,
      title: "Outdoor Open Clearances Only",
      desc: "Always ignite fireworks in open grounds away from dry grass, temporary sheds, parked vehicles, and overhead electric wires.",
    },
    {
      icon: <Eye size={22} className="text-brand-gold" />,
      title: "Safe Viewing Perimeter",
      desc: "Maintain a minimum distance of 5 meters for ground novelties (chakkars and flower pots), and at least 15 meters for aerial repeaters.",
    },
    {
      icon: <Droplets size={22} className="text-sky-400" />,
      title: "Water & Sand Ready at Hand",
      desc: "Keep buckets of clean water and sand immediately beside the launch spot. Immerse hot spent sparkler metal wires in water immediately after use.",
    },
    {
      icon: <Users size={22} className="text-emerald-400" />,
      title: "Adult Supervision Mandatory",
      desc: "Children must always celebrate under attentive adult supervision. Never allow young children to handle open flame matches or aerial fuses.",
    },
    {
      icon: <Ban size={22} className="text-rose-400" />,
      title: "Never Relight a Dud",
      desc: "If a firework fails to ignite or complete its burst, do not approach immediately. Wait at least 20 minutes before soaking with water.",
    },
    {
      icon: <Clock size={22} className="text-amber-400" />,
      title: "Observe Permitted Timings",
      desc: "Respect the prescribed festive celebration windows and noise decibel standards set forth by local Tamil Nadu authorities.",
    },
  ];

  return (
    <section id="safety" className="py-20 md:py-28 relative z-20 border-b border-white/5 bg-surface-1/30" aria-label="Safety Guidelines">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-gold bg-brand-gold/10 border border-brand-gold/20 mb-3">
            <ShieldCheck size={13} className="text-brand-gold" />
            <span>RESPONSIBLE CELEBRATION</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            SAFETY & HANDLING STANDARDS
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            The joy of festival lights begins with responsible handling. Follow our verified fire-safety protocols to protect your loved ones and your surroundings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guidelines.map((g, i) => (
            <div key={i} className="bezel-card">
              <div className="bezel-card-inner p-6 flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 shadow-inner">
                    {g.icon}
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-2">
                    {g.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {g.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
