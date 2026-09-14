"use client";

import React, { useState, useEffect } from "react";
import { getDropByWeek, Question } from "../data/questionBank";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Clock, Copy, Check, Lock, Play, User } from "lucide-react";
import confetti from "canvas-confetti";

const QUESTION_TIMER_SECONDS = 35;

// STC Learn Google Sheets Ingestion Endpoint
const GOOGLE_SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycbytspjwjVhnnPf4S47yx8B0lali94UD5C1gS-M0nGfuimdBTzlvqjpuycnkEj72krIQRg/exec";

// The 13 STC-Chama seats (Alphabetical by First Name)
const STC_MEMBERS = [
  "Allan Mwiti",
  "Asaph Kariuki",
  "Carlos Mutua",
  "Chris Gitau",
  "Darren Tanui",
  "Emmanuel Mbatia",
  "Jeremy Kimingiri",
  "Joshua Rebo",
  "Kipleting Keino",
  "Michael Kiprop",
  "Michael Trevis",
  "Ryan Ngetich",
  "Sammy Kimaiyo"
];

export default function Quickfire() {
  const currentWeek = 1;
  const questions: Question[] = getDropByWeek(currentWeek);

  const [selectedMember, setSelectedMember] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIMER_SECONDS);
  const [copied, setCopied] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasSynced, setHasSynced] = useState(false);

  const currentQ: Question = questions[currentIndex];

  useEffect(() => {
    if (!hasStarted || isAnswered || isCompleted) return;

    if (timeLeft === 0) {
      handleSelect(-1);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, timeLeft, isAnswered, isCompleted]);

  // Send results to Google Sheets once finished
  const syncToGoogleSheet = async (finalScore: number, finalCorrect: number, totalSeconds: number) => {
    if (!GOOGLE_SHEET_ENDPOINT) return;
    setIsSyncing(true);

    const avgPace = (totalSeconds / questions.length).toFixed(1);

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
          avgPace: avgPace
        })
      });
      setHasSynced(true);
    } catch (e) {
      console.error("Failed to sync score to Google Sheets", e);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const timeSpentOnQuestion = QUESTION_TIMER_SECONDS - timeLeft;
    setTotalTimeSpent((prev) => prev + timeSpentOnQuestion);

    if (index === currentQ.correctIndex) {
      const points = 100 + timeLeft * 5;
      setScore((prev) => prev + points);
      setCorrectCount((prev) => prev + 1);
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
      syncToGoogleSheet(score, correctCount, totalTimeSpent);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setCorrectCount(0);
    setTotalTimeSpent(0);
    setIsCompleted(false);
    setTimeLeft(QUESTION_TIMER_SECONDS);
    setHasStarted(false);
    setHasSynced(false);
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

  // 1. WELCOME & SEAT SELECTION SCREEN
  if (!hasStarted) {
    return (
      <div className="bg-stc-card border border-stc-gray/40 rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-sm text-center">
        <span className="text-[11px] uppercase tracking-widest font-bold text-stc-gold font-heading">
          Cycle 4 • Sep 2026
        </span>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-stc-navy mt-1 mb-2">
          Week 01 Quickfire
        </h2>
        <p className="text-sm text-stc-navy/70 mb-5">
          10 practical scenarios across Chama governance, liquidity, and market execution.
        </p>

        {/* Seat Selection Dropdown */}
        <div className="bg-white rounded-xl p-4 border border-stc-gray/30 text-left mb-5">
          <label className="text-[11px] uppercase font-bold text-stc-navy/70 block mb-2 flex items-center gap-1.5">
            <User size={13} /> Select Your Seat
          </label>
          <select
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            className="w-full p-3 rounded-lg border border-stc-gray/40 bg-stc-beige/30 text-stc-navy text-sm font-medium focus:outline-none focus:border-stc-navy"
          >
            <option value="">-- Choose Member Name --</option>
            {STC_MEMBERS.map((name, i) => (
              <option key={i} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-xl p-5 border border-stc-gray/30 text-left space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <span className="h-5 w-5 rounded-full bg-stc-navy/5 text-stc-navy text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
            <p className="text-xs text-stc-navy/80">
              <strong className="text-stc-navy">35 Seconds per Decision:</strong> Points decay as time ticks down. Speed + accuracy yields top scores.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="h-5 w-5 rounded-full bg-stc-navy/5 text-stc-navy text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
            <p className="text-xs text-stc-navy/80">
              <strong className="text-stc-navy">Official Standing:</strong> Your first run writes directly to the group ledger.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="h-5 w-5 rounded-full bg-stc-navy/5 text-stc-navy text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
            <p className="text-xs text-stc-navy/80">
              <strong className="text-stc-navy">The Takeaways:</strong> Every decision expands with the operational rule behind it.
            </p>
          </div>
        </div>

        <button
          disabled={!selectedMember}
          onClick={() => setHasStarted(true)}
          className={`flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl font-medium transition shadow-sm text-sm ${
            selectedMember
              ? "bg-stc-navy text-white hover:bg-stc-navy/90"
              : "bg-stc-gray/30 text-stc-navy/40 cursor-not-allowed"
          }`}
        >
          <Play size={16} fill="currentColor" /> Start Official Run
        </button>
      </div>
    );
  }

  // 2. COMPLETION SCREEN
  if (isCompleted) {
    const avgPace = (totalTimeSpent / questions.length).toFixed(1);

    return (
      <div className="bg-stc-card border border-stc-gray/40 rounded-2xl p-6 sm:p-8 max-w-lg w-full text-center shadow-sm">
        <span className="text-[11px] uppercase tracking-widest font-bold text-stc-gold font-heading">
          Cycle 4 • Sep 2026
        </span>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-stc-navy mt-1">
          Week 01 Complete
        </h2>
        <p className="text-xs font-medium text-stc-gold mt-1 mb-6">
          {getPerformanceTitle()} · {selectedMember}
        </p>

        {/* Hero Score Box */}
        <div className="bg-white rounded-xl p-6 border border-stc-gray/30 mb-4">
          <p className="text-[11px] text-stc-navy/60 font-semibold tracking-wider uppercase">
            Total Score
          </p>
          <p className="text-5xl font-heading font-bold text-stc-navy mt-1">
            {score}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-stc-gray/20">
            <div>
              <p className="text-[10px] uppercase font-semibold text-stc-navy/50 tracking-wider">Accuracy</p>
              <p className="text-lg font-bold font-heading text-stc-navy mt-0.5">
                {correctCount} / {questions.length}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-semibold text-stc-navy/50 tracking-wider">Avg Pace</p>
              <p className="text-lg font-bold font-heading text-stc-navy mt-0.5">
                {avgPace}s
              </p>
            </div>
          </div>

          <div className="mt-4 text-[11px] text-stc-navy/50 flex items-center justify-center gap-1.5">
            {isSyncing && <span>Syncing to ledger...</span>}
            {hasSynced && <span className="text-green-600 font-medium">✓ Recorded to STC Ledger</span>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 mb-6">
          <button
            onClick={copyToClipboard}
            className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-stc-navy text-white font-medium hover:bg-stc-navy/90 transition text-sm shadow-sm"
          >
            {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            {copied ? "Copied to Clipboard!" : "Copy Result for Group Chat"}
          </button>

          <button
            onClick={resetQuiz}
            className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-transparent border border-stc-gray/50 text-stc-navy/70 font-medium hover:bg-white transition text-xs"
          >
            <RotateCcw size={14} /> Practice Mode
          </button>
        </div>

        {/* Locked Next Drop Card */}
        <div className="bg-stc-navy/5 border border-stc-navy/10 rounded-xl p-4 flex items-center justify-between text-left">
          <div>
            <div className="flex items-center gap-1.5 text-stc-navy">
              <Lock size={13} />
              <p className="text-xs font-bold font-heading">Week 02 Quickfire</p>
            </div>
            <p className="text-[11px] text-stc-navy/60 mt-0.5">
              Liquidity Buffers, Debt Strategy & MLP
            </p>
          </div>
          <span className="text-[10px] font-semibold text-stc-navy/70 bg-white px-2 py-1 rounded border border-stc-gray/30 whitespace-nowrap">
            Mon 8:00 AM
          </span>
        </div>
      </div>
    );
  }

  // 3. ACTIVE QUIZ SCREEN
  return (
    <div className="bg-stc-card border border-stc-gray/40 rounded-2xl p-5 sm:p-8 max-w-lg w-full shadow-sm">
      {/* 10-Tick Progress Bar */}
      <div className="grid grid-cols-10 gap-1.5 mb-5">
        {questions.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all ${
              idx < currentIndex
                ? "bg-stc-navy"
                : idx === currentIndex
                ? "bg-stc-gold"
                : "bg-stc-gray/30"
            }`}
          />
        ))}
      </div>

      {/* Meta Bar */}
      <div className="flex items-center justify-between border-b border-stc-gray/30 pb-3 mb-5">
        <span className="text-xs uppercase tracking-wider text-stc-gold font-semibold font-heading">
          {currentQ.category}
        </span>
        <div className="flex items-center gap-1.5">
          <Clock size={15} className={timeLeft <= 8 ? "text-red-600 animate-pulse" : "text-stc-navy/50"} />
          <p className={`text-base font-bold font-heading ${timeLeft <= 8 ? "text-red-600 animate-pulse" : "text-stc-navy"}`}>
            {timeLeft}s
          </p>
        </div>
      </div>

      {/* Scenario Prompt */}
      <h3 className="text-base sm:text-lg font-heading font-semibold text-stc-navy leading-snug mb-5">
        {currentQ.prompt}
      </h3>

      {/* Options */}
      <div className="space-y-2.5 mb-5">
        {currentQ.options.map((option, idx) => {
          let btnStyle = "border-stc-gray/40 bg-white hover:border-stc-navy/40 text-stc-navy";

          if (isAnswered) {
            if (idx === currentQ.correctIndex) {
              btnStyle = "border-green-600 bg-green-50 text-green-900 font-medium";
            } else if (idx === selectedOption) {
              btnStyle = "border-red-500 bg-red-50 text-red-900";
            } else {
              btnStyle = "border-stc-gray/20 bg-white/50 text-stc-navy/40";
            }
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between ${btnStyle}`}
            >
              <span>{option}</span>
              {isAnswered && idx === currentQ.correctIndex && (
                <CheckCircle2 size={16} className="text-green-600 shrink-0 ml-2" />
              )}
              {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                <XCircle size={16} className="text-red-500 shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* Takeaway */}
      {isAnswered && (
        <div className="bg-white border border-stc-gray/30 rounded-xl p-4 mb-5">
          <p className="text-[11px] uppercase tracking-wide text-stc-gold font-bold mb-1">
            The Takeaway
          </p>
          <p className="text-xs sm:text-sm text-stc-navy/85 leading-relaxed font-body">
            {currentQ.explanation}
          </p>
        </div>
      )}

      {/* Next Step */}
      {isAnswered && (
        <button
          onClick={handleNext}
          className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-stc-navy text-white font-medium hover:bg-stc-navy/90 transition text-sm"
        >
          {currentIndex + 1 === questions.length ? "Finish Session" : "Next Question"}
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}