import { useState } from "react";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import { FunnelOptIn } from "../components/FunnelOptIn";

const QUESTIONS = [
  {
    prompt: "Who is this plan for?",
    options: ["Athlete or NIL family", "Business owner", "Veteran or military family", "Creator", "Real estate investor", "Household"],
  },
  {
    prompt: "What do you want to get clear on first?",
    options: ["Protecting income", "Business structure", "A family trust", "Benefits and legacy", "Portfolio risk"],
  },
  {
    prompt: "What should happen next?",
    options: ["Send the free playbook", "Show me the matching program", "I want a strategy call"],
  },
];

export function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const current = QUESTIONS[step];
  const finished = step >= QUESTIONS.length;

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link to="/" className="font-serif text-sm font-semibold text-[#C5963A]">
            Garner Financial Partners
          </Link>
          <span className="text-xs text-white/50">Game plan quiz</span>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C5963A]">
          Financial Game Plan Quiz
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold">
          Get a path that matches where you are.
        </h1>
        <p className="mt-4 text-white/65">
          Three questions, then your email. We send the matching free briefing. This is education, not personalized financial, legal, or tax advice.
        </p>
        {!finished && current ? (
          <div className="mt-8">
            <p className="text-sm text-white/50">Question {step + 1} of {QUESTIONS.length}</p>
            <h2 className="mt-2 font-serif text-2xl">{current.prompt}</h2>
            <div className="mt-5 grid gap-3">
              {current.options.map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setAnswers(prev => [...prev, option]);
                    setStep(value => value + 1);
                  }}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm hover:border-[#C5963A]"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <p className="mb-4 text-sm text-white/70">
              You chose: {answers.join(" · ")}
            </p>
            <FunnelOptIn
              contentName="Financial Game Plan Quiz"
              source="quiz"
              headline="Send my game plan"
              freeAccess
            />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
