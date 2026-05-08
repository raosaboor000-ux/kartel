import { useCallback, useState } from "react";

/** Each set = stanzas; larger gap between stanzas (Spotify-style verse breaks). */
const LYRIC_SETS = [
  {
    stanzas: [
      ["Hey girl what's up how you been", "I think I need your advice"],
      ["(It's crazy, I was just thinking of you,", "what's on your mind?)"]
    ]
  },
  {
    stanzas: [
      ["I'm about to party on you", "Watch me, watch me", "party on you, yeah"],
      ["Party on you, party", "on you, party on"]
    ]
  },
  {
    stanzas: [
      ["I wanna know where you go,", "when you're feelin' alone"],
      ["When you're feelin' alone, do you?"]
    ]
  },
  {
    stanzas: [
      ["And I'm livin' in another country", "Got another girlfriend", "that you never met"],
      ["I ignore you when I see you callin'", "'Cause I know it's", "something I might regret"]
    ]
  },
  {
    stanzas: [
      ["Somebody asked", "me how you're doin'"],
      ["And I make excuses,", "and I say you're fine"],
      ["I keep tryin' not to think about you", "But I seem to think", "about you all the time"]
    ]
  },
  {
    stanzas: [
      ["It's a knife when your old", "friends hate your new friends"],
      ['When somebody says, "Charli,', "I think you've totally changed\""]
    ]
  },
  {
    stanzas: [
      ["It's a knife when somebody", "says they like the old", "me, and not the new me"],
      ['And I\'m like, "Who the fuck is she?"']
    ]
  },
  {
    stanzas: [
      [
        "It's a knife when you know they're",
        "counting on your mistakes",
        "It's a knife when you're so pretty,",
        "they think you must be fake (mm)"
      ]
    ]
  },
  {
    stanzas: [
      [
        "'Cause for the last couple years",
        "I've been at war in my body",
        "I tried to starve myself thinner",
        { text: "And then I gained", underline: true },
        { text: "all the weight back", underline: true }
      ]
    ]
  },
  {
    stanzas: [
      ["Yeah, I don't know if you like me", "Sometimes I think", "you might hate me"],
      ["Sometimes I think I might hate you", "Maybe you just wanna be me"]
    ]
  }
];

function normalizeLine(line) {
  if (typeof line === "string") return { text: line, underline: false };
  return { text: line.text, underline: !!line.underline };
}

function LyricBlock({ stanzas }) {
  return (
    <div className="font-sans">
      {stanzas.map((stanza, si) => (
        <div key={si} className={si > 0 ? "mt-3 md:mt-3.5" : ""}>
          {stanza.map((raw, li) => {
            const { text, underline } = normalizeLine(raw);
            return (
              <p
                key={`${si}-${li}-${text.slice(0, 12)}`}
                className={`text-[12px] font-bold leading-snug tracking-tight text-black md:text-[13px] ${li > 0 ? "mt-1.5" : ""} ${underline ? "underline decoration-black underline-offset-[3px]" : ""}`}
                style={{ textShadow: "0 1px 0 rgba(255,255,255,0.22)" }}
              >
                {text}
              </p>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function SpotifyShuffleButton({ onShuffle }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onShuffle();
      }}
      className="pointer-events-auto mt-4 flex cursor-pointer items-center gap-1.5 rounded-md text-left text-black outline-none transition hover:opacity-75 active:scale-[0.97] md:mt-5 md:gap-2 focus-visible:ring-2 focus-visible:ring-black/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      aria-label="Show random lyrics"
    >
      <svg aria-hidden className="h-6 w-6 shrink-0 md:h-7 md:w-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
      <span className="text-[15px] font-bold tracking-tight md:text-[17px]">kartel.wav</span>
    </button>
  );
}

export default function BratLyricCorner() {
  const [setIndex, setSetIndex] = useState(0);

  const shuffleLyrics = useCallback(() => {
    if (LYRIC_SETS.length <= 1) return;
    let next = setIndex;
    let guard = 0;
    while (next === setIndex && guard < 12) {
      next = Math.floor(Math.random() * LYRIC_SETS.length);
      guard += 1;
    }
    setSetIndex(next);
  }, [setIndex]);

  return (
    <div className="pointer-events-none absolute bottom-4 left-4 z-[12] w-[min(13rem,calc(100vw-2rem))] max-w-[min(13rem,calc(100vw-2rem))] md:bottom-8 md:left-10 md:w-[13.75rem] md:max-w-[13.75rem]">
      <div className="rounded-2xl px-3 py-3.5 shadow-[0_10px_36px_rgba(0,0,0,0.2),0_2px_8px_rgba(0,0,0,0.08)] md:px-3.5 md:py-4">
        <LyricBlock stanzas={LYRIC_SETS[setIndex].stanzas} />

        <SpotifyShuffleButton onShuffle={shuffleLyrics} />
      </div>
    </div>
  );
}
