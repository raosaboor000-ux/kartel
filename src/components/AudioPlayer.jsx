import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function SpotifyGlyph({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function PlaylistGlyph({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4 6h14v2H4V6zm0 5h10v2H4v-2zm0 5h8v2H4v-2z" />
      <path d="M17 10v10l7-5-7-5z" />
    </svg>
  );
}

export default function AudioPlayer({ backgroundSrc, voiceSrc, showVoiceButton, theme, stage }) {
  const spotifyPlaylistUrl =
    "https://open.spotify.com/playlist/5EMkiHpoi1UWq5kKFkP6ob?si=ee02a76dce134b41";
  const spotifyEmbedUrl =
    "https://open.spotify.com/embed/playlist/5EMkiHpoi1UWq5kKFkP6ob?utm_source=generator&theme=0";

  const voiceRef = useRef(null);
  const [showSpotify, setShowSpotify] = useState(true);
  const isBrat = theme === "brat";
  const compactSpotify = isBrat && stage !== "galaxy";

  useEffect(() => {
    if (isBrat) {
      setShowSpotify(true);
      return;
    }
    setShowSpotify(false);
  }, [isBrat]);

  const playVoice = () => {
    if (!voiceRef.current) return;
    voiceRef.current.currentTime = 0;
    voiceRef.current.play();
  };

  return (
    <>
      <audio src={backgroundSrc} loop preload="none" />
      <audio ref={voiceRef} src={voiceSrc} preload="none" />

      <motion.div
        className={`fixed bottom-4 right-4 z-50 flex flex-col gap-2 items-end ${
          compactSpotify ? "scale-[0.94]" : ""
        }`}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className={`flex flex-wrap items-center justify-end max-w-[85vw] ${compactSpotify ? "gap-1.5" : "gap-2"}`}>
          {isBrat && (
            <button
              type="button"
              onClick={() => window.open(spotifyPlaylistUrl, "_blank", "noopener,noreferrer")}
              title="open spotify"
              aria-label="open spotify"
              className={`flex items-center justify-center rounded-full border border-lime-300/70 bg-black/80 text-lime-50 shadow-[0_0_16px_rgba(163,230,53,0.35)] transition hover:bg-lime-500/20 ${
                compactSpotify ? "h-9 w-9" : "h-10 w-10"
              }`}
            >
              <SpotifyGlyph className={compactSpotify ? "h-[18px] w-[18px]" : "h-5 w-5"} />
            </button>
          )}

          {isBrat && (
            <button
              type="button"
              onClick={() => setShowSpotify((prev) => !prev)}
              title={showSpotify ? "hide playlist" : "show playlist"}
              aria-label={showSpotify ? "hide playlist" : "show playlist"}
              className={`flex items-center justify-center rounded-full border border-lime-300/70 bg-black/80 text-lime-50 shadow-[0_0_16px_rgba(163,230,53,0.35)] transition hover:bg-lime-500/20 ${
                compactSpotify ? "h-9 w-9" : "h-10 w-10"
              }`}
            >
              <PlaylistGlyph className={compactSpotify ? "h-[18px] w-[18px]" : "h-5 w-5"} />
            </button>
          )}

        </div>

        {isBrat && showSpotify && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-2xl border border-violet-300/35 bg-zinc-950/85 p-1 shadow-glow"
          >
            <iframe
              src={spotifyEmbedUrl}
              width={compactSpotify ? "260" : "320"}
              height={compactSpotify ? "80" : "152"}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify playlist player"
              className="rounded-xl"
            />
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
