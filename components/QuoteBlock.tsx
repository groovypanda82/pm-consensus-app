"use client";

import { useState, useEffect } from "react";
import type { Quote } from "@/lib/types";
import { getSourceLinks } from "@/lib/sourceLinks";

interface Props {
  quote: Quote;
  accentColor?: string;
}

export default function QuoteBlock({ quote, accentColor = "#4ade80" }: Props) {
  const [url, setUrl] = useState<string>("#");

  useEffect(() => {
    getSourceLinks().then((links) => {
      setUrl(links[quote.source] ?? "#");
    });
  }, [quote.source]);

  return (
    <div style={{
      background: "var(--quote-bg)",
      border: "1px solid var(--quote-border)",
      borderLeft: `3px solid ${accentColor}`,
      borderRadius: "0 10px 10px 0",
      padding: "16px 18px",
    }}>
      <p style={{
        fontSize: 14, lineHeight: 1.65, color: "var(--text)",
        margin: "0 0 12px", fontStyle: "italic",
      }}>
        &ldquo;{quote.text}&rdquo;
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: accentColor + "22",
          border: `1px solid ${accentColor}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 700, color: accentColor, flexShrink: 0,
        }}>
          {quote.guest.charAt(0)}
        </div>
        <div>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>{quote.guest}</span>
          {quote.guestTitle && (
            <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 6 }}>
              {quote.guestTitle}
            </span>
          )}
          {quote.company && (
            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
              {" · "}{quote.company}
            </span>
          )}
        </div>
        <div style={{ marginLeft: "auto", flexShrink: 0 }}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 10, color: "var(--text-muted)", background: "var(--surface2)",
              border: "1px solid var(--badge-border)", borderRadius: 4, padding: "2px 7px",
              textDecoration: "none", display: "inline-block",
            }}
          >
            {quote.type === "podcast" ? "🎙" : "📄"} {new Date(quote.date).getFullYear()} ↗
          </a>
        </div>
      </div>
    </div>
  );
}
