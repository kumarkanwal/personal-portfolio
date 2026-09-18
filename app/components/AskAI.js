"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CONTACT, RAG_SEEDS } from "../data";

export default function AskAI() {
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [remaining, setRemaining] = useState(8);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const logRef = useRef(null);
  const inputRef = useRef(null);
  const sessionRef = useRef(null);

  useEffect(() => {
    let session = localStorage.getItem("kk_sid");
    if (!session) {
      session = `s_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem("kk_sid", session);
    }
    sessionRef.current = session;
    fetch(`${CONTACT.apiBase.replace(/\/$/, "")}/session/${session}`)
      .then((response) => response.json())
      .then((data) => {
        setRemaining(data.remaining);
        if (data.remaining <= 0) setDone(true);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, busy]);

  async function ask(text) {
    const clean = text.trim();
    if (!clean || busy || done) return;
    setQuestion("");
    setMessages((current) => [...current, { text: clean, kind: "you" }]);
    setBusy(true);
    try {
      const response = await fetch(`${CONTACT.apiBase.replace(/\/$/, "")}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: clean, session_id: sessionRef.current }),
      });
      const data = await response.json();
      if (response.status === 429) {
        setMessages((current) => [...current, { text: data.detail || "Question limit reached for this session.", kind: "err" }]);
        setDone(true);
      } else if (!response.ok) {
        throw new Error("Chat request failed");
      } else {
        setMessages((current) => [...current, { text: data.answer, kind: "bot", sources: data.sources }]);
        setRemaining(data.remaining);
        if (data.remaining <= 0) setDone(true);
      }
    } catch {
      setMessages((current) => [...current, { text: `That did not go through. Try again, or email ${CONTACT.email}.`, kind: "err" }]);
    } finally {
      setBusy(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }

  return (
    <section className="band band--tint" id="ask" data-rail="Ask my AI">
      <div className="wrap">
        <p className="eyebrow">A live system, not a screenshot</p>
        <h2 style={{ maxWidth: "22ch" }}>Ask my AI about my work. It answers from my own documents.</h2>
        <p className="lede col" style={{ marginTop: 16 }}>
          Retrieval over my case studies, project notes and CV. It shows the passage it used, and it says so when it does not know instead of guessing. That refusal is deliberate it is the difference between a demo and something you would put in front of a customer.
        </p>
        <div className="rag">
          <div className="rag__bar"><i /><span>Grounded assistant — live</span></div>
          <div className="rag__body">
            <div className="rag__seed">
              {RAG_SEEDS.map((seed) => <button type="button" onClick={() => ask(seed)} key={seed}>{seed}</button>)}
            </div>
            <div className="chat">
              <div className="chat__log" ref={logRef} role="log" aria-live="polite">
                {!messages.length && !busy && (
                  <div className="chat__empty">Ask anything about my work. Answers come from my own case studies and CV, and it says so when it does not know rather than guessing. Eight questions per visit — enough to judge whether it is real.</div>
                )}
                {messages.map((message, index) => (
                  <div className={`msg msg--${message.kind}`} key={index}>
                    {message.text}
                    {!!message.sources?.length && <span className="msg__src">From: {message.sources.join(" · ")}</span>}
                  </div>
                ))}
                {busy && <div className="msg msg--bot msg--think"><i /><i /><i /></div>}
              </div>
              {!done ? (
                <>
                  <form className="chat__form" onSubmit={(event) => { event.preventDefault(); ask(question); }}>
                    <label className="sr" htmlFor="chatInput">Your question</label>
                    <textarea
                      id="chatInput"
                      ref={inputRef}
                      rows="1"
                      maxLength="500"
                      placeholder="What has he built with RAG?"
                      value={question}
                      onChange={(event) => {
                        setQuestion(event.target.value);
                        event.target.style.height = "auto";
                        event.target.style.height = `${Math.min(event.target.scrollHeight, 110)}px`;
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          ask(question);
                        }
                      }}
                    />
                    <button className="btn" type="submit" disabled={busy}>Ask</button>
                  </form>
                  <div className={`chat__meter${remaining <= 2 ? " low" : ""}`}>
                    <span>Grounded in my own documents</span><span><b>{remaining}</b> questions left</span>
                  </div>
                </>
              ) : (
                <div className="chat__done">
                  <h4>That is the demo</h4>
                  <p>If it answered what you needed, the next step is a conversation.</p>
                  <a className="btn btn--sm" href={`mailto:${CONTACT.email}`}>Email me</a>
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="small dim" style={{ marginTop: 16 }}>
          Ask it what I am worst at. It will tell you. <Link href="/projects/rag-agent">How it works →</Link>
        </p>
      </div>
    </section>
  );
}
