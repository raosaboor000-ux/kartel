import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Timeline({ title, memories, onBack, theme }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const activeMemory = memories[activeIndex];

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? memories.length - 1 : prev - 1));
  };
  const goNext = () => {
    setActiveIndex((prev) => (prev === memories.length - 1 ? 0 : prev + 1));
  };
  const goRandom = () => {
    if (memories.length <= 1) return;
    let next = activeIndex;
    while (next === activeIndex) {
      next = Math.floor(Math.random() * memories.length);
    }
    setActiveIndex(next);
  };

  const isBrat = theme === "brat";
  const bratBtn =
    "border-2 border-black bg-black px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d9ff4d] shadow-[2px_2px_0_0_rgba(0,0,0,0.35)] transition hover:bg-[#142814] hover:text-[#e9ff7a]";
  const bratBtnSm =
    "border-2 border-black bg-black px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d9ff4d] shadow-[2px_2px_0_0_rgba(0,0,0,0.35)] transition hover:bg-[#142814]";
  const fullscreenBtn = isBrat
    ? "absolute right-3 top-3 z-30 inline-flex h-8 w-8 items-center justify-center rounded-md border-2 border-black/80 bg-transparent text-black transition hover:bg-black/10"
    : "absolute right-3 top-3 z-30 inline-flex h-8 w-8 items-center justify-center rounded-md border border-violet-300/45 bg-transparent text-violet-100 transition hover:bg-violet-500/15";
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const boardItems = [...memories]
    .map((item, idx) => ({ ...item, originalIndex: idx }))
    .sort((a, b) => {
      const aVal = (a.originalIndex * 31 + shuffleSeed * 17) % 101;
      const bVal = (b.originalIndex * 31 + shuffleSeed * 17) % 101;
      return aVal - bVal;
    });

  return (
    <motion.section
      className="relative mx-auto min-h-screen w-full max-w-6xl px-4 py-8 md:px-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          isBrat
            ? "bg-[linear-gradient(180deg,rgba(138,206,0,0.18),transparent_35%)]"
            : "bg-[radial-gradient(circle_at_15%_20%,rgba(124,58,237,0.18),transparent_32%),radial-gradient(circle_at_85%_60%,rgba(59,130,246,0.14),transparent_35%)]"
        }`}
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p
            className={`text-[11px] uppercase tracking-[0.24em] ${
              isBrat ? "text-black/75" : "text-violet-300/75"
            }`}
          >
            {isBrat ? "brat birthday chapter" : "birthday chapter"}
          </p>
          <h2
            className={`text-2xl font-bold capitalize tracking-tight md:text-3xl ${
              isBrat ? "text-black" : "text-violet-100"
            }`}
          >
            {title}
          </h2>
        </div>
        <button
          onClick={onBack}
          type="button"
          className={`shrink-0 backdrop-blur transition ${
            isBrat ? `rounded-full ${bratBtn} normal-case tracking-normal` : "rounded-full border border-violet-300/45 bg-zinc-900/55 px-4 py-1 text-xs text-violet-100 hover:bg-violet-500/20"
          }`}
        >
          {isBrat ? "Back to Brat" : "back to galaxy"}
        </button>
      </div>

      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-xs uppercase tracking-[0.2em] ${isBrat ? "text-black/80" : "text-violet-300/80"}`}>
          board view - tap any tile
        </p>
        <button type="button" onClick={() => setShuffleSeed((prev) => prev + 1)} className={isBrat ? `${bratBtnSm} rounded-full` : "rounded-full border border-violet-300/35 bg-violet-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-violet-100"}>
          shuffle board
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {boardItems.map((memory, idx) => (
          <motion.button
            key={`${memory.media}-${shuffleSeed}`}
            onClick={() => setActiveIndex(memory.originalIndex)}
            whileHover={{ y: -4, rotate: idx % 2 === 0 ? -1 : 1 }}
            whileTap={{ scale: 0.97 }}
            className={`group relative overflow-hidden rounded-2xl border ${
              memory.originalIndex === activeIndex
                ? isBrat
                  ? "border-black shadow-[3px_3px_0_0_rgba(0,0,0,0.45)]"
                  : "border-violet-200 shadow-[0_0_18px_rgba(124,58,237,0.35)]"
                : isBrat
                  ? "border-black/55"
                  : "border-violet-300/35"
            } ${isBrat ? "bg-black/40" : "bg-zinc-900/45"}`}
          >
            {memory.isVideo ? (
              <video src={memory.media} muted className="h-32 w-full object-cover object-center" />
            ) : (
              <img src={memory.media} alt={memory.caption} className="h-32 w-full object-cover object-top" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent opacity-90" />
            <div className="absolute inset-x-2 bottom-2 text-left">
              {memory.caption && <p className={`truncate text-xs ${isBrat ? "text-[#e9ffad]" : "text-violet-100"}`}>{memory.caption}</p>}
            </div>
          </motion.button>
        ))}
      </div>

      <div
        className={`mt-5 grid gap-4 rounded-3xl border p-4 md:grid-cols-[1fr_130px] ${
          isBrat ? "border-black/50 bg-black/25 shadow-[4px_4px_0_0_rgba(0,0,0,0.25)]" : "border-violet-300/20 bg-black/30"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMemory.media}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className={`relative overflow-hidden rounded-2xl border ${isBrat ? "border-black/60" : "border-violet-200/30"} ${activeMemory.isVideo ? "flex flex-col" : ""}`}
          >
            {activeMemory.isVideo ? (
              <>
                <div className="relative h-[340px] w-full shrink-0 overflow-hidden md:h-[420px]">
                  <div className="absolute inset-0">
                    <video
                      src={activeMemory.media}
                      muted
                      className="h-full w-full scale-110 object-cover object-center opacity-30 blur-xl"
                    />
                  </div>
                  <video
                    src={activeMemory.media}
                    controls
                    className="relative z-10 h-full w-full object-contain"
                    preload="metadata"
                  />
                  <button type="button" onClick={() => setIsFullscreenOpen(true)} className={fullscreenBtn} aria-label="Open full screen">
                    <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M9 3H3v6M15 3h6v6M9 21H3v-6M21 15v6h-6" />
                    </svg>
                  </button>
                </div>
                <div
                  className={`relative z-20 border-t px-4 py-3 ${
                    isBrat ? "border-black/55 bg-black/75" : "border-violet-200/25 bg-black/55"
                  }`}
                >
                  {activeMemory.caption && <p className={`text-base ${isBrat ? "text-[#f4ffcc]" : "text-violet-100"}`}>{activeMemory.caption}</p>}
                  <p className={`mt-1 text-xs uppercase tracking-[0.2em] ${isBrat ? "text-[#c8f542]/85" : "text-violet-300/80"}`}>
                    {`memory ${activeIndex + 1} / ${memories.length}`}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0">
                  <img
                    src={activeMemory.media}
                    alt=""
                    className="h-[340px] w-full scale-110 object-cover object-center opacity-35 blur-xl md:h-[420px]"
                  />
                </div>
                <img
                  src={activeMemory.media}
                  alt={activeMemory.caption}
                  className="relative z-10 h-[340px] w-full object-contain md:h-[420px]"
                />
                <button type="button" onClick={() => setIsFullscreenOpen(true)} className={fullscreenBtn} aria-label="Open full screen">
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M9 3H3v6M15 3h6v6M9 21H3v-6M21 15v6h-6" />
                  </svg>
                </button>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/85 to-transparent p-4">
                  {activeMemory.caption && <p className={`text-base ${isBrat ? "text-[#f4ffcc]" : "text-violet-100"}`}>{activeMemory.caption}</p>}
                  <p className={`mt-1 text-xs uppercase tracking-[0.2em] ${isBrat ? "text-[#c8f542]/85" : "text-violet-300/80"}`}>
                    {`memory ${activeIndex + 1} / ${memories.length}`}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-3 gap-2 md:grid-cols-1">
          <button type="button" onClick={goPrev} className={isBrat ? `${bratBtnSm} rounded-xl` : "rounded-xl border border-violet-300/35 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-violet-100"}>
            prev
          </button>
          <button type="button" onClick={goRandom} className={isBrat ? `${bratBtnSm} rounded-xl` : "rounded-xl border border-violet-300/35 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-violet-100"}>
            surprise
          </button>
          <button type="button" onClick={goNext} className={isBrat ? `${bratBtnSm} rounded-xl` : "rounded-xl border border-violet-300/35 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-violet-100"}>
            next
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isFullscreenOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreenOpen(false)}
          >
            <motion.div
              className="relative h-full w-full max-w-6xl"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsFullscreenOpen(false)}
                className={isBrat ? `${bratBtn} absolute right-2 top-2 z-20 rounded-full normal-case tracking-normal` : "absolute right-2 top-2 z-20 rounded-full border border-violet-300/45 bg-zinc-900/75 px-4 py-1 text-xs text-violet-100"}
              >
                close
              </button>
              {activeMemory.isVideo ? (
                <video src={activeMemory.media} controls autoPlay className="h-full w-full object-contain" />
              ) : (
                <img src={activeMemory.media} alt={activeMemory.caption || "memory"} className="h-full w-full object-contain" />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
