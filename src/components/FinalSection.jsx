import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Finale clips — paths under `public/`. Swap URLs when you have finals.
 */
const FINAL_VIDEOS = [
  "/assets/pages/finale/videos/clip-029.mp4",
  "/assets/pages/finale/videos/clip-030.mp4",
  "/assets/pages/finale/videos/clip-031.mp4",
  "/assets/pages/finale/videos/clip-032.mp4",
  "/assets/pages/finale/videos/clip-033.mp4",
  "/assets/pages/finale/videos/clip-034.mp4",
  "/assets/pages/finale/videos/clip-008.mp4",
  "/assets/pages/finale/videos/clip-009.mp4",
  "/assets/pages/finale/videos/clip-010.mp4",
  "/assets/pages/finale/videos/clip-011.mp4",
  "/assets/pages/finale/videos/clip-012.mp4",
  "/assets/pages/finale/videos/clip-013.mp4",
  "/assets/pages/finale/videos/clip-014.mp4",
  "/assets/pages/finale/videos/clip-015.mp4",
  "/assets/pages/finale/videos/clip-016.mp4",
  "/assets/pages/finale/videos/clip-017.mp4",
  "/assets/pages/finale/videos/clip-018.mp4",
  "/assets/pages/finale/videos/clip-019.mp4",
  "/assets/pages/finale/videos/clip-020.mp4",
  "/assets/pages/finale/videos/clip-021.mp4",
  "/assets/pages/finale/videos/clip-022.mp4",
  "/assets/pages/finale/videos/clip-023.mp4",
  "/assets/pages/finale/videos/clip-024.mp4",
  "/assets/pages/finale/videos/clip-025.mp4",
  "/assets/pages/finale/videos/clip-026.mp4",
  "/assets/pages/finale/videos/clip-027.mp4",
  "/assets/pages/finale/videos/clip-028.mp4",
  "/assets/pages/finale/videos/clip-035.mp4"
];

const ULTIMATE_GAG_AUDIO = "/assets/im/ultimate-gag.ogg";

const ROTATING_LINES = [
  "thanks for all the laughs, chaos, and memories — this is your day :)",
  "plot armor: maxed. birthday buff: active.",
  "you ate the whole timeline and left no crumbs.",
  "official verdict: main character energy, sustained.",
  "today we celebrate like the credits will never roll."
];

function SpeakerIcon({ muted, className }) {
  if (muted) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
    </svg>
  );
}

