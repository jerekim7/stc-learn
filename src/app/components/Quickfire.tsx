"use client";

import React, { useState, useEffect } from "react";
import { getDropByWeek, Question } from "../data/questionBank";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Clock } from "lucide-react";
import confetti from "canvas-confetti";

// SINGLE MASTER TIMER: Change once here to update every question and reset
const QUESTION_TIMER_SECONDS = 35;

export default function Quickfire() {
  // SET DROP HERE: Change to 1 for Drop 01, or 2 for Drop 02
  const currentDropNumber = 1; // Set to 1 for Drop 01
  const questions: Question[] = getDropByWeek(currentDropNumber);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIMER_SECONDS);

  const currentQ: Question = questions[currentIndex];

  useEffect(() => {
    if (isAnswered || isCompleted) return;

    if (timeLeft === 0) {
      handleSelect(-1); // Timeout
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, isCompleted]);

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQ.correctIndex) {
      const points = 100 + timeLeft * 5;
      setScore((prev) => prev + points);
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
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
    setTimeLeft(QUESTION_TIMER_SECONDS);
  };

  if (isCompleted) {
    return (
      <div className="bg-stc-card border border-stc-gray/40 rounded-2xl p-8 max-w-lg w-full text-center shadow-sm">
        <span className="text-xs uppercase tracking-widest font-semibold text-stc-gold font-heading">
          Drop {currentDropNumber < 10 ? `0${currentDropNumber}` : currentDropNumber} Complete
        </span>
        <h2 className="text-3xl font-heading font-bold text-stc-navy mt-2 mb-1">
          Strong Session.
        </h2>
        <p className="text-sm text-stc-navy/70 mb-6">
          The quiz is the mechanism. The goal is a financially smarter member.
        </p>

        <div className="bg-white rounded-xl p-6 border border-stc-gray/30 mb-6">
          <p className="text-xs text-stc-navy/60 font-semibold tracking-wider uppercase">Final Score</p>
          <p className="text-5xl font-heading font-bold text-stc-navy mt-1">{score}</p>
          <p className="text-xs text-stc-gold mt-2 font-medium">Recorded for internal alpha</p>
        </div>

        <button
          onClick={resetQuiz}
          className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-stc-navy text-white font-medium hover:bg-stc-navy/90 transition"
        >
          <RotateCcw size={16} /> Retake Drop
        </button>
      </div>
    );
  }

  return (
    <div className="bg-stc-card border border-stc-gray/40 rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-sm">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-stc-gray/30 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-stc-gold font-semibold font-heading">
              {currentQ.category}
            </span>
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-stc-navy/5 text-stc-navy/60 font-medium">
              {currentQ.tier}
            </span>
          </div>
          <p className="text-xs text-stc-navy/60 mt-1">
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>
        <div className="text-right flex items-center gap-1.5">
          <Clock size={16} className={timeLeft <= 8 ? "text-red-600 animate-pulse" : "text-stc-navy/50"} />
          <p className={`text-lg font-bold font-heading ${timeLeft <= 8 ? "text-red-600 animate-pulse" : "text-stc-navy"}`}>
            {timeLeft}s
          </p>
        </div>
      </div>

      {/* Prompt */}
      <h3 className="text-lg sm:text-xl font-heading font-semibold text-stc-navy leading-snug mb-6">
        {currentQ.prompt}
      </h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
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
              className={`w-full text-left p-4 rounded-xl border text-sm transition flex items-center justify-between ${btnStyle}`}
            >
              <span>{option}</span>
              {isAnswered && idx === currentQ.correctIndex && (
                <CheckCircle2 size={18} className="text-green-600 shrink-0 ml-2" />
              )}
              {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                <XCircle size={18} className="text-red-500 shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* Grounded Takeaway */}
      {isAnswered && (
        <div className="bg-white border border-stc-gray/30 rounded-xl p-4 mb-6">
          <p className="text-xs uppercase tracking-wide text-stc-gold font-bold mb-1">
            The Takeaway
          </p>
          <p className="text-xs sm:text-sm text-stc-navy/80 leading-relaxed font-body">
            {currentQ.explanation}
          </p>
        </div>
      )}

      {/* Next Trigger */}
      {isAnswered && (
        <button
          onClick={handleNext}
          className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-stc-navy text-white font-medium hover:bg-stc-navy/90 transition text-sm"
        >
          {currentIndex + 1 === questions.length ? "Finish Drop" : "Next Question"}
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}

