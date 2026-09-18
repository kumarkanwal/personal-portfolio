"use client";

import Link from "next/link";
import { RAG_SEEDS, VOICE_ENABLED } from "../data";
import { useAIWidget } from "./AIWidget";

export default function AskAI() {
  const { askFromShowcase, openChat, openVoice } = useAIWidget();

  return (
    <section className="band band--tint" id="ask" data-rail="Ask my AI">
      <div className="wrap">
        <p className="eyebrow">A live system, not a screenshot</p>
        <h2 style={{ maxWidth: "22ch" }}>Ask my AI about my work. It answers from my own documents.</h2>
        <p className="lede col" style={{ marginTop: 16 }}>
          Retrieval over my case studies, project notes and CV. It shows the passage it used, and it says so when it does not know instead of guessing. That refusal is deliberate it is the difference between a demo and something you would put in front of a customer.
        </p>
        <div className="rag__seed ask-showcase__seeds">
          {RAG_SEEDS.map((seed) => <button type="button" onClick={() => askFromShowcase(seed)} key={seed}>{seed}</button>)}
        </div>
        <div className="ask-showcase__actions">
          <button className="btn" type="button" onClick={openChat}>Chat with AI</button>
          <button className="btn btn--ghost" type="button" onClick={openVoice}>
            Talk to AI{!VOICE_ENABLED && " · Soon"}
          </button>
        </div>
        <p className="small dim" style={{ marginTop: 16 }}>
          Ask it what I am worst at. It will tell you. <Link href="/projects/rag-agent">How it works →</Link>
        </p>
      </div>
    </section>
  );
}
