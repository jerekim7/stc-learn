"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getDropByWeek, Question } from "../data/questionBank";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Clock,
  Copy,
  Check,
  Lock,
  Play,
  User,
  BookOpen,
  ArrowLeft,
  LogOut,
  Info,
  Trophy
} from "lucide-react";
import confetti from "canvas-confetti";

const QUESTION_TIMER_SECONDS = 35;

// Ingestion Endpoint
const GOOGLE_SHEET_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbytspjwjVhnnPf4S47yx8B0lali94UD5C1gS-M0nGfuimdBTzlvqjpuycnkEj72krIQRg/exec";

// 13 STC-Chama seats + External Tester Seat
const STC_MEMBERS = [
  "Seat 01 · A.M.",
  "Seat 02 · A.K.",
  "Seat 03 · C.M.",
  "Seat 04 · C.G.",
  "Seat 05 · D.T.",
  "Seat 06 · E.M.",
  "Seat 07 · J.K.",
  "Seat 08 · J.R.",
  "Seat 09 · K.K.",
  "Seat 10 · M.K.",
  "Seat 11 · M.T.",
  "Seat 12 · R.N.",
  "Seat 13 · S.K.",
  "Guest",
  "Guest · GT"
];

interface StoredSession {
  week: number;
  memberName: string;
  score: number;
  correctCount: number;
  avgPace: string;
  userAnswers: number[];
  completedAt: string;
}

interface QuickfireProps {
  isDark: boolean;
}

