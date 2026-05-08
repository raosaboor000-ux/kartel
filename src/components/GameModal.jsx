import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function GameModal({ isOpen, onClose, onSuccess, question, theme = "cosmic" }) {
  const [status, setStatus] = useState("idle");
  const [answerInput, setAnswerInput] = useState("");
  const isBrat = theme === "brat";

  const checkAnswer = (value) => {
    const normalizedInput = value.trim().toLowerCase();
    const normalizedAnswer = question.answer.trim().toLowerCase();

    if (normalizedInput === normalizedAnswer) {
      setStatus("correct");
      setTimeout(() => {
        setAnswerInput("");
        setStatus("idle");
        onSuccess();
      }, 900);
      return;
    }
    setStatus("wrong");
    setTimeout(() => setStatus("idle"), 900);
  };

  const overlay = isBrat ? "bg-black/35 backdrop-blur-none" : "bg-black/70 backdrop-blur-sm";

  const panel = isBrat
    ? "max-w-sm rounded-md border border-black/70 bg-[linear-gradient(180deg,#8ACE00_0%,#75b200_100%)] shadow-[3px_3px_0_0_rgba(0,0,0,0.22)]"
    : "max-w-md rounded-2xl border border-violet-300/35 bg-zinc-950/95 text-violet-100 shadow-glow";

  const kicker = isBrat
    ? "text-[10px] font-semibold uppercase tracking-[0.28em] text-black/55 md:text-[11px]"
    : "text-sm font-medium uppercase tracking-wide text-violet-300";

  const heading = isBrat
    ? "mt-2 font-sans text-base font-semibold leading-snug tracking-tight text-black md:text-lg"
    : "mt-2 text-lg font-medium leading-snug text-violet-50";

  const btn = isBrat
    ? "rounded-md border border-black/70 bg-black/12 px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-tight text-black transition hover:bg-black/20 md:text-[13px]"
    : "rounded-lg border border-violet-400/45 bg-violet-500/15 px-3 py-2.5 text-left text-sm text-violet-100 transition hover:bg-violet-500/25";

  const input = isBrat
    ? "w-full rounded-md border border-black/70 bg-[#b8e35a] px-3 py-2.5 text-sm font-semibold tracking-tight text-black caret-black outline-none placeholder:text-black/60 focus:border-black focus:bg-[#c3ea6a]"
    : "w-full rounded-lg border border-violet-400/45 bg-violet-500/10 px-3 py-2.5 text-sm text-violet-100 outline-none placeholder:text-violet-300/70 focus:border-violet-300";

  const statusOk = isBrat ? "font-medium text-black" : "text-emerald-300";
  const statusBad = isBrat ? "font-medium text-black/70" : "text-rose-300";
  const closeLink = isBrat ? "font-medium text-black/55 hover:text-black/80" : "text-violet-400 hover:text-violet-200";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed inset-0 z-40 flex items-center justify-center p-5 ${overlay}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`w-full p-5 ${panel}`}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
          >
            <p className={kicker}>Baddie lock</p>
            <h3 className={heading}>{question.prompt}</h3>

            <form
              className="mt-5 space-y-2.5"
              onSubmit={(e) => {
                e.preventDefault();
                checkAnswer(answerInput);
              }}
            >
              <input
                type="text"
                value={answerInput}
                onChange={(e) => setAnswerInput(e.target.value)}
                placeholder="Type your answer"
                className={input}
                autoComplete="off"
                spellCheck={false}
              />
              <button type="submit" className={btn}>
                unlock baddie
              </button>
            </form>

            <p className={`mt-4 min-h-[1.25rem] text-sm ${status === "correct" ? statusOk : ""} ${status === "wrong" ? statusBad : ""}`}>
              {status === "correct" && "ok memory still strong, respect"}
              {status === "wrong" && "nope. once more, no cheating"}
            </p>

            <button
              type="button"
              onClick={onClose}
              className={`mt-1 text-xs uppercase tracking-[0.18em] underline-offset-2 transition hover:underline ${closeLink}`}
            >
              close for now
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
