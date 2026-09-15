"use client";

import React, { useState } from "react";
import Quickfire from "./components/Quickfire";
import { Contrast } from "lucide-react";

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(28,39,81,0.12)";

  return (
    <div
      className={`min-h-screen transition-colors duration-200 flex flex-col justify-between p-4 sm:p-6 md:p-8 ${
        isDark ? "bg-[#121933] text-white" : "bg-[#E8E7E2] text-[#1C2751]"
      }`}
    >
      {/* Header Bar with Restored Divider */}
      <header
        className="max-w-lg mx-auto w-full flex items-center justify-between pb-3 border-b transition-colors"
        style={{ borderColor: cardBorder }}
      >
        <div>
          <h1 className="text-xl sm:text-2xl font-brand font-bold tracking-tight">
            STC Learn
          </h1>
          <p className="text-xs font-heading font-medium tracking-wide opacity-75">
            Learning as we grow.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle visual theme"
            className="p-1.5 rounded-full hover:opacity-80 transition flex items-center justify-center opacity-75"
          >
            <Contrast size={18} />
          </button>

          {/* Active Seats Badge */}
          <div
            className="px-2.5 py-1 rounded-full border text-[10px] sm:text-xs font-heading font-bold uppercase tracking-wider opacity-80"
            style={{ borderColor: cardBorder }}
          >
            13 Active Seats
          </div>
        </div>
      </header>

      {/* Main Terminal Card */}
      <main className="flex-1 flex items-center justify-center py-6 w-full">
        <Quickfire isDark={isDark} />
      </main>

      {/* Footer with Restored Full Divider & Original Body Font */}
      <footer
        className="max-w-lg mx-auto w-full pt-4 pb-2 border-t text-center text-xs space-y-1 opacity-60 transition-colors"
        style={{ borderColor: cardBorder }}
      >
        <p className="font-body text-[11px] sm:text-xs">
          STC-Chama · More Than a Group · Cycle 4
        </p>
        <p className="font-body text-[11px]">
          © STC Investment Group. All rights reserved.
        </p>
      </footer>
    </div>
  );
}