export default function Quickfire({ isDark }: QuickfireProps) {
  const currentWeek = 1;
  const questions: Question[] = getDropByWeek(currentWeek);
  const storageKey = `stc_learn_w${currentWeek}_result`;

  const [selectedMember, setSelectedMember] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIMER_SECONDS);
  const [copied, setCopied] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasSynced, setHasSynced] = useState(false);
  const [historicalSession, setHistoricalSession] = useState<StoredSession | null>(null);

  // Restore existing session on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed: StoredSession = JSON.parse(saved);
        setHistoricalSession(parsed);
        setSelectedMember(parsed.memberName);
        setScore(parsed.score);
        setCorrectCount(parsed.correctCount);
        setUserAnswers(parsed.userAnswers || []);
        setIsCompleted(true);
        setHasStarted(true);
        setHasSynced(true);
      }
    } catch (e) {
      console.error("Failed to read from localStorage", e);
    }
  }, [storageKey]);

  const currentQ: Question = questions[currentIndex];

  useEffect(() => {
    if (!hasStarted || isAnswered || isCompleted || isReviewMode) return;

    if (timeLeft === 0) {
      handleSelect(-1);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, timeLeft, isAnswered, isCompleted, isReviewMode]);

  // Sync to Google Sheet (Includes 10-Question Breakdown)
  const syncToGoogleSheet = async (
    finalScore: number,
    finalCorrect: number,
    totalSeconds: number,
    answersSnapshot: number[]
  ) => {
    const avgPace = (totalSeconds / questions.length).toFixed(1);

    const sessionData: StoredSession = {
      week: currentWeek,
      memberName: selectedMember || "Anonymous Member",
      score: finalScore,
      correctCount: finalCorrect,
      avgPace,
      userAnswers: answersSnapshot,
      completedAt: new Date().toISOString()
    };

    if (!isPracticeMode) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(sessionData));
        setHistoricalSession(sessionData);
      } catch (e) {
        console.error("Failed to save to localStorage", e);
      }

      if (!GOOGLE_SHEET_ENDPOINT) return;
      setIsSyncing(true);

      // Map answers to clean representations: "✓", "✗ (B)", or "Timeout"
      const questionBreakdown = questions.map((q, idx) => {
        const choice = answersSnapshot[idx];
        if (choice === -1 || choice === undefined) return "Timeout";
        if (choice === q.correctIndex) return "✓";
        const letters = ["A", "B", "C", "D"];
        return `✗ (${letters[choice] || choice})`;
      });

      try {
        await fetch(GOOGLE_SHEET_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            memberName: selectedMember || "Anonymous Member",
            week: `Week ${currentWeek}`,
            score: finalScore,
            accuracy: `${finalCorrect}/${questions.length}`,
            avgPace: avgPace,
            questionBreakdown: questionBreakdown
          })
        });
        setHasSynced(true);
      } catch (e) {
        console.error("Failed to sync score to Google Sheets", e);
      } finally {
        setIsSyncing(false);
      }
    }
  };

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const timeSpentOnQuestion = QUESTION_TIMER_SECONDS - timeLeft;
    setTotalTimeSpent((prev) => prev + timeSpentOnQuestion);

    const updatedAnswers = [...userAnswers, index];
    setUserAnswers(updatedAnswers);

    let nextScore = score;
    let nextCorrect = correctCount;

    if (index === currentQ.correctIndex) {
      const points = 100 + timeLeft * 5;
      nextScore = score + points;
      nextCorrect = correctCount + 1;
      setScore(nextScore);
      setCorrectCount(nextCorrect);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(QUESTION_TIMER_SECONDS);
    } else {
      setIsCompleted(true);
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
      syncToGoogleSheet(score, correctCount, totalTimeSpent, userAnswers);
    }
  };

  const startPracticeMode = () => {
    setIsPracticeMode(true);
    setIsReviewMode(false);
    setIsCompleted(false);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setCorrectCount(0);
    setTotalTimeSpent(0);
    setUserAnswers([]);
    setTimeLeft(QUESTION_TIMER_SECONDS);
    setHasStarted(true);
  };

  const exitPracticeMode = () => {
    if (historicalSession) {
      setSelectedMember(historicalSession.memberName);
      setScore(historicalSession.score);
      setCorrectCount(historicalSession.correctCount);
      setUserAnswers(historicalSession.userAnswers || []);
      setIsCompleted(true);
      setIsPracticeMode(false);
    } else {
      setIsPracticeMode(false);
      setHasStarted(false);
    }
  };

  const copyToClipboard = () => {
    const text = `⚡ STC Learn: Week 01 Quickfire\nMember: ${selectedMember || "Member"}\nScore: ${score} pts\nAccuracy: ${correctCount}/${questions.length} Correct\nCycle 4 • Sep 2026`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getPerformanceTitle = () => {
    if (score >= 1800) return "Elite Capital Allocator";
    if (score >= 1400) return "Disciplined Operator";
    if (score >= 1000) return "Sound Fundamentals";
    return "Liquidity Strained";
  };

  // Color tokens
  const cardBg = isDark ? "#182142" : "#FFFFFF";
  const cardBorder = isDark ? "rgba(255,255,255,0.08)" : "rgba(28,39,81,0.12)";
  const innerCardBg = isDark ? "#121933" : "#F9F8F5";
  const mainText = isDark ? "#F3F4F6" : "#1C2751";
  const mutedText = isDark ? "#94A3B8" : "rgba(28,39,81,0.7)";
  const goldAccent = "#B09B79";

  // 1. UNTIMED REVIEW MODE
  if (isReviewMode) {
    const answersToDisplay = historicalSession?.userAnswers || userAnswers;

    return (
      <div
        className="rounded-2xl p-5 sm:p-8 max-w-lg w-full shadow-sm border transition-colors"
        style={{ backgroundColor: cardBg, borderColor: cardBorder }}
      >
        <div
          className="flex items-center justify-between border-b pb-4 mb-6"
          style={{ borderColor: cardBorder }}
        >
          <button
            onClick={() => setIsReviewMode(false)}
            className="flex items-center gap-1.5 text-xs font-heading font-semibold hover:opacity-80 transition"
            style={{ color: goldAccent }}
          >
            <ArrowLeft size={16} /> Back to Summary
          </button>
          <span className="text-[11px] font-heading uppercase font-bold tracking-wider" style={{ color: goldAccent }}>
            Debrief · {correctCount}/{questions.length} Correct
          </span>
        </div>

        <div className="space-y-6">
          {questions.map((q, qIndex) => {
            const memberChoice = answersToDisplay[qIndex];
            const isCorrect = memberChoice === q.correctIndex;
            const wasTimedOut = memberChoice === -1 || memberChoice === undefined;

            return (
              <div
                key={q.id}
                className="rounded-xl p-4 sm:p-5 border text-left space-y-3"
                style={{ backgroundColor: innerCardBg, borderColor: cardBorder }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-heading font-bold uppercase tracking-wider"
                    style={{ color: mutedText }}
                  >
                    Question {qIndex + 1} · {q.category}
                  </span>
                  {isCorrect ? (
                    <span
                      className="inline-flex items-center gap-1 text-[11px] font-heading font-bold px-2 py-0.5 rounded border"
                      style={{
                        backgroundColor: isDark ? "rgba(34, 197, 94, 0.15)" : "#ECFDF5",
                        color: isDark ? "#4ADE80" : "#065F46",
                        borderColor: isDark ? "rgba(34, 197, 94, 0.3)" : "#A7F3D0"
                      }}
                    >
                      <CheckCircle2 size={13} /> Correct
                    </span>
                  ) : (
                    <span
                      className="inline-flex items-center gap-1 text-[11px] font-heading font-bold px-2 py-0.5 rounded border"
                      style={{
                        backgroundColor: isDark ? "rgba(239, 68, 68, 0.15)" : "#FEF2F2",
                        color: isDark ? "#F87171" : "#991B1B",
                        borderColor: isDark ? "rgba(239, 68, 68, 0.3)" : "#FECACA"
                      }}
                    >
                      <XCircle size={13} /> {wasTimedOut ? "Timed Out" : "Incorrect"}
                    </span>
                  )}
                </div>

                <p className="text-[14px] font-heading font-medium leading-relaxed" style={{ color: mainText }}>
                  {q.prompt}
                </p>

                <div className="space-y-2 pt-1 font-body">
                  {!isCorrect && !wasTimedOut && (
                    <div
                      className="p-3 rounded-lg border text-xs leading-relaxed"
                      style={{
                        backgroundColor: isDark ? "rgba(153, 27, 27, 0.25)" : "#FEF2F2",
                        borderColor: isDark ? "rgba(239, 68, 68, 0.4)" : "#F87171",
                        color: isDark ? "#FCA5A5" : "#7F1D1D"
                      }}
                    >
                      <span
                        className="font-heading font-bold block text-[10px] uppercase tracking-wider mb-0.5"
                        style={{ color: isDark ? "#F87171" : "#991B1B" }}
                      >
                        Your Choice
                      </span>
                      {q.options[memberChoice]}
                    </div>
                  )}

                  <div
                    className="p-3 rounded-lg border text-xs leading-relaxed"
                    style={{
                      backgroundColor: isDark ? "rgba(22, 101, 52, 0.25)" : "#F0FDF4",
                      borderColor: isDark ? "rgba(34, 197, 94, 0.4)" : "#4ADE80",
                      color: isDark ? "#86EFAC" : "#14532D"
                    }}
                  >
                    <span
                      className="font-heading font-bold block text-[10px] uppercase tracking-wider mb-0.5"
                      style={{ color: isDark ? "#4ADE80" : "#166534" }}
                    >
                      Correct Answer
                    </span>
                    {q.options[q.correctIndex]}
                  </div>
                </div>

                <div
                  className="rounded-lg p-3 border"
                  style={{
                    backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "#FFFFFF",
                    borderColor: cardBorder
                  }}
                >
                  <span className="text-[10px] font-heading uppercase font-bold block mb-1" style={{ color: goldAccent }}>
                    The Takeaway
                  </span>
                  <p className="text-xs leading-relaxed font-body" style={{ color: isDark ? "#D1D5DB" : "#1C2751" }}>
                    {q.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t" style={{ borderColor: cardBorder }}>
          <button
            onClick={() => setIsReviewMode(false)}
            className="w-full py-3.5 rounded-xl font-heading font-medium transition text-sm text-white hover:opacity-95"
            style={{ backgroundColor: "#1C2751" }}
          >
            Return to Score Summary
          </button>
        </div>
      </div>
    );
  }

  // 2. WELCOME & SEAT SELECTION
  if (!hasStarted) {
    return (
      <div
        className="rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-sm text-center border transition-colors"
        style={{ backgroundColor: cardBg, borderColor: cardBorder }}
      >
        <span className="text-[11px] uppercase tracking-widest font-bold font-heading" style={{ color: goldAccent }}>
          Cycle 4 • Sep 2026
        </span>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold mt-1 mb-2" style={{ color: mainText }}>
          Week 01 Quickfire
        </h2>
        <p className="text-sm mb-5 font-body" style={{ color: mutedText }}>
          10 practical scenarios across Chama governance, liquidity, and market execution.
        </p>

        {/* Seat Dropdown */}
        <div className="text-left mb-5">
          <label className="text-[11px] font-heading uppercase font-bold block mb-2 flex items-center gap-1.5" style={{ color: mutedText }}>
            <User size={13} /> Select Your Seat
          </label>
          <div
            className="rounded-xl p-4 border"
            style={{ backgroundColor: innerCardBg, borderColor: cardBorder }}
          >
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="w-full p-3 rounded-lg border text-sm font-heading font-medium focus:outline-none"
              style={{
                backgroundColor: isDark ? "#182142" : "#FFFFFF",
                color: mainText,
                borderColor: cardBorder
              }}
            >
              <option value="">-- Choose Member Name --</option>
              {STC_MEMBERS.map((name, i) => (
                <option key={i} value={name}>{name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Briefing Rules Header & Card */}
        <div className="text-left mb-6">
          <label
            className="text-[11px] font-heading uppercase font-bold block mb-2 flex items-center gap-1.5"
            style={{ color: mutedText }}
          >
            <Info size={13} /> Before You Begin
          </label>

          <div
            className="rounded-xl p-5 border space-y-3.5"
            style={{ backgroundColor: innerCardBg, borderColor: cardBorder }}
          >
            <div className="flex items-start gap-3">
              <span
                className="h-5 w-5 rounded-full text-xs font-number font-bold flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: "rgba(176,155,121,0.15)", color: goldAccent }}
              >
                1
              </span>
              <p className="text-xs font-body leading-relaxed" style={{ color: mainText }}>
                <strong className="font-heading block sm:inline mr-1" style={{ color: goldAccent }}>
                  35 Seconds per Decision:
                </strong>
                Points decay as time ticks down. Speed + accuracy yields top scores.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span
                className="h-5 w-5 rounded-full text-xs font-number font-bold flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: "rgba(176,155,121,0.15)", color: goldAccent }}
              >
                2
              </span>
              <p className="text-xs font-body leading-relaxed" style={{ color: mainText }}>
                <strong className="font-heading block sm:inline mr-1" style={{ color: goldAccent }}>
                  Official Standing:
                </strong>
                Your first completed run writes directly to the group ledger.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span
                className="h-5 w-5 rounded-full text-xs font-number font-bold flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: "rgba(176,155,121,0.15)", color: goldAccent }}
              >
                3
              </span>
              <p className="text-xs font-body leading-relaxed" style={{ color: mainText }}>
                <strong className="font-heading block sm:inline mr-1" style={{ color: goldAccent }}>
                  The Takeaways:
                </strong>
                Every decision expands with the operational rule behind it.
              </p>
            </div>
          </div>
        </div>

        <button
          disabled={!selectedMember}
          onClick={() => setHasStarted(true)}
          className={`flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl font-heading font-medium transition shadow-sm text-sm text-white ${
            selectedMember ? "hover:opacity-95" : "opacity-40 cursor-not-allowed"
          }`}
          style={{ backgroundColor: "#1C2751" }}
        >
          <Play size={16} fill="currentColor" /> Start Official Run
        </button>
      </div>
    );
  }

  // 3. COMPLETION / DASHBOARD
  if (isCompleted) {
    const avgPace = historicalSession?.avgPace || (totalTimeSpent / questions.length).toFixed(1);

    return (
      <div
        className="rounded-2xl p-6 sm:p-8 max-w-lg w-full text-center shadow-sm border transition-colors"
        style={{ backgroundColor: cardBg, borderColor: cardBorder }}
      >
        <span className="text-[11px] uppercase tracking-widest font-bold font-heading" style={{ color: goldAccent }}>
          Cycle 4 • Sep 2026
        </span>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold mt-1" style={{ color: mainText }}>
          Week 01 Complete
        </h2>
        <p className="text-xs font-heading font-medium mt-1 mb-6" style={{ color: goldAccent }}>
          {getPerformanceTitle()} · {selectedMember}
        </p>

        {/* Score Box */}
        <div
          className="rounded-xl p-6 border mb-4"
          style={{ backgroundColor: innerCardBg, borderColor: cardBorder }}
        >
          <p className="text-[11px] font-heading font-semibold tracking-wider uppercase" style={{ color: mutedText }}>
            Total Score
          </p>
          <p className="text-5xl font-number font-bold mt-1" style={{ color: mainText }}>
            {score}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t" style={{ borderColor: cardBorder }}>
            <div>
              <p className="text-[10px] font-heading uppercase font-semibold tracking-wider" style={{ color: mutedText }}>
                Accuracy
              </p>
              <p className="text-lg font-number font-bold mt-0.5" style={{ color: mainText }}>
                {correctCount} / {questions.length}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-heading uppercase font-semibold tracking-wider" style={{ color: mutedText }}>
                Avg Pace
              </p>
              <p className="text-lg font-number font-bold mt-0.5" style={{ color: mainText }}>
                {avgPace}s
              </p>
            </div>
          </div>

          <div className="mt-4 text-[11px] font-heading flex items-center justify-center gap-1.5" style={{ color: mutedText }}>
            {isSyncing && <span>Syncing to ledger...</span>}
            {hasSynced && (
              <span className="text-green-600 dark:text-green-400 font-medium">
                ✓ Recorded to STC Ledger
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-2.5 mb-6">
          {/* 1. Review Decisions & Takeaways */}
          <button
            onClick={() => setIsReviewMode(true)}
            className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl text-white font-heading font-medium hover:opacity-95 transition text-sm shadow-sm"
            style={{ backgroundColor: "#1C2751" }}
          >
            <BookOpen size={16} /> Review Decisions & Takeaways
          </button>

          {/* 2. View Week 01 Standings (Dedicated Route Link) */}
          <Link
            href="/leaderboard"
            className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl border font-heading font-medium hover:opacity-90 transition text-xs shadow-sm"
            style={{
              backgroundColor: innerCardBg,
              color: mainText,
              borderColor: cardBorder
            }}
          >
            <Trophy size={14} style={{ color: goldAccent }} />
            View Week 01 Standings
          </Link>

          {/* 3. Copy Result for Group Chat */}
          <button
            onClick={copyToClipboard}
            className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl border font-heading font-medium hover:opacity-90 transition text-xs shadow-sm"
            style={{
              backgroundColor: innerCardBg,
              color: mainText,
              borderColor: cardBorder
            }}
          >
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            {copied ? "Copied to Clipboard!" : "Copy Result for Group Chat"}
          </button>

          {/* 4. Practice Mode */}
          <button
            onClick={startPracticeMode}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-6 rounded-xl border hover:opacity-80 transition text-xs font-heading font-medium"
            style={{
              backgroundColor: "transparent",
              borderColor: cardBorder,
              color: mutedText
            }}
          >
            <RotateCcw size={13} /> Enter Practice Mode
          </button>
        </div>

        {/* Locked Next Drop */}
        <div
          className="rounded-xl p-4 flex items-center justify-between text-left border"
          style={{
            backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "rgba(28,39,81,0.03)",
            borderColor: cardBorder
          }}
        >
          <div>
            <div className="flex items-center gap-1.5" style={{ color: mainText }}>
              <Lock size={13} />
              <p className="text-xs font-bold font-heading">Week 02 Quickfire</p>
            </div>
            <p className="text-[11px] font-body mt-0.5" style={{ color: mutedText }}>
              Liquidity Buffers, Debt Strategy & MLP
            </p>
          </div>
          <span
            className="text-[10px] font-heading font-semibold px-2 py-1 rounded border whitespace-nowrap"
            style={{
              backgroundColor: cardBg,
              color: mainText,
              borderColor: cardBorder
            }}
          >
            Mon 8:00 AM
          </span>
        </div>
      </div>
    );
  }

  // 4. ACTIVE TIMED QUIZ
  return (
    <div
      className="rounded-2xl p-5 sm:p-8 max-w-lg w-full shadow-sm border transition-colors"
      style={{ backgroundColor: cardBg, borderColor: cardBorder }}
    >
      {/* Practice Mode Exit Bar */}
      {isPracticeMode && (
        <div
          className="flex items-center justify-between pb-3 mb-4 border-b text-xs font-heading"
          style={{ borderColor: cardBorder }}
        >
          <span className="font-bold uppercase tracking-wider text-[10px]" style={{ color: goldAccent }}>
            Practice Mode (Score Not Recorded)
          </span>
          <button
            onClick={exitPracticeMode}
            className="flex items-center gap-1 text-[11px] font-semibold text-red-500 hover:text-red-600 transition"
          >
            <LogOut size={13} /> Exit Practice
          </button>
        </div>
      )}

      {/* 10-Tick Progress Segments */}
      <div className="grid grid-cols-10 gap-1.5 mb-5">
        {questions.map((_, idx) => (
          <div
            key={idx}
            className="h-1.5 rounded-full transition-all"
            style={{
              backgroundColor:
                idx < currentIndex
                  ? "#1C2751"
                  : idx === currentIndex
                  ? goldAccent
                  : isDark
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(28,39,81,0.1)"
            }}
          />
        ))}
      </div>

      {/* Meta Bar */}
      <div
        className="flex items-center justify-between border-b pb-3 mb-4"
        style={{ borderColor: cardBorder }}
      >
        <span className="text-[11px] uppercase tracking-wider font-bold font-heading" style={{ color: goldAccent }}>
          {currentQ.category}
        </span>
        <div className="flex items-center gap-1.5 font-heading">
          <Clock
            size={14}
            className={timeLeft <= 8 ? "text-red-500 animate-pulse" : ""}
            style={{ color: timeLeft > 8 ? mutedText : undefined }}
          />
          <p
            className={`text-sm font-number font-bold ${
              timeLeft <= 8 ? "text-red-500 animate-pulse" : ""
            }`}
            style={{ color: timeLeft > 8 ? mainText : undefined }}
          >
            {timeLeft}s
          </p>
        </div>
      </div>

      {/* Scenario Prompt */}
      <h3
        className="text-[15px] sm:text-[16px] font-heading font-medium leading-relaxed mb-5"
        style={{ color: mainText }}
      >
        {currentQ.prompt}
      </h3>

      {/* Options */}
      <div className="space-y-2.5 mb-5 font-body">
        {currentQ.options.map((option, idx) => {
          let optionBg = innerCardBg;
          let optionBorder = cardBorder;
          let optionTextColor = mainText;

          if (isAnswered) {
            if (idx === currentQ.correctIndex) {
              optionBg = isDark ? "rgba(22, 101, 52, 0.25)" : "#F0FDF4";
              optionBorder = "#16A34A";
              optionTextColor = isDark ? "#86EFAC" : "#14532D";
            } else if (idx === selectedOption) {
              optionBg = isDark ? "rgba(153, 27, 27, 0.25)" : "#FEF2F2";
              optionBorder = "#EF4444";
              optionTextColor = isDark ? "#FCA5A5" : "#7F1D1D";
            } else {
              optionTextColor = mutedText;
            }
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleSelect(idx)}
              className="w-full text-left p-3.5 rounded-xl border text-sm font-medium transition flex items-center justify-between"
              style={{
                backgroundColor: optionBg,
                borderColor: optionBorder,
                color: optionTextColor
              }}
            >
              <span>{option}</span>
              {isAnswered && idx === currentQ.correctIndex && (
                <CheckCircle2 size={16} className="text-green-500 shrink-0 ml-2" />
              )}
              {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                <XCircle size={16} className="text-red-500 shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* Takeaway Box */}
      {isAnswered && (
        <div
          className="rounded-xl p-4 mb-5 border"
          style={{
            backgroundColor: innerCardBg,
            borderColor: cardBorder
          }}
        >
          <p className="text-[10px] font-heading uppercase tracking-wider font-bold mb-1" style={{ color: goldAccent }}>
            The Takeaway
          </p>
          <p className="text-xs sm:text-sm leading-relaxed font-body" style={{ color: mainText }}>
            {currentQ.explanation}
          </p>
        </div>
      )}

      {/* Next Action */}
      {isAnswered && (
        <button
          onClick={handleNext}
          className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-heading font-medium transition text-sm text-white hover:opacity-95"
          style={{ backgroundColor: "#1C2751" }}
        >
          {currentIndex + 1 === questions.length ? "Finish Session" : "Next Question"}
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}