"use client";

import React, { useEffect, useRef } from "react";
import { soundEngine } from "@/lib/sound-engine";

interface FireworksCanvasProps {
  id?: string;
  className?: string;
  autoLaunch?: boolean;
}

const PALETTES = [
  ["#8b5cf6", "#a78bfa", "#f5d061", "#ffffff"],
  ["#f5d061", "#ffbe3b", "#ff9e2c", "#fffbeb"],
  ["#8b5cf6", "#c084fc", "#ec4899", "#f3e8ff"],
  ["#ffffff", "#f5d061", "#8b5cf6", "#38bdf8"],
];

interface RocketObj {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  palette: string[];
  alive: boolean;
}

interface ParticleObj {
  x: number;
  y: number;
  vx: number;
  vy: number;
  drag: number;
  color: string;
  alpha: number;
  decay: number;
  gravity: number;
  radius: number;
  isGlitter: boolean;
  alive: boolean;
}

interface SkyFlash {
  x: number;
  y: number;
  color: string;
  maxRadius: number;
  alpha: number;
}

export default function FireworksCanvas({
  id = "fireworks-canvas",
  className = "",
  autoLaunch = true,
}: FireworksCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number = 0;
    let autoTimer: NodeJS.Timeout | null = null;
    let isVisible = true;
    let isRunning = false;

    const rockets: RocketObj[] = [];
    const particles: ParticleObj[] = [];
    const flashes: SkyFlash[] = [];

    const resize = () => {
      const parent = canvas.parentElement || document.body;
      const w = parent.clientWidth || window.innerWidth;
      const h = parent.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const detonate = (x: number, y: number, palette: string[]) => {
      soundEngine.playBurst(1.0);
      const isMobile = window.innerWidth < 768;
      // Big, screen-filling celebration burst count
      const count = isMobile ? 55 : 95;
      const baseColor = palette[0];

      // Ambient sky flash that illuminates the whole screen atmosphere
      const parent = canvas.parentElement || document.body;
      const w = parent.clientWidth || window.innerWidth;
      const h = parent.clientHeight || window.innerHeight;
      flashes.push({
        x,
        y,
        color: baseColor,
        maxRadius: Math.min(w, h) * (isMobile ? 0.65 : 0.8),
        alpha: 0.32,
      });

      // Two-tiered expansive explosion: dense core + wide sweeping outer ring
      for (let i = 0; i < count; i++) {
        if (particles.length >= (isMobile ? 220 : 380)) break;
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.28;

        // Big screen spread: outer stars travel fast across the sky, inner stars fill the center
        const tier = i % 3;
        let speed: number;
        let drag: number;
        let decay: number;

        if (tier === 0) {
          // Outer colossal spread (arcs far across the viewport)
          speed = isMobile ? Math.random() * 4.5 + 7.0 : Math.random() * 6.0 + 9.5;
          drag = 0.978;
          decay = Math.random() * 0.012 + 0.008;
        } else if (tier === 1) {
          // Mid-range blooming chrysanthemum petals
          speed = isMobile ? Math.random() * 3.5 + 4.5 : Math.random() * 4.5 + 6.0;
          drag = 0.972;
          decay = Math.random() * 0.014 + 0.01;
        } else {
          // Inner glowing core
          speed = Math.random() * 3.0 + 2.0;
          drag = 0.96;
          decay = Math.random() * 0.018 + 0.012;
        }

        const color = palette[Math.floor(Math.random() * palette.length)];

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          drag,
          color,
          alpha: 1.0,
          decay,
          gravity: 0.052,
          radius: Math.random() * 2.2 + 1.6,
          isGlitter: Math.random() > 0.4,
          alive: true,
        });
      }

      startLoop();
    };

    const launch = (targetX: number, targetY: number) => {
      const parent = canvas.parentElement || document.body;
      const h = parent.clientHeight || window.innerHeight;
      const startX = targetX + (Math.random() - 0.5) * 50;
      const startY = h + 15;
      const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
      const angle = Math.atan2(targetY - startY, targetX - startX);
      const dist = Math.hypot(targetX - startX, targetY - startY);
      const speed = Math.min(14, Math.max(9, dist / 28));

      rockets.push({
        x: startX,
        y: startY,
        targetY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: palette[0],
        palette,
        alive: true,
      });

      soundEngine.playLaunch();
      startLoop();
    };

    const triggerAuto = () => {
      if (isVisible && document.visibilityState === "visible") {
        const parent = canvas.parentElement || document.body;
        const w = parent.clientWidth || window.innerWidth;
        const h = parent.clientHeight || window.innerHeight;
        const targetX = w * (0.2 + Math.random() * 0.6);
        const targetY = h * (0.16 + Math.random() * 0.36);
        launch(targetX, targetY);
      }
      const delay = 3500 + Math.random() * 2500;
      autoTimer = setTimeout(triggerAuto, delay);
    };

    if (autoLaunch) {
      autoTimer = setTimeout(triggerAuto, 1500);
    }

    // Pointer detonation: non-blocking, ignores touches during scrolling
    const handlePointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a, button, input, select, textarea")) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      launch(clickX, clickY);
    };

    canvas.addEventListener("pointerdown", handlePointerDown, { passive: true });

    // Render loop
    const render = () => {
      if (!isVisible) {
        isRunning = false;
        return;
      }

      const parent = canvas.parentElement || document.body;
      const w = parent.clientWidth || window.innerWidth;
      const h = parent.clientHeight || window.innerHeight;

      // Soft trail clear
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(5, 5, 8, 0.22)";
      ctx.fillRect(0, 0, w, h);

      // Fast additive blending for brilliant neon glow
      ctx.globalCompositeOperation = "lighter";

      // 1. Draw Ambient Sky Illumination Flash
      for (let i = flashes.length - 1; i >= 0; i--) {
        const f = flashes[i];
        const grad = ctx.createRadialGradient(f.x, f.y, 4, f.x, f.y, f.maxRadius);
        grad.addColorStop(0, f.color);
        grad.addColorStop(0.3, f.color);
        grad.addColorStop(1, "transparent");

        ctx.globalAlpha = Math.max(0, f.alpha);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        f.alpha *= 0.8;
        if (f.alpha <= 0.02) {
          flashes.splice(i, 1);
        }
      }

      // 2. Update & Draw Rockets with Glowing Ascent Head
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;

        // Rocket core
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.8, 0, Math.PI * 2);
        ctx.fill();

        // Outer glow
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 5.5, 0, Math.PI * 2);
        ctx.fill();

        if (r.vy < 0 && r.y <= r.targetY) {
          r.alive = false;
          detonate(r.x, r.y, r.palette);
          rockets.splice(i, 1);
        }
      }

      // 3. Update & Draw Expansive Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Twinkling white spark center for diamond glitter
        if (p.isGlitter && p.alpha > 0.4) {
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.55, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1.0;

      // If nothing is flying, sleep to conserve 100% CPU/GPU
      if (rockets.length === 0 && particles.length === 0 && flashes.length === 0) {
        ctx.clearRect(0, 0, w, h);
        isRunning = false;
        return;
      }

      animId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (!isRunning && isVisible) {
        isRunning = true;
        animId = requestAnimationFrame(render);
      }
    };

    // IntersectionObserver to pause loop entirely when offscreen
    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isVisible = entry.isIntersecting;
            if (isVisible && (rockets.length > 0 || particles.length > 0 || flashes.length > 0)) {
              startLoop();
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(canvas);
    }

    startLoop();

    return () => {
      cancelAnimationFrame(animId);
      if (autoTimer) clearTimeout(autoTimer);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      if (observer) observer.disconnect();
    };
  }, [autoLaunch]);

  return (
    <canvas
      id={id}
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto touch-pan-y z-10 ${className}`}
      style={{ willChange: "transform", transform: "translateZ(0)" }}
      aria-label="Interactive Fireworks Canvas"
    />
  );
}

