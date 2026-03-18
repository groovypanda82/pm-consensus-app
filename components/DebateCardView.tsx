"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DebateCard } from "@/lib/types";
import QuoteBlock from "./QuoteBlock";

const COLOR = "#fb923c";
const COLOR_A = "#60a5fa";
const COLOR_B = "#f472b6";

interface Props {
  card: DebateCard;
  vote?: "A" | "B";
  onVote: (camp: "A" | "B") => void;
}

export default function DebateCardView({ card, vote, onVote }: Props) {
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
          }}>Debate</span>
        </div>
        <h2 style={{ fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 700, margin: "0 0 10px", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
          {card.topic}
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-muted)", margin: "0 0 14px", lineHeight: 1.6, fontStyle: "italic" }}>
          &ldquo;{card.question}&rdquo;
        </p>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {card.tags.map(tag => (
            <span key={tag} style={{ fontSize: 11, color: "var(--text-muted)", background: "var(--badge-bg)", border: "1px solid var(--badge-border)", borderRadius: 4, padding: "2px 8px" }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Split bar */}
      <div style={{ padding: "0 24px", marginTop: 20 }}>
        <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", height: 6, gap: 1 }}>
          <div style={{ flex: card.campA.percent, background: COLOR_A, transition: "flex 0.4s ease" }} />
          <div style={{ flex: card.campB.percent, background: COLOR_B, transition: "flex 0.4s ease" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
          <span style={{ fontSize: 11, color: COLOR_A }}>{card.campA.percent}%</span>
          <span style={{ fontSize: 11, color: COLOR_B }}>{card.campB.percent}%</span>
        </div>
      </div>

      {/* Two camps */}
      <div style={{ padding: "16px 24px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {/* Camp A */}
        <div style={{
          background: vote === "A" ? COLOR_A + "10" : "var(--surface2)",
          border: `1px solid ${vote === "A" ? COLOR_A + "40" : "var(--card-border)"}`,
          borderRadius: 12, padding: 16, transition: "all 0.2s",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: COLOR_A, margin: 0, lineHeight: 1.4, flex: 1, paddingRight: 8 }}>
              {card.campA.label}
            </p>
          </div>
          <QuoteBlock quote={card.campA.quotes[0]} accentColor={COLOR_A} />
        </div>

        {/* Camp B */}
        <div style={{
          background: vote === "B" ? COLOR_B + "10" : "var(--surface2)",
          border: `1px solid ${vote === "B" ? COLOR_B + "40" : "var(--card-border)"}`,
          borderRadius: 12, padding: 16, transition: "all 0.2s",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: COLOR_B, margin: 0, lineHeight: 1.4 }}>
              {card.campB.label}
            </p>
          </div>
          <QuoteBlock quote={card.campB.quotes[0]} accentColor={COLOR_B} />
        </div>
      </div>

      {/* Take a side */}
      <div style={{ padding: "16px 24px 0" }}>
        {!vote ? (
          <div>
            <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "0 0 10px" }}>Where do you stand?</p>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => onVote("A")} style={{
                flex: 1, padding: "10px 12px", borderRadius: 8, border: `1px solid ${COLOR_A}44`,
                background: COLOR_A + "0d", color: COLOR_A, fontSize: 12, fontWeight: 600, cursor: "pointer",
                transition: "all 0.15s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = COLOR_A + "22"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = COLOR_A + "0d"; }}
              >
                I&apos;m with Camp A
              </button>
              <button onClick={() => onVote("B")} style={{
                flex: 1, padding: "10px 12px", borderRadius: 8, border: `1px solid ${COLOR_B}44`,
                background: COLOR_B + "0d", color: COLOR_B, fontSize: 12, fontWeight: 600, cursor: "pointer",
                transition: "all 0.15s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = COLOR_B + "22"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = COLOR_B + "0d"; }}
              >
                I&apos;m with Camp B
              </button>
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
            style={{
              background: (vote === "A" ? COLOR_A : COLOR_B) + "10",
              border: `1px solid ${(vote === "A" ? COLOR_A : COLOR_B)}30`,
              borderRadius: 10, padding: "10px 16px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
            <span style={{ fontSize: 12, color: vote === "A" ? COLOR_A : COLOR_B, fontWeight: 600 }}>
              You&apos;re with Camp {vote} — {vote === "A" ? card.campA.label.slice(0, 40) : card.campB.label.slice(0, 40)}...
            </span>
            <button onClick={() => onVote(vote === "A" ? "B" : "A")} style={{
              background: "none", border: "none", cursor: "pointer",
              color: "var(--text-muted)", fontSize: 11,
            }}>change</button>
          </motion.div>
        )}
      </div>

      {/* Verdict & more quotes */}
      <div style={{ padding: "16px 24px 20px" }}>
        {card.verdict && !vote && (
          <div style={{
            background: "var(--surface2)", border: "1px solid var(--badge-border)", borderRadius: 10,
            padding: "10px 16px", marginBottom: 12,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 13 }}>🔒</span>
            <span style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.4 }}>
              Pick a side to reveal <span style={{ color: "var(--text)", fontWeight: 600 }}>Lenny&apos;s take</span>
            </span>
          </div>
        )}
        {card.verdict && vote && (
          <motion.div
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            style={{
              background: "var(--surface2)", border: "1px solid var(--card-border)", borderRadius: 10,
              padding: "12px 16px", marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Lenny&apos;s take · </span>
            <span style={{ fontSize: 13, color: "var(--text)", lineHeight: 1.5 }}>{card.verdict}</span>
          </motion.div>
        )}

        {(card.campA.quotes.length > 1 || card.campB.quotes.length > 1) && (
          <>
            <button
              onClick={() => setExpanded(!expanded)}
              style={{
                background: "none", border: "1px solid var(--badge-border)", borderRadius: 8,
                color: "var(--text-muted)", fontSize: 12, cursor: "pointer", padding: "7px 14px",
              }}
            >
              {expanded ? "↑ Less" : "↓ More quotes"}
            </button>
            <AnimatePresence>
              {expanded && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ overflow: "hidden" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {card.campA.quotes.slice(1).map((q, i) => <QuoteBlock key={i} quote={q} accentColor={COLOR_A} />)}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {card.campB.quotes.slice(1).map((q, i) => <QuoteBlock key={i} quote={q} accentColor={COLOR_B} />)}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}
