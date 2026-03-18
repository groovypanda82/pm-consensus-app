"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ConsensusCard } from "@/lib/types";
import QuoteBlock from "./QuoteBlock";

const COLOR = "#4ade80";

interface Props { card: ConsensusCard }

export default function ConsensusCardView({ card }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      background: "var(--card-bg)", border: "1px solid var(--card-border)",
      borderRadius: 16, overflow: "hidden",
      transition: "border-color 0.2s",
    }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--card-border-hover)")}
      onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--card-border)")}
    >
      {/* Header */}
      <div style={{ padding: "24px 24px 20px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                color: COLOR, background: COLOR + "18", border: `1px solid ${COLOR}30`,
                borderRadius: 5, padding: "3px 9px",
              }}>Consensus</span>
              {card.evergreen && (
                <span style={{
                  fontSize: 11, color: "var(--text-muted)", background: "var(--surface2)",
                  border: "1px solid var(--badge-border)", borderRadius: 5, padding: "3px 9px",
                }}>Evergreen</span>
              )}
            </div>
            <h2 style={{ fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
              {card.topic}
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
              {card.summary}
            </p>
          </div>

          {/* Agreement meter */}
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: `conic-gradient(${COLOR} 0% ${card.agreementPercent}%, var(--border) ${card.agreementPercent}% 100%)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
            }}>
              <div style={{
                width: 54, height: 54, borderRadius: "50%", background: "var(--card-bg)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexDirection: "column",
              }}>
                <span style={{ fontSize: 18, fontWeight: 800, color: COLOR, lineHeight: 1 }}>{card.agreementPercent}%</span>
              </div>
            </div>
            <p style={{ fontSize: 10, color: "var(--text-muted)", margin: "6px 0 0", letterSpacing: "0.04em" }}>AGREE</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 12 }}>
          {card.tags.map(tag => (
            <span key={tag} style={{
              fontSize: 11, color: "var(--text-muted)", background: "var(--badge-bg)",
              border: "1px solid var(--badge-border)", borderRadius: 4, padding: "2px 8px",
            }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Top quote always visible */}
      <div style={{ padding: "20px 24px 0" }}>
        <QuoteBlock quote={card.quotes[0]} accentColor={COLOR} />
      </div>

      {/* Expand toggle */}
      {card.quotes.length > 1 && (
        <div style={{ padding: "12px 24px 20px" }}>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: "none", border: "1px solid var(--badge-border)", borderRadius: 8,
              color: "var(--text-muted)", fontSize: 12, cursor: "pointer",
              padding: "7px 14px", transition: "all 0.15s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.7"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
          >
            {expanded ? "↑ Show less" : `↓ ${card.quotes.length - 1} more quote${card.quotes.length > 2 ? "s" : ""}`}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: "hidden" }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
                  {card.quotes.slice(1).map((q, i) => (
                    <QuoteBlock key={i} quote={q} accentColor={COLOR} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
      {card.quotes.length === 1 && <div style={{ height: 20 }} />}
    </div>
  );
}
