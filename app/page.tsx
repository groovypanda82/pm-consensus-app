"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setCount(Math.round(ease(t) * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return count;
}
import type { CardsData, ConsensusCard, DebateCard, ReversalCard } from "@/lib/types";
import ConsensusCardView from "@/components/ConsensusCardView";
import DebateCardView from "@/components/DebateCardView";
import ReversalCardView from "@/components/ReversalCardView";

const TABS = [
  { id: "consensus", label: "Consensus", color: "#4ade80", desc: "What everyone agrees on" },
  { id: "debate", label: "Debates", color: "#fb923c", desc: "Where the best minds clash" },
  { id: "reversal", label: "Reversals", color: "#a78bfa", desc: "Advice that aged poorly" },
];

const THEME_VARS: Record<"dark" | "light", Record<string, string>> = {
  dark: {
    "--background": "#0a0a0a", "--surface": "#111111", "--surface2": "#1a1a1a",
    "--border": "#222222", "--text": "#f0f0f0", "--text-muted": "#777777",
    "--accent": "#e8ff4a", "--card-bg": "#111111", "--card-border": "#1e1e1e",
    "--card-border-hover": "#2a2a2a", "--tab-bg": "#0f0f0f", "--tab-border": "#1e1e1e",
    "--quote-bg": "#0f0f0f", "--quote-border": "#1e1e1e", "--badge-bg": "#161616",
    "--badge-border": "#2a2a2a", "--footer-border": "#181818",
    "--selection-bg": "#e8ff4a", "--selection-text": "#0a0a0a",
  },
  light: {
    "--background": "#f8f8f5", "--surface": "#ffffff", "--surface2": "#f0f0ec",
    "--border": "#e0e0d8", "--text": "#111111", "--text-muted": "#888888",
    "--accent": "#1a1a1a", "--card-bg": "#ffffff", "--card-border": "#e8e8e0",
    "--card-border-hover": "#d0d0c8", "--tab-bg": "#f0f0ec", "--tab-border": "#e0e0d8",
    "--quote-bg": "#f8f8f5", "--quote-border": "#e8e8e0", "--badge-bg": "#f0f0ec",
    "--badge-border": "#e0e0d8", "--footer-border": "#e8e8e0",
    "--selection-bg": "#c8e6ff", "--selection-text": "#111111",
  },
};

