"use client";

import React, { useState, useEffect } from "react";
import Quickfire from "./components/Quickfire";

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

  const toggleTheme = (mode: "light" | "dark") => {
    const nextDark = mode === "dark";
    setIsDark(nextDark);
    localStorage.setItem("stc_theme", nextDark ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <div className={isDark ? "dark" : ""}>
      <main
        className="min-h-screen flex flex-col items-center justify-between p-4 sm:p-8 font-body transition-colors duration-200"
        style={{
          backgroundColor: isDark ? "#121933" : "#F4F1EA",
          color: isDark ? "#F3F4F6" : "#1C2751"
        }}
      >
        {/* Brand Header */}
        <header
          className="w-full max-w-lg flex items-center justify-between py-3 border-b"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(28,39,81,0.12)" }}
        >
          <div>
            <h1
              className="text-lg sm:text-xl font-heading font-bold tracking-tight"
              style={{ color: isDark ? "#F3F4F6" : "#1C2751" }}
            >
              STC Learn
            </h1>
            <p
              className="text-[11px] font-body"
              style={{ color: isDark ? "#94A3B8" : "rgba(28,39,81,0.6)" }}
            >
              Learning as we grow.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Theme Toggle Pill */}
            <div
              className="flex items-center p-0.5 rounded-lg border font-heading text-xs font-semibold"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(28,39,81,0.05)",
                borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(28,39,81,0.1)"
              }}
            >
              <button
                onClick={() => toggleTheme("light")}
                className="px-2.5 py-1 rounded transition text-xs font-heading font-semibold"
                style={{
                  backgroundColor: !isDark ? "#FFFFFF" : "transparent",
                  color: !isDark ? "#1C2751" : "#94A3B8",
                  boxShadow: !isDark ? "0 1px 2px rgba(0,0,0,0.08)" : "none"
                }}
              >
                Light
              </button>
              <button
                onClick={() => toggleTheme("dark")}
                className="px-2.5 py-1 rounded transition text-xs font-heading font-semibold"
                style={{
                  backgroundColor: isDark ? "#1C2751" : "transparent",
                  color: isDark ? "#F3F4F6" : "rgba(28,39,81,0.5)",
                  boxShadow: isDark ? "0 1px 2px rgba(0,0,0,0.3)" : "none"
                }}
              >
                Dark
              </button>
            </div>

            {/* 13 Seats Signal */}
            <span
              className="text-[10px] font-heading font-bold uppercase tracking-widest px-2.5 py-1 rounded border"
              style={{
                backgroundColor: isDark ? "rgba(176,155,121,0.1)" : "rgba(28,39,81,0.05)",
                color: isDark ? "#B09B79" : "rgba(28,39,81,0.8)",
                borderColor: isDark ? "rgba(176,155,121,0.2)" : "rgba(28,39,81,0.1)"
              }}
            >
              13 Seats
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
          style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(28,39,81,0.12)" }}
        >
          <p
            className="text-[11px] font-body"
            style={{ color: isDark ? "#94A3B8" : "rgba(28,39,81,0.5)" }}
          >
            STC-Chama · Private Internal Platform · Cycle 4
          </p>
        </footer>
      </main>
    </div>
  );
}