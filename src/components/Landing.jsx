import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function useTypingEffect(text, speed = 50) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayed(text.slice(0, index + 1));
      index += 1;
      if (index >= text.length) clearInterval(timer);
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return displayed;
}

export default function Landing({ onEnter }) {
  const typed = useTypingEffect("happy birthday kartel - this one is made with love", 34);
  const teaserPhotos = [
    { src: "/assets/pages/landing/images/teaser-01.jpeg", left: "6%", top: "18%", rotate: "-10deg", duration: 4 },
    { src: "/assets/pages/landing/images/teaser-02.jpeg", left: "12%", top: "66%", rotate: "-5deg", duration: 4.6 },
    { src: "/assets/pages/landing/images/teaser-03.jpeg", left: "84%", top: "14%", rotate: "8deg", duration: 5.2 },
    { src: "/assets/pages/landing/images/teaser-04.jpeg", left: "88%", top: "62%", rotate: "6deg", duration: 4.4 },
    { src: "/assets/pages/landing/images/teaser-05.jpeg", left: "18%", top: "8%", rotate: "-4deg", duration: 5.6 },
    { src: "/assets/pages/landing/images/teaser-06.jpeg", left: "78%", top: "74%", rotate: "4deg", duration: 4.8 }
  ];

  const stars = [...Array(70)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 3 + 1}px`,
    delay: Math.random() * 2
  }));

  return (
    <motion.section
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
    >
      <div className="pointer-events-none absolute inset-0">
        {stars.map((star) => (
          <motion.span
            key={star.id}
            className="absolute rounded-full bg-violet-200"
            style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.4, 1] }}
            transition={{ duration: 2.4, delay: star.delay, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {teaserPhotos.map((photo, idx) => (
          <motion.img
            key={`${photo.src}-${idx}`}
            src={photo.src}
            alt="memory teaser"
            className="absolute h-32 w-24 rounded-lg border border-violet-300/45 object-cover object-top shadow-[0_0_22px_rgba(124,58,237,0.35)]"
            style={{
              left: photo.left,
              top: photo.top,
              transform: `rotate(${photo.rotate})`
            }}
            animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: photo.duration + idx * 0.2, repeat: Infinity }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-violet-300/30 bg-zinc-950/55 p-6 text-center shadow-[0_0_45px_rgba(91,33,182,0.35)] backdrop-blur-xl md:p-10">
        <p className="text-xs uppercase tracking-[0.25em] text-violet-300/85">kartel edition</p>
        <p className="mt-3 text-3xl font-semibold tracking-tight text-violet-100 md:text-5xl">
          Happy Birthday bbg
        </p>
        <p className="mt-3 text-lg text-violet-300 md:text-xl">
          wander round, flip brat mode, unlock the locked chapter when you’re ready
        </p>
        <p className="mt-2 min-h-[1.5rem] text-sm text-violet-400 md:text-base">{typed}</p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-violet-200/90">
          <span className="rounded-full border border-violet-300/35 bg-violet-500/10 px-3 py-1">birthday memories</span>
          <span className="rounded-full border border-violet-300/35 bg-violet-500/10 px-3 py-1">inside jokes</span>
          <span className="rounded-full border border-violet-300/35 bg-violet-500/10 px-3 py-1">best moments</span>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-[0.24em] text-violet-300/80">
          <span>timeline boards</span>
          <span className="h-1 w-1 rounded-full bg-violet-300/70" aria-hidden />
          <span>embedded playlist</span>
          <span className="h-1 w-1 rounded-full bg-violet-300/70" aria-hidden />
          <span>Gag finale</span>
        </div>

        <motion.button
          onClick={onEnter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="mt-6 rounded-full border border-violet-400/60 bg-violet-500/25 px-8 py-2.5 text-sm font-semibold uppercase tracking-wider text-violet-100 shadow-glow transition hover:bg-violet-400/30"
        >
          Enter the experience
        </motion.button>
      </div>
    </motion.section>
  );
}