export default function FinalSection({ onRestart, theme }) {
  const isBrat = theme === "brat";
  const n = FINAL_VIDEOS.length;

  const [order, setOrder] = useState(() => FINAL_VIDEOS.map((_, i) => i));
  const [lineIdx, setLineIdx] = useState(0);
  const [soundSlot, setSoundSlot] = useState(null);
  const [expandedSlot, setExpandedSlot] = useState(null);
  const [gagPlaying, setGagPlaying] = useState(false);
  const [gaggedFlash, setGaggedFlash] = useState(false);
  const gagAudioRef = useRef(null);
  const gagFlashTimerRef = useRef(null);
  const gagRevealFiredRef = useRef(false);

  const dismissGaggedFlash = useCallback(() => {
    setGaggedFlash(false);
    gagRevealFiredRef.current = false;
    if (gagFlashTimerRef.current !== null) {
      window.clearTimeout(gagFlashTimerRef.current);
      gagFlashTimerRef.current = null;
    }
  }, []);

  const floats = useMemo(
    () =>
      [...Array(10)].map((_, i) => ({
        id: i,
        left: `${4 + (i * 17) % 88}%`,
        top: `${10 + (i * 23) % 78}%`,
        size: 10 + (i % 4) * 6,
        dur: 5 + (i % 3) * 2,
        delay: i * 0.4
      })),
    []
  );

  const gridCols =
    n >= 5 ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : n === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : n === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  useEffect(() => {
    const t = setInterval(() => setLineIdx((k) => (k + 1) % ROTATING_LINES.length), 5200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setExpandedSlot(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const el = gagAudioRef.current;
    if (!el) return;

    const sync = () => setGagPlaying(!el.paused);

    const revealGaggedOnce = () => {
      if (gagRevealFiredRef.current) return;
      gagRevealFiredRef.current = true;
      setGaggedFlash(true);
      if (gagFlashTimerRef.current !== null) window.clearTimeout(gagFlashTimerRef.current);
      gagFlashTimerRef.current = window.setTimeout(() => {
        setGaggedFlash(false);
        gagFlashTimerRef.current = null;
      }, 4000);
    };

    const onPlay = () => {
      gagRevealFiredRef.current = false;
      sync();
    };

    const onTimeUpdate = () => {
      if (!Number.isFinite(el.duration) || el.duration <= 0 || gagRevealFiredRef.current) return;
      const remaining = el.duration - el.currentTime;
      if (remaining <= 1 && remaining >= 0) revealGaggedOnce();
    };

    const onEnded = () => {
      setGagPlaying(false);
      if (!gagRevealFiredRef.current) revealGaggedOnce();
    };

    el.addEventListener("play", onPlay);
    el.addEventListener("pause", sync);
    el.addEventListener("timeupdate", onTimeUpdate);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", sync);
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("ended", onEnded);
      el.pause();
      if (gagFlashTimerRef.current !== null) {
        window.clearTimeout(gagFlashTimerRef.current);
        gagFlashTimerRef.current = null;
      }
    };
  }, []);

  const toggleUltimateGag = useCallback(() => {
    const el = gagAudioRef.current;
    if (!el) return;
    if (el.paused) {
      dismissGaggedFlash();
      void el.play();
    } else {
      el.pause();
    }
  }, [dismissGaggedFlash]);

  const remixMontage = useCallback(() => {
    setOrder((prev) => {
      const next = [...prev];
      for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
      }
      return next;
    });
    setSoundSlot(null);
    setExpandedSlot(null);
  }, []);

  const toggleSound = useCallback((slotIdx, e) => {
    e.stopPropagation();
    setSoundSlot((prev) => (prev === slotIdx ? null : slotIdx));
  }, []);

  const headlineWords = "happy birthday, kartel".split(" ");

  const bratBtnPrimary =
    "rounded-full border-2 border-black bg-black px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d9ff4d] shadow-[3px_3px_0_0_rgba(0,0,0,0.35)] transition hover:bg-[#142814] hover:text-[#e9ff7a]";
  const bratBtnGhost =
    "rounded-full border-2 border-black bg-transparent px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-black hover:text-[#d9ff4d]";

  const tileFrame = isBrat
    ? "border-[3px] border-black shadow-[6px_6px_0_0_rgba(0,0,0,0.45)]"
    : "border border-violet-300/40 shadow-[0_0_20px_rgba(124,58,237,0.28)]";

  const iconBtn = isBrat
    ? "rounded-full border-2 border-black bg-[#d9ff4d]/95 p-1.5 text-black hover:bg-[#c8f542]"
    : "rounded-full border border-violet-300/50 bg-zinc-900/90 p-1.5 text-violet-100 hover:bg-violet-500/25";

  const expandedSrc = expandedSlot !== null ? FINAL_VIDEOS[order[expandedSlot]] : null;
  const expandedMuted = soundSlot !== expandedSlot;

  return (
    <motion.section
      className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center overflow-hidden px-5 py-14"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {isBrat && (
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.12]">
          {floats.map((f) => (
            <motion.span
              key={f.id}
              className="absolute border-2 border-black"
              style={{ left: f.left, top: f.top, width: f.size, height: f.size }}
              animate={{ y: [0, -14, 0], rotate: [0, 8, -6, 0], opacity: [0.35, 0.85, 0.35] }}
              transition={{ duration: f.dur, repeat: Infinity, ease: "easeInOut", delay: f.delay }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 w-full">
        <div className="absolute right-0 top-0 z-20 flex flex-col items-end gap-2">
          <audio ref={gagAudioRef} src={ULTIMATE_GAG_AUDIO} preload="metadata" className="hidden" />
          <motion.button
            type="button"
            onClick={toggleUltimateGag}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={
              isBrat
                ? `whitespace-nowrap rounded-full border-2 border-black px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] shadow-[3px_3px_0_0_rgba(0,0,0,0.35)] transition ${
                    gagPlaying ? "bg-black text-[#d9ff4d] hover:bg-[#142814]" : "bg-[#d9ff4d] text-black hover:bg-[#c8f542]"
                  }`
                : `whitespace-nowrap rounded-full border border-violet-300/45 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] transition ${
                    gagPlaying ? "bg-violet-500/35 text-violet-50 shadow-[0_0_20px_rgba(124,58,237,0.45)]" : "bg-zinc-900/80 text-violet-100 hover:bg-violet-500/25"
                  }`
            }
            aria-pressed={gagPlaying}
            aria-label={gagPlaying ? "Pause Ultimate GAG voice note" : "Play Ultimate GAG voice note"}
          >
            Ultimate GAG
          </motion.button>

          <AnimatePresence>
            {gaggedFlash && (
              <motion.div
                key="gagged-reply"
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className="pointer-events-none relative max-w-[220px] origin-top-right"
              >
                <div
                  className={`relative rounded-2xl rounded-tr-md border-2 px-3 py-2 ${
                    isBrat
                      ? "border-black bg-[#f7ffe5] shadow-[3px_4px_0_0_rgba(0,0,0,0.2)]"
                      : "border-violet-300/45 bg-zinc-900/95 shadow-[0_0_16px_rgba(124,58,237,0.22)]"
                  }`}
                >
                  <div
                    className={`mb-2 border-l-[3px] pl-2 ${
                      isBrat ? "border-black/45" : "border-violet-400/65"
                    }`}
                  >
                    <p
                      className={`text-[10px] font-medium uppercase tracking-wide opacity-65 ${
                        isBrat ? "text-black/55" : "text-violet-300/85"
                      }`}
                    >
                      me wen
                    </p>
                  </div>
                  <p
                    className={`text-[15px] font-semibold leading-snug ${
                      isBrat ? "text-black" : "text-violet-50"
                    }`}
                  >
                    GAGGED!!
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="min-w-0 max-w-2xl pr-[min(42vw,13.5rem)] sm:pr-48">
          <motion.p
            className={`text-sm font-medium uppercase tracking-[0.28em] ${isBrat ? "text-black/70" : "text-violet-300"}`}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            birthday finale
          </motion.p>

          <h2
            className={`mt-3 flex flex-wrap gap-x-[0.35em] gap-y-1 text-3xl font-bold leading-tight md:text-5xl ${
              isBrat ? "text-black" : "text-violet-100"
            }`}
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className="inline-block"
                initial={{ opacity: 0, y: 28, rotate: i % 2 === 0 ? -4 : 4 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 24, delay: 0.08 + i * 0.07 }}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <div className="relative mt-4 min-h-[3rem] md:min-h-[3.25rem]">
            <AnimatePresence mode="wait">
              <motion.p
                key={lineIdx}
                className={`absolute inset-x-0 top-0 text-base md:text-lg ${isBrat ? "font-medium text-black/82" : "text-violet-200/90"}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                {ROTATING_LINES[lineIdx]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            className={`mt-14 text-xs uppercase tracking-[0.35em] ${isBrat ? "text-black/55" : "text-violet-400/80"}`}
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            you made it · roll credits · tap a clip to enlarge
          </motion.p>
        </div>
      </div>

      <motion.div
        className={`relative z-10 mt-12 grid grid-cols-1 gap-5 ${gridCols}`}
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {order.map((videoIndex, slotIdx) => {
          const src = FINAL_VIDEOS[videoIndex];
          const isHidden = expandedSlot === slotIdx;
          const thisMuted = soundSlot !== slotIdx;
          const tilt = n <= 3 ? (slotIdx % 3 === 0 ? -2 : slotIdx % 3 === 1 ? 0 : 2) : slotIdx % 2 === 0 ? -1.5 : 1.5;

          return (
            <motion.div
              key={`${src}-${slotIdx}-${order.join("-")}`}
              layout
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.96 },
                show: { opacity: isHidden ? 0 : 1, y: 0, scale: isHidden ? 0.94 : 1 }
              }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative"
              style={{ rotate: isHidden ? 0 : tilt }}
              whileHover={isHidden ? {} : { rotate: 0, scale: 1.03, y: -6 }}
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => setExpandedSlot(slotIdx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setExpandedSlot(slotIdx);
                  }
                }}
                className={`relative cursor-pointer overflow-hidden rounded-2xl bg-black outline-none ring-offset-2 transition hover:brightness-105 focus-visible:ring-2 ${tileFrame} aspect-video w-full ${isBrat ? "ring-black focus-visible:ring-black" : "ring-violet-400 focus-visible:ring-violet-400"} ${isHidden ? "pointer-events-none invisible" : ""}`}
              >
                <video
                  className="h-full w-full object-cover object-center"
                  src={src}
                  autoPlay
                  muted={thisMuted}
                  loop
                  playsInline
                  preload="auto"
                  aria-label={`Finale clip ${slotIdx + 1} of ${n}. Click to enlarge.`}
                />
              </div>

              {!isHidden && (
                <>
                  <button
                    type="button"
                    onClick={(e) => toggleSound(slotIdx, e)}
                    className={`absolute bottom-2 right-2 z-30 ${iconBtn}`}
                    title={thisMuted ? "Unmute this clip" : "Mute"}
                    aria-label={thisMuted ? "Unmute this clip" : "Mute this clip"}
                  >
                    <SpeakerIcon muted={thisMuted} className="h-5 w-5" />
                  </button>

                </>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        className="relative z-10 mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
      >
        <button type="button" onClick={onRestart} className={isBrat ? bratBtnGhost : "rounded-full border border-violet-300/40 px-4 py-2 text-xs text-violet-200 transition hover:bg-violet-500/20"}>
          revisit memories
        </button>
        <button type="button" onClick={remixMontage} className={isBrat ? bratBtnPrimary : "rounded-full border border-violet-300/35 bg-zinc-900/60 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-100"}>
          remix order
        </button>
      </motion.div>

      <AnimatePresence>
        {expandedSrc !== null && expandedSlot !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedSlot(null)}
          >
            <motion.div
              className="relative flex w-full max-w-4xl flex-col gap-3"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-2 px-1">
                <button
                  type="button"
                  onClick={() => setExpandedSlot(null)}
                  className={
                    isBrat
                      ? "rounded-full border-2 border-black bg-[#d9ff4d] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black hover:bg-[#c8f542]"
                      : "rounded-full border border-violet-300/40 bg-zinc-900/90 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-violet-100 hover:bg-violet-500/20"
                  }
                >
                  back
                </button>
                <button
                  type="button"
                  onClick={(e) => toggleSound(expandedSlot, e)}
                  className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wide ${
                    isBrat
                      ? "border-2 border-black bg-black text-[#d9ff4d] hover:bg-[#142814]"
                      : "border border-violet-300/45 bg-zinc-900/90 text-violet-100 hover:bg-violet-500/20"
                  }`}
                  aria-label={expandedMuted ? "Unmute this clip" : "Mute this clip"}
                >
                  <SpeakerIcon muted={expandedMuted} className="h-5 w-5" />
                  {expandedMuted ? "sound on" : "sound off"}
                </button>
              </div>

              <div className={`overflow-hidden rounded-2xl bg-black ${tileFrame} aspect-video w-full shadow-2xl`}>
                <video
                  key={`expanded-${expandedSlot}-${expandedSrc}`}
                  className="h-full w-full object-contain object-center"
                  src={expandedSrc}
                  autoPlay
                  muted={expandedMuted}
                  loop
                  playsInline
                  preload="auto"
                  aria-label="Expanded finale clip"
                />
              </div>
              <p className={`text-center text-xs uppercase tracking-[0.2em] ${isBrat ? "text-white/70" : "text-violet-200/80"}`}>
                tap outside or escape to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
