"use client";

import React, { useState } from "react";
import Link from "next/link";
import { activeLeaderboard } from "../data/leaderboardData";
import {
  Trophy,
  ArrowLeft,
  Clock,
  CheckCircle2,
  Hourglass,
  ShieldCheck,
  Contrast
} from "lucide-react";

export default function LeaderboardPage() {
  const [isDark, setIsDark] = useState(false);

  // Palette tokens matching STC Learn design system
  const cardBg = isDark ? "#182142" : "#FFFFFF";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(28,39,81,0.12)";
  const innerCardBg = isDark ? "#121933" : "#F9F8F5";
  const mainText = isDark ? "#F3F4F6" : "#1C2751";
  const mutedText = isDark ? "#94A3B8" : "rgba(28,39,81,0.7)";
  const goldAccent = "#B09B79";

  return (
    <div
      className={`min-h-screen transition-colors duration-200 flex flex-col justify-between p-4 sm:p-6 md:p-8 ${
        isDark ? "bg-[#121933] text-white" : "bg-[#E8E7E2] text-[#1C2751]"
      }`}
    >
      {/* Header Bar */}
      <header
        className="max-w-lg mx-auto w-full flex items-center justify-between pb-3 border-b transition-colors"
        style={{ borderColor: cardBorder }}
      >
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-heading font-semibold hover:opacity-80 transition"
          style={{ color: goldAccent }}
        >
          <ArrowLeft size={16} /> Back to Terminal
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle visual theme"
            className="p-1.5 rounded-full hover:opacity-80 transition flex items-center justify-center opacity-75"
          >
            <Contrast size={18} />
          </button>
          <div
            className="px-2.5 py-1 rounded-full border text-[10px] sm:text-xs font-heading font-bold uppercase tracking-wider opacity-80"
            style={{ borderColor: cardBorder }}
          >
            {activeLeaderboard.isPublished ? "Settled" : "Tallying"}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center py-6 w-full">
        <div
          className="rounded-2xl p-5 sm:p-8 max-w-lg w-full shadow-sm border transition-colors space-y-6"
          style={{ backgroundColor: cardBg, borderColor: cardBorder }}
        >
          {/* Header Metadata */}
          <div className="text-center">
            <span
              className="text-[11px] uppercase tracking-widest font-bold font-heading"
              style={{ color: goldAccent }}
            >
              {activeLeaderboard.cycle} · Standings
            </span>
            <h2
              className="text-2xl sm:text-3xl font-heading font-bold mt-1"
              style={{ color: mainText }}
            >
              Week 0{activeLeaderboard.weekNumber} Quickfire
            </h2>
            <p className="text-xs font-body mt-1" style={{ color: mutedText }}>
              {activeLeaderboard.theme}
            </p>
          </div>

          {/* STATE A: HOLDING / UNPUBLISHED VIEW */}
          {!activeLeaderboard.isPublished ? (
            <div className="space-y-5 text-center py-4">
              <div
                className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center border"
                style={{
                  backgroundColor: innerCardBg,
                  borderColor: cardBorder,
                  color: goldAccent
                }}
              >
                <Hourglass size={26} className="animate-spin-slow" />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-heading font-bold text-base" style={{ color: mainText }}>
                  Session Tally in Progress
                </h3>
                <p className="text-xs font-body leading-relaxed max-w-xs mx-auto" style={{ color: mutedText }}>
                  Submissions are rolling in! Once everyone has completed their run, official rankings and podium titles will unlock.
                </p>
              </div>

              {/* Deadline Indicator Box */}
              <div
                className="rounded-xl p-3.5 border flex items-center justify-between text-left"
                style={{ backgroundColor: innerCardBg, borderColor: cardBorder }}
              >
                <div className="flex items-center gap-2">
                  <Clock size={15} style={{ color: goldAccent }} />
                  <div>
                    <p className="text-xs font-heading font-bold" style={{ color: mainText }}>
                      Week 0{activeLeaderboard.weekNumber} Closes
                    </p>
                    <p className="text-[11px] font-body" style={{ color: mutedText }}>
                      {activeLeaderboard.deadline}
                    </p>
                  </div>
                </div>
                <span
                  className="text-[10px] font-heading font-bold uppercase tracking-wider px-2 py-1 rounded border"
                  style={{
                    backgroundColor: cardBg,
                    color: goldAccent,
                    borderColor: cardBorder
                  }}
                >
                  IN PROGRESS
                </span>
              </div>

              {/* Pending Seats Roster */}
              <div className="text-left pt-2">
                <p className="text-[10px] font-heading uppercase font-bold tracking-wider mb-2" style={{ color: mutedText }}>
                  STILL ON THE CLOCK ({activeLeaderboard.pendingMembers.length} SEATS)
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {activeLeaderboard.pendingMembers.map((member) => (
                    <span
                      key={member}
                      className="text-[11px] font-body px-2.5 py-1 rounded-lg border opacity-80"
                      style={{
                        backgroundColor: innerCardBg,
                        borderColor: cardBorder,
                        color: mainText
                      }}
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* STATE B: PUBLISHED PODIUM & RANKINGS */
            <div className="space-y-5">
              <div className="space-y-2">
                {activeLeaderboard.standings.map((seat, idx) => (
                  <div
                    key={seat.name}
                    className="rounded-xl p-3 border flex items-center justify-between text-left"
                    style={{ backgroundColor: innerCardBg, borderColor: cardBorder }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="h-6 w-6 rounded-full text-xs font-number font-bold flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: idx === 0 ? goldAccent : isDark ? "rgba(255,255,255,0.06)" : "rgba(28,39,81,0.06)",
                          color: idx === 0 ? "#FFFFFF" : mainText
                        }}
                      >
                        {seat.rank}
                      </span>
                      <div>
                        <p className="text-xs font-heading font-semibold" style={{ color: mainText }}>
                          {seat.name}
                        </p>
                        {seat.title && (
                          <p className="text-[10px] font-heading font-medium" style={{ color: goldAccent }}>
                            {seat.title}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-number font-bold" style={{ color: mainText }}>
                        {seat.score} pts
                      </p>
                      <p className="text-[10px] font-heading opacity-70">
                        {seat.accuracy} · {seat.pace}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Return Action */}
          <div className="pt-2">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl border text-xs font-heading font-medium hover:opacity-90 transition shadow-sm"
              style={{
                backgroundColor: innerCardBg,
                color: mainText,
                borderColor: cardBorder
              }}
            >
              Return to Your Quickfire Summary
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
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