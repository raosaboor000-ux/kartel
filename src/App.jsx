import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Landing from "./components/Landing";
import Galaxy from "./components/Galaxy";
import Timeline from "./components/Timeline";
import GameModal from "./components/GameModal";
import AudioPlayer from "./components/AudioPlayer";
import FinalSection from "./components/FinalSection";
import { memoryData, orderedNodes } from "./data/memories";

const baddieQuestion = {
  prompt: "What's THE song on brat?",
  answer: "EIR"
};

function LoadingScreen({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.p
        className="text-lg tracking-wide text-violet-200"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        loading memories...
      </motion.p>
    </motion.div>
  );
}

export default function App() {
  const [stage, setStage] = useState("landing");
  const [theme, setTheme] = useState("cosmic");
  const [showLoading, setShowLoading] = useState(false);
  const [activeNode, setActiveNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [baddieUnlocked, setBaddieUnlocked] = useState(false);

  /** All tiles stay clickable; Baddie still opens the quiz first via handleNodeSelect until cleared. */
  const unlockedNodes = useMemo(() => orderedNodes, []);

  const enterExperience = () => {
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      setStage("galaxy");
    }, 1900);
  };

  const handleNodeSelect = (node) => {
    if (node === "Baddie" && !baddieUnlocked) {
      setIsGameOpen(true);
      return;
    }
    setActiveNode(node);
    setStage("timeline");
    setVisitedNodes((prev) => (prev.includes(node) ? prev : [...prev, node]));
  };

  const handleToggleTheme = () => {
    const nextTheme = theme === "cosmic" ? "brat" : "cosmic";
    setTheme(nextTheme);
  };

  return (
    <main
      className={`theme-root theme-${theme} relative min-h-screen w-full overflow-hidden bg-night text-[var(--fg)]`}
    >
      <AudioPlayer
        backgroundSrc="/assets/music.mp3"
        voiceSrc="/assets/voice.mp3"
        showVoiceButton={stage === "final"}
        theme={theme}
        stage={stage}
      />

      <AnimatePresence mode="wait">
        {showLoading && <LoadingScreen key="loading" onDone={() => setShowLoading(false)} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {stage === "landing" && !showLoading && (
          <Landing key="landing" onEnter={enterExperience} />
        )}

        {stage === "galaxy" && (
          <Galaxy
            key="galaxy"
            nodes={orderedNodes}
            unlockedNodes={unlockedNodes}
            onSelect={handleNodeSelect}
            onOpenFinal={() => setStage("final")}
            visitedNodes={visitedNodes}
            theme={theme}
            onToggleTheme={handleToggleTheme}
          />
        )}

        {stage === "timeline" && activeNode && (
          <Timeline
            key={`timeline-${activeNode}`}
            title={activeNode}
            memories={memoryData[activeNode]}
            onBack={() => setStage("galaxy")}
            theme={theme}
          />
        )}

        {stage === "final" && (
          <FinalSection key="final" onRestart={() => setStage("galaxy")} theme={theme} />
        )}
      </AnimatePresence>

      <GameModal
        isOpen={isGameOpen}
        theme={theme}
        onClose={() => setIsGameOpen(false)}
        onSuccess={() => {
          setBaddieUnlocked(true);
          setIsGameOpen(false);
          setActiveNode("Baddie");
          setStage("timeline");
          setVisitedNodes((prev) => (prev.includes("Baddie") ? prev : [...prev, "Baddie"]));
        }}
        question={baddieQuestion}
      />
    </main>
  );
}
