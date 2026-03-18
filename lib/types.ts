export interface Quote {
  text: string;
  guest: string;
  guestTitle?: string;
  company?: string;
  source: string;
  date: string;
  type: "podcast" | "newsletter";
}

export interface ConsensusCard {
  kind: "consensus";
  id: string;
  topic: string;
  topicSlug: string;
  summary: string;
  agreementPercent: number;
  quotes: Quote[];
  tags: string[];
  firstSeen: string;
  lastSeen: string;
  evergreen: boolean;
}

export interface DebateCard {
  kind: "debate";
  id: string;
  topic: string;
  topicSlug: string;
  question: string;
  campA: { label: string; percent: number; quotes: Quote[] };
  campB: { label: string; percent: number; quotes: Quote[] };
  tags: string[];
  verdict?: string;
}

export interface ReversalCard {
  kind: "reversal";
  id: string;
  topic: string;
  topicSlug: string;
  oldWisdom: string;
  newWisdom: string;
  peakYear: string;
  declineYear: string;
  oldQuotes: Quote[];
  newQuotes: Quote[];
  reason: string;
  tags: string[];
}

export type Card = ConsensusCard | DebateCard | ReversalCard;

export interface CardsData {
  generatedAt: string;
  totalSources: number;
  cards: Card[];
}
