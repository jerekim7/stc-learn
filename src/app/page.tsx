"use client";

import React, { useState, useEffect } from "react";
import Quickfire from "./components/Quickfire";
import { Contrast } from "lucide-react";

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("stc_theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem("stc_theme", nextDark ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <div className={isDark ? "dark" : ""}>
      <main
        className="min-h-screen flex flex-col items-center justify-between p-4 sm:p-8 font-body transition-colors duration-200"
        style={{
          backgroundColor: isDark ? "#121933" : "#E8E7E2",
          color: isDark ? "#F3F4F6" : "#1C2751"
        }}
      >
        {/* Brand Header */}
        <header
          className="w-full max-w-lg flex items-center justify-between py-3 border-b"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(28,39,81,0.15)" }}
        >
          <div>
            <h1
              className="text-lg sm:text-xl font-brand font-bold tracking-tight"
              style={{ color: isDark ? "#F3F4F6" : "#1C2751" }}
            >
              STC Learn
            </h1>
            <p
              className="text-[11px] font-body"
              style={{ color: isDark ? "#94A3B8" : "rgba(28,39,81,0.65)" }}
            >
              Learning as we grow.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Minimal Unboxed Contrast Glyph Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-1.5 rounded-lg transition hover:opacity-70"
              style={{ color: isDark ? "#B09B79" : "#1C2751" }}
            >
              <Contrast size={18} />
            </button>

            {/* Exclusive Roster Badge */}
            <span
              className="text-[10px] font-heading font-bold uppercase tracking-wider px-2.5 py-1 rounded border"
              style={{
                backgroundColor: isDark ? "rgba(176,155,121,0.12)" : "rgba(28,39,81,0.06)",
                color: isDark ? "#B09B79" : "#1C2751",
                borderColor: isDark ? "rgba(176,155,121,0.3)" : "rgba(28,39,81,0.18)"
              }}
            >
              13 Active Seats
            </span>
          </div>
        </header>

        {/* Interactive Experience */}
        <div className="w-full flex justify-center py-6">
          <Quickfire isDark={isDark} />
        </div>

        {/* Footer */}
        <footer
          className="w-full max-w-lg text-center border-t pt-4 pb-2"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(28,39,81,0.15)" }}
        >
          <p
            className="text-[11px] font-body"
            style={{ color: isDark ? "#94A3B8" : "rgba(28,39,81,0.5)" }}
          >
            STC-Chama · More Than a Group · Cycle 4
          </p>
        </footer>
      </main>
    </div>
  );
}