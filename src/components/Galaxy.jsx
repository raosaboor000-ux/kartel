import { useMemo } from "react";
import { motion } from "framer-motion";
import BratLyricCorner from "./BratLyricCorner";

export default function Galaxy({
  nodes,
  unlockedNodes,
  onSelect,
  onOpenFinal,
  visitedNodes,
  theme,
  onToggleTheme
}) {
  const starDepth = useMemo(
    () =>
      [...Array(70)].map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 2.8 + 0.8}px`,
        duration: 1.8 + Math.random() * 2.8,
        delay: Math.random() * 2
      })),
    []
  );

  const particles = useMemo(
    () =>
      [...Array(16)].map((_, i) => ({
        id: i,
        left: `${14 + Math.random() * 72}%`,
        top: `${14 + Math.random() * 66}%`,
        delay: Math.random() * 3
      })),
    []
  );

  if (theme === "brat") {
    return (
      <motion.section
        className="relative min-h-screen w-full overflow-hidden px-4 py-8 md:px-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#8ACE00_0%,#75b200_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 text-[58px] font-bold lowercase tracking-[-0.08em] text-black/25 blur-[1px] md:top-8 md:text-[110px] md:text-black/30">
          brat
        </div>
        <div className="pointer-events-none absolute left-1/2 top-32 -translate-x-1/2 text-center text-[10px] uppercase tracking-[0.28em] text-black/55 md:top-42 md:text-[11px]">
          chaotic • honest • unpolished
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/80 md:text-base">
            not the 20th birthday dump
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-md border border-black/60 bg-black/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-black transition hover:bg-black/20"
              onClick={onToggleTheme}
            >
              cosmic mode
            </button>
            <button
              type="button"
              className="rounded-md border border-black/60 bg-black/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-black transition hover:bg-black/20"
              onClick={onOpenFinal}
            >
              ending/recap
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-28 mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-32 md:grid-cols-5">
          {nodes.map((node) => {
            const isUnlocked = unlockedNodes.includes(node);
            const isVisited = visitedNodes.includes(node);
            return (
              <motion.button
                key={node}
                type="button"
                className={`relative min-h-24 border border-black/70 p-3 text-left transition-colors duration-200 ${
                  isUnlocked
                    ? "cursor-pointer bg-black/12 text-black hover:bg-black hover:text-[#e9ff7a]"
                    : "cursor-not-allowed bg-black/5 text-black/45"
                } ${isVisited ? "ring-2 ring-black/55" : ""}`}
                whileHover={isUnlocked ? { scale: 1.03, y: -2 } : {}}
                whileTap={isUnlocked ? { scale: 0.98 } : {}}
                transition={{ duration: 0.2 }}
                onClick={() => onSelect(node)}
              >
                <span className="block text-sm font-semibold uppercase tracking-tight md:text-base">{node}</span>
                {isVisited && (
                  <span className="absolute bottom-2 right-2 text-[10px] font-bold uppercase text-black/70">
                    seen
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Reserve space so BratLyricCorner does not cover tiles */}
        <div className="relative z-10 mt-8 pb-[min(42vh,22rem)] md:pb-[min(38vh,20rem)]" aria-hidden />

        <BratLyricCorner />
      </motion.section>
    );
  }

  return (
    <motion.section
      className="relative min-h-screen w-full overflow-hidden px-4 pb-12 pt-8 md:px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(129,140,248,0.2),transparent_46%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.16),transparent_44%),radial-gradient(circle_at_center,rgba(99,102,241,0.1),transparent_58%)] theme-nebula" />
      <div className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-12 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl" />
      <div className="shooting-star" />

      <div className="pointer-events-none absolute inset-0">
        {starDepth.map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full bg-violet-100/90"
            style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
            animate={{ opacity: [0.25, 0.95, 0.25], scale: [1, 1.3, 1] }}
            transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
          />
        ))}
      </div>

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-45"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d="M8,78 C24,35 44,22 63,32 S88,56 94,26" stroke="rgba(167,139,250,0.42)" strokeWidth="0.22" fill="none" />
        <path d="M6,36 C25,48 48,44 64,56 S86,78 97,71" stroke="rgba(96,165,250,0.33)" strokeWidth="0.22" fill="none" />
        <path d="M14,15 C28,14 36,26 53,20 S76,10 90,14" stroke="rgba(196,181,253,0.26)" strokeWidth="0.2" fill="none" />
      </svg>

      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="rounded-3xl border border-violet-300/35 bg-[linear-gradient(135deg,rgba(91,33,182,0.28),rgba(15,23,42,0.68))] px-4 py-3 shadow-[0_0_30px_rgba(124,58,237,0.28)] backdrop-blur md:px-5">
          <p className="text-[10px] uppercase tracking-[0.26em] text-violet-300/80">birthday galaxy</p>
          <p className="mt-1 text-base font-semibold text-violet-50 md:text-lg">choose a chapter to open</p>
          <p className="text-sm text-violet-200/85">visited: {visitedNodes.length}/{nodes.length}</p>
          <div className="mt-2 h-1.5 w-40 overflow-hidden rounded-full bg-violet-950/70">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-300 to-blue-300"
              animate={{ width: `${(visitedNodes.length / Math.max(nodes.length, 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full border border-violet-300/55 bg-zinc-900/70 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-violet-100 backdrop-blur transition hover:bg-violet-500/20"
            onClick={onToggleTheme}
          >
            {theme === "brat" ? "cosmic mode" : "brat mode"}
          </button>
          <button
            type="button"
            className="rounded-full border border-violet-300/55 bg-zinc-900/70 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-violet-100 backdrop-blur transition hover:bg-violet-500/20"
            onClick={onOpenFinal}
          >
            ending/recap
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute h-1.5 w-1.5 rounded-full bg-violet-200/80 blur-[1px]"
            style={{ left: particle.left, top: particle.top }}
            animate={{ y: [0, -10, 0], opacity: [0.2, 0.85, 0.2] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: particle.delay }}
          />
        ))}
      </div>

      <div className="relative z-10 mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {nodes.map((node, idx) => {
          const isUnlocked = unlockedNodes.includes(node);
          const isVisited = visitedNodes.includes(node);
          const sizeClass =
            idx === 0
              ? "sm:col-span-2 lg:col-span-2"
              : idx === 2
                ? "sm:col-span-2 lg:col-span-2"
                : "lg:col-span-2";
          const cosmicTone =
            idx % 5 === 0
              ? "from-violet-500/28 to-indigo-900/40"
              : idx % 5 === 1
                ? "from-fuchsia-500/24 to-violet-900/40"
                : idx % 5 === 2
                  ? "from-blue-500/24 to-indigo-900/40"
                  : idx % 5 === 3
                    ? "from-purple-500/24 to-zinc-900/50"
                    : "from-cyan-500/18 to-blue-900/45";
          return (
            <motion.button
              key={node}
              type="button"
              className={`group relative overflow-hidden rounded-2xl border px-4 py-4 text-left ${sizeClass} ${
                isUnlocked
                  ? `theme-node-active border-violet-200/55 bg-gradient-to-br ${cosmicTone} text-violet-50 shadow-[0_0_26px_rgba(139,92,246,0.28)]`
                  : "cursor-not-allowed border-zinc-700/80 bg-zinc-900/70 text-zinc-500"
              }`}
              animate={isUnlocked ? { y: [0, -3, 0] } : {}}
              transition={{ duration: 4 + idx * 0.35, repeat: Infinity, ease: "easeInOut" }}
              whileHover={isUnlocked ? { y: -5, scale: 1.01 } : {}}
              whileTap={isUnlocked ? { scale: 0.99 } : {}}
              onClick={() => onSelect(node)}
            >
              {isUnlocked && (
                <motion.span
                  className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-violet-200/12 blur-xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.55, 0.25] }}
                  transition={{ duration: 3 + idx * 0.2, repeat: Infinity }}
                />
              )}
              <span className="text-[10px] uppercase tracking-[0.22em] text-violet-200/75">
                {isVisited ? "visited chapter" : "open chapter"}
              </span>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.08em] md:text-base">{node}</p>
              {isVisited && <span className="absolute right-3 top-3 text-[10px] uppercase tracking-wider text-violet-100/75">seen</span>}
            </motion.button>
          );
        })}
      </div>

      <div className="relative z-10 mt-4 rounded-2xl border border-violet-300/35 bg-[linear-gradient(90deg,rgba(91,33,182,0.26),rgba(15,23,42,0.65),rgba(30,64,175,0.28))] px-4 py-2 text-center text-xs uppercase tracking-[0.2em] text-violet-100/85 backdrop-blur">
        tap any chapter card • ending/recap opens the final montage
      </div>
      <p className="relative z-10 mt-3 text-center text-[11px] font-medium uppercase tracking-[0.24em] text-violet-200/80">
        IS IT TOO BORING, TAP 'BRAT MODE'
      </p>
    </motion.section>
  );
}
