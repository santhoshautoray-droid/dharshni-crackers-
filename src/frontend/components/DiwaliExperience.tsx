"use client";

import React, { useState } from "react";
import Image from "next/image";
import FireworksCanvas from "./FireworksCanvas";
import { soundEngine } from "@/lib/sound-engine";
import { Sparkles, Flame } from "lucide-react";

export default function DiwaliExperience() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "1. SPARK", desc: "Golden hand sparklers ignite the evening with micro-star crackles." },
    { title: "2. RISE", desc: "Titan rockets shoot vertically leaving sonic whistling trails in the night." },
    { title: "3. BURST", desc: "High-altitude charges fracture into deep ruby and electric violet peonies." },
    { title: "4. COLOR", desc: "Cascading golden willows and lavender fountain showers flood the horizon." },
    { title: "5. GRAND FINALE", desc: "Synchronized panoramic multi-tube repeaters salute the festival moment." },
  ];

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    soundEngine.playBurst(0.8 + index * 0.15);
  };

  const handleLaunchFinale = () => {
    soundEngine.playBurst(1.2);
    // Trigger sequence
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        soundEngine.playBurst(1.0);
      }, i * 250);
    }
  };

  return (
    <section id="experience" className="py-20 md:py-28 relative z-20 overflow-hidden bg-obsidian border-b border-white/5" aria-label="Diwali Celebration Experience">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-brand-gold bg-brand-gold/10 border border-brand-gold/30 mb-3">
            <Flame size={12} className="text-brand-gold" />
            <span>FESTIVAL VISUAL SHOWCASE</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            LIGHT UP THE MOMENT
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            The choreography of celebratory light. Experience each phase of the fireworks journey from ground spark to sky-filling grand finale.
          </p>
        </div>

        {/* Interactive Diwali Canvas Box */}
        <div className="relative w-full h-[380px] sm:h-[460px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black bg-surface-1">
          {/* Traditional Diwali Diyas & Fireworks Photography Background */}
          <Image
            src="/images/diwali-night.webp"
            alt="Diwali festival lights and fireworks"
            fill
            className="object-cover opacity-45 mix-blend-lighten pointer-events-none"
          />

          {/* Interactive Canvas on Top */}
          <FireworksCanvas id="diwali-section-canvas" autoLaunch={false} />

          {/* Sequencer Overlay Bar */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-surface-1/85 backdrop-blur-xl border border-white/15 shadow-lg">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
              {steps.map((st, idx) => (
                <button
                  key={st.title}
                  onClick={() => handleStepClick(idx)}
                  className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all ${
                    activeStep === idx
                      ? "bg-brand-purple text-white shadow-sm shadow-brand-purple border border-brand-purpleLight"
                      : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {st.title}
                </button>
              ))}
            </div>

            <button
              onClick={handleLaunchFinale}
              className="btn px-4 py-2 rounded-full bg-gradient-to-r from-brand-gold to-brand-amber text-obsidian text-xs font-bold flex items-center gap-1.5 shadow-md shadow-brand-gold/30 hover:scale-105 active:scale-95 transition-transform"
            >
              <Sparkles size={14} />
              <span>Launch Grand Finale</span>
            </button>
          </div>
        </div>

        {/* Step Explanation Card */}
        <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center text-xs text-slate-400">
          <strong className="text-white">{steps[activeStep].title}:</strong> {steps[activeStep].desc}
        </div>
      </div>
    </section>
  );
}