export default function Home() {
  const [data, setData] = useState<CardsData | null>(null);
  const [activeTab, setActiveTab] = useState("consensus");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [votes, setVotes] = useState<Record<string, "A" | "B">>({});
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const n349 = useCountUp(349);
  const n289 = useCountUp(289);
  const n638 = useCountUp(638);

  useEffect(() => {
    fetch("/cards.json").then((r) => r.json()).then(setData);
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    const initial = saved ?? "dark";
    setTheme(initial);
    const root = document.documentElement;
    Object.entries(THEME_VARS[initial]).forEach(([k, v]) => root.style.setProperty(k, v));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    Object.entries(THEME_VARS[theme]).forEach(([k, v]) => root.style.setProperty(k, v));
    localStorage.setItem("theme", theme);
  }, [theme]);

  const tabCards = data?.cards.filter((c) => c.kind === activeTab) ?? [];
  const allTags = [...new Set(tabCards.flatMap((c) => c.tags))].sort();
  const filtered = activeTag ? tabCards.filter((c) => c.tags.includes(activeTag)) : tabCards;

  function switchTab(id: string) {
    setActiveTab(id);
    setActiveTag(null);
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--background)" }}>
      {/* Theme toggle */}
      <div style={{ position: "fixed", top: 16, right: 20, zIndex: 100 }}>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          style={{
            background: "var(--surface2)", border: "1px solid var(--border)",
            borderRadius: 8, padding: "7px 11px", cursor: "pointer",
            color: "var(--text-muted)", fontSize: 16, lineHeight: 1,
            transition: "all 0.15s",
          }}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>

      {/* Hero */}
      <section style={{ padding: "72px 24px 48px", maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", marginBottom: 40 }}>
            {[
              { value: n349, label: "newsletters" },
              { value: n289, label: "podcast guests" },
              { value: n638, label: "total sources" },
            ].map(({ value, label }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1 }}>
                  {value.toLocaleString()}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          <h1 style={{
            fontSize: "clamp(38px, 7vw, 76px)", fontWeight: 800,
            lineHeight: 1.03, letterSpacing: "-0.04em", margin: "0 0 24px",
          }}>
            The PM<br />
            <span style={{ color: "var(--accent)" }}>Consensus Machine</span>
          </h1>

          <p style={{
            fontSize: "clamp(15px, 1.8vw, 19px)", color: "var(--text-muted)",
            maxWidth: 580, margin: "0 auto", lineHeight: 1.65,
          }}>
            Every PM quote is taken out of context. We read{" "}
            <span style={{ color: "var(--text)" }}>every post and transcript</span> from
            Lenny&apos;s Newsletter & Podcast to surface what 289 top practitioners
            actually agree on, where they differ, and what some of them did not see coming.
          </p>
        </motion.div>
      </section>

      {/* Tabs + Cards */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 80px" }}>
        {/* Tab bar */}
        <div style={{
          display: "flex", gap: 6, background: "var(--tab-bg)", border: "1px solid var(--tab-border)",
          borderRadius: 14, padding: 5, marginBottom: 36,
        }}>
          {TABS.map((tab) => (
            <button key={tab.id} onClick={() => switchTab(tab.id)} style={{
              flex: 1, padding: "11px 12px", borderRadius: 10, border: "none", cursor: "pointer",
              background: activeTab === tab.id ? tab.color : "transparent",
              color: activeTab === tab.id ? "#000" : "var(--text-muted)",
              fontWeight: activeTab === tab.id ? 700 : 500, fontSize: 14,
              transition: "all 0.18s ease",
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active tab label */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 16, letterSpacing: "0.02em" }}>
              {TABS.find(t => t.id === activeTab)?.desc}
            </p>

            {allTags.length > 0 && (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
                {allTags.map((tag) => {
                  const active = activeTag === tag;
                  const tabColor = TABS.find(t => t.id === activeTab)?.color ?? "#888";
                  return (
                    <button key={tag} onClick={() => setActiveTag(active ? null : tag)} style={{
                      fontSize: 11, padding: "4px 10px", borderRadius: 5, cursor: "pointer",
                      border: `1px solid ${active ? tabColor + "60" : "var(--badge-border)"}`,
                      background: active ? tabColor + "18" : "var(--badge-bg)",
                      color: active ? tabColor : "var(--text-muted)",
                      fontWeight: active ? 600 : 400,
                      transition: "all 0.15s",
                    }}>{tag}</button>
                  );
                })}
              </div>
            )}

            {!data && (
              <div style={{ textAlign: "center", color: "var(--text-muted)", padding: 80, fontSize: 14 }}>Loading...</div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {filtered.map((card, i) => (
                <motion.div key={card.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  {card.kind === "consensus" && <ConsensusCardView card={card as ConsensusCard} />}
                  {card.kind === "debate" && (
                    <DebateCardView
                      card={card as DebateCard}
                      vote={votes[card.id]}
                      onVote={(camp) => setVotes(prev => ({ ...prev, [card.id]: camp }))}
                    />
                  )}
                  {card.kind === "reversal" && <ReversalCardView card={card as ReversalCard} />}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <footer style={{
        borderTop: "1px solid var(--footer-border)", padding: "28px 24px", textAlign: "center",
        color: "var(--text-muted)", fontSize: 12, letterSpacing: "0.02em",
      }}>
        Built by{" "}
        <a href="https://www.linkedin.com/in/suhelparekh/" target="_blank" rel="noopener noreferrer"
          style={{ color: "var(--text)", textDecoration: "none" }}>
          Suhel Parekh
        </a>
        {" "}from{" "}
        <a href="https://www.lennysnewsletter.com" target="_blank" rel="noopener noreferrer"
          style={{ color: "var(--text-muted)", textDecoration: "none" }}>
          Lenny&apos;s Newsletter & Podcast
        </a>
        {" "}· 638 sources
      </footer>
    </main>
  );
}
