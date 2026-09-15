"use client";

import React, { useState } from "react";
import Quickfire from "./components/Quickfire";
import { Contrast } from "lucide-react";

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div
      className={`min-h-screen transition-colors duration-200 flex flex-col justify-between p-4 sm:p-6 md:p-8 ${
        isDark ? "bg-[#121933] text-white" : "bg-[#E8E7E2] text-[#1C2751]"
      }`}
    >
      {/* Header Bar */}
      <header className="max-w-lg mx-auto w-full flex items-center justify-between py-2 border-b border-black/5 dark:border-white/5">
        <div>
          <h1 className="text-xl sm:text-2xl font-brand font-bold tracking-tight">
            STC Learn
          </h1>
          <p className="text-xs font-heading font-medium tracking-wide opacity-75">
            Learning as we grow.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle visual theme"
            className="p-1.5 rounded-full hover:opacity-80 transition flex items-center justify-center opacity-75"
          >
            <Contrast size={18} />
          </button>

          {/* Active Seats Badge */}
          <div className="px-2.5 py-1 rounded-full border border-black/10 dark:border-white/10 text-[10px] sm:text-xs font-heading font-bold uppercase tracking-wider opacity-80">
            13 Active Seats
          </div>
        </div>
      </header>

      {/* Main Terminal Card */}
      <main className="flex-1 flex items-center justify-center py-6 w-full">
        <Quickfire isDark={isDark} />
      </main>

      {/* Unified Institutional Footer */}
      <footer className="mt-8 mb-2 text-center text-xs space-y-1.5 opacity-60">
        <div className="w-12 h-[1px] bg-current mx-auto mb-3 opacity-30" />
        <p className="font-heading tracking-wide">
          STC-Chama · More Than a Group · Cycle 4
        </p>
        <p className="text-[11px] font-body">
          © STC Investment Group. All rights reserved.
        </p>
      </footer>
    </div>
  );
}