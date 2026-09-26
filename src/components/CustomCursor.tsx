"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = document.querySelector(".custom-cursor-dot") as HTMLElement;
    const ring = document.querySelector(".custom-cursor-ring") as HTMLElement;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animId: number;
    const loop = () => {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      animId = requestAnimationFrame(loop);
    };
    loop();

    const hoverSelectors = "a, button, input, select, textarea, .bezel-card, .bento-cell";
    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(hoverSelectors)) {
        document.body.classList.add("cursor-hover");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(hoverSelectors)) {
        document.body.classList.remove("cursor-hover");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div className="custom-cursor-dot" aria-hidden="true" />
      <div className="custom-cursor-ring" aria-hidden="true" />
    </>
  );
}
