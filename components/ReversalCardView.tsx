"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ReversalCard } from "@/lib/types";
import QuoteBlock from "./QuoteBlock";

const COLOR = "#a78bfa";

interface Props { card: ReversalCard }

export default function ReversalCardView({ card }: Props) {
  const [view, setView] = useState<"old" | "new">("new");
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: 16, overflow: "hidden",
    }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--card-border-hover)")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--card-border)")}
    >
      {/* Header */}
      <div style={{ padding: "24px 24px 20px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
            color: COLOR, background: COLOR + "18", border: `1px solid ${COLOR}30`,
            borderRadius: 5, padding: "3px 9px",
          }}>Reversal</span>
          <span style={{ fontSize: 11, color: "var(--text-muted)", background: "var(--surface2)", border: "1px solid var(--badge-border)", borderRadius: 5, padding: "3px 9px" }}>
            peaked {card.peakYear} · flipped {card.declineYear}
          </span>
        </div>
        <h2 style={{ fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 700, margin: "0 0 16px", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
          {card.topic}
        </h2>

        {/* Before / After */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "center" }}>
          <div style={{
            background: "var(--surface2)", border: "1px solid var(--badge-border)", borderRadius: 10, padding: "14px 16px",
            opacity: view === "old" ? 1 : 0.5, transition: "opacity 0.2s",
          }}>
            <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
              Then · {card.peakYear}
            </div>
            <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0, lineHeight: 1.5, textDecoration: view === "new" ? "line-through" : "none" }}>
              {card.oldWisdom}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%", background: COLOR + "18",
              border: `1px solid ${COLOR}44`, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16,
            }}>→</div>
          </div>

          <div style={{
            background: COLOR + "08", border: `1px solid ${COLOR}30`, borderRadius: 10, padding: "14px 16px",
            opacity: view === "new" ? 1 : 0.6, transition: "opacity 0.2s",
          }}>
            <div style={{ fontSize: 10, color: COLOR, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
              Now · {card.declineYear}+
            </div>
            <p style={{ fontSize: 13, color: "var(--text)", margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
              {card.newWisdom}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 14 }}>
          {card.tags.map(tag => (
            <span key={tag} style={{ fontSize: 11, color: "var(--text-muted)", background: "var(--badge-bg)", border: "1px solid var(--badge-border)", borderRadius: 4, padding: "2px 8px" }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Why it changed */}
      <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--footer-border)" }}>
        <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Why it changed</p>
        <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>{card.reason}</p>
      </div>

      {/* Toggle old/new quotes */}
      <div style={{ padding: "16px 24px 0" }}>
        <div style={{ display: "flex", background: "var(--tab-bg)", border: "1px solid var(--tab-border)", borderRadius: 8, padding: 4, marginBottom: 16, width: "fit-content" }}>
          {(["old", "new"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: "6px 16px", borderRadius: 6, border: "none", cursor: "pointer",
              background: view === v ? (v === "new" ? COLOR : "var(--surface2)") : "transparent",
              color: view === v ? (v === "new" ? "#000" : "var(--text)") : "var(--text-muted)",
              fontSize: 12, fontWeight: 600, transition: "all 0.15s",
            }}>
              {v === "old" ? `Then (${card.peakYear})` : `Now (${card.declineYear}+)`}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={view} initial={{ opacity: 0, x: view === "new" ? 10 : -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {(view === "old" ? card.oldQuotes : card.newQuotes).map((q, i) => (
                <QuoteBlock key={i} quote={q} accentColor={view === "new" ? COLOR : "#555"} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ height: 20 }} />
    </div>
  );
}
