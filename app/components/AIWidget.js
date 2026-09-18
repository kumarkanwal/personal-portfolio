"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { CONTACT, RAG_SEEDS, VOICE_ENABLED, VOICE_ENDPOINT } from "../data";
import VoiceAgent from "./VoiceAgent";

const AIWidgetContext = createContext(null);
const INITIAL_MESSAGE = {
  text: "Hi! I'm Kanwal's AI assistant. Ask me about his skills, experience, projects or availability.",
  kind: "bot",
};

function ChatIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 12a8 8 0 0 1-8 8H6l-4 2 1.3-4.3A9 9 0 1 1 21 12Z" />
    </svg>
  );
}

function MicIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function VoicePanel({ switchToChat }) {
  return (
    <div className="ai-voice" role="tabpanel" id="ai-panel-voice" aria-labelledby="ai-tab-voice">
      <div className="ai-voice__mic"><MicIcon size={36} /></div>
      <h3>Talk to Kanwal&apos;s AI</h3>
      <p className={`ai-voice__status${VOICE_ENABLED ? " is-ready" : ""}`}>
        <i />{VOICE_ENABLED ? "Ready to talk" : "Coming soon"}
      </p>
      <div className="ai-voice__transcript" role="status" aria-live="polite">
        {!VOICE_ENABLED && "Voice is coming soon — try the chat for now."}
      </div>
      {VOICE_ENABLED ? (
        <VoiceAgent endpoint={VOICE_ENDPOINT} />
      ) : (
        <button className="btn ai-voice__action" type="button" onClick={switchToChat}>
          <ChatIcon size={17} /> Switch to Chat
        </button>
      )}
      <p className="small dim ai-voice__note">Your microphone is only used while the agent is listening.</p>
    </div>
  );
}

export function useAIWidget() {
  const value = useContext(AIWidgetContext);
  if (!value) throw new Error("useAIWidget must be used inside AIWidgetProvider");
  return value;
}

export default function AIWidgetProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [question, setQuestion] = useState("");
  const [remaining, setRemaining] = useState(8);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const dialogRef = useRef(null);
  const launchersRef = useRef(null);
  const chatLauncherRef = useRef(null);
  const voiceLauncherRef = useRef(null);
  const logRef = useRef(null);
  const inputRef = useRef(null);
  const sessionRef = useRef(null);

  function getSession() {
    if (sessionRef.current) return sessionRef.current;
    let session = localStorage.getItem("kk_sid");
    if (!session) {
      session = `s_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem("kk_sid", session);
    }
    sessionRef.current = session;
    return session;
  }

  useEffect(() => {
    const session = getSession();
    fetch(`${CONTACT.apiBase.replace(/\/$/, "")}/session/${session}`)
      .then((response) => response.json())
      .then((data) => {
        setRemaining(data.remaining);
        if (data.remaining <= 0) setDone(true);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (open && activeTab === "chat" && logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, busy, open, activeTab]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      if (activeTab === "chat") inputRef.current?.focus();
      else dialogRef.current?.focus();
    }, 80);
    return () => window.clearTimeout(timer);
  }, [open, activeTab]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    if (window.matchMedia("(max-width: 640px)").matches) document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeWidget();
    };
    const handlePointerDown = (event) => {
      if (dialogRef.current?.contains(event.target) || launchersRef.current?.contains(event.target)) return;
      closeWidget();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open, activeTab]);

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
        body: JSON.stringify({ question: clean, session_id: getSession() }),
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

  function openWidget(tab = "chat") {
    setActiveTab(tab);
    setOpen(true);
  }

  function askFromShowcase(text) {
    openWidget("chat");
    ask(text);
  }

  function closeWidget() {
    const launcher = activeTab === "voice" ? voiceLauncherRef.current : chatLauncherRef.current;
    setOpen(false);
    requestAnimationFrame(() => launcher?.focus());
  }

  const hasAsked = messages.some((message) => message.kind === "you");
  const contextValue = {
    openChat: () => openWidget("chat"),
    openVoice: () => openWidget("voice"),
    askFromShowcase,
  };

  return (
    <AIWidgetContext.Provider value={contextValue}>
      {children}
      <div className={`ai-widget${open ? " ai-widget--open" : ""}`}>
        <div
          className={`ai-popup${open ? " is-open" : ""}`}
          id="ai-widget-dialog"
          ref={dialogRef}
          role="dialog"
          aria-labelledby="ai-widget-title"
          aria-hidden={!open}
          inert={!open}
          tabIndex={-1}
        >
          <header className="ai-popup__header">
            <div className="ai-popup__identity">
              <span className="ai-popup__spark" aria-hidden="true">✦</span>
              <span>
                <strong id="ai-widget-title">Kanwal&apos;s AI</strong>
                <small><i />Online assistant</small>
              </span>
            </div>
            <button className="ai-icon-btn" type="button" aria-label="Close AI assistant" onClick={closeWidget}>×</button>
          </header>
          <div className="ai-tabs" role="tablist" aria-label="AI assistant mode">
            <button
              id="ai-tab-chat"
              type="button"
              role="tab"
              aria-selected={activeTab === "chat"}
              aria-controls="ai-panel-chat"
              onClick={() => setActiveTab("chat")}
            >
              <ChatIcon size={17} /> Chat
            </button>
            <button
              id="ai-tab-voice"
              type="button"
              role="tab"
              aria-selected={activeTab === "voice"}
              aria-controls="ai-panel-voice"
              onClick={() => setActiveTab("voice")}
            >
              <MicIcon size={17} /> Voice
            </button>
          </div>
          <div className="ai-popup__content">
            {activeTab === "chat" ? (
              <div className="ai-chat" role="tabpanel" id="ai-panel-chat" aria-labelledby="ai-tab-chat">
                <div className="chat__log ai-chat__log" ref={logRef} role="log" aria-live="polite">
                  {messages.map((message, index) => (
                    <div className={`msg msg--${message.kind}`} key={index}>
                      {message.text}
                      {!!message.sources?.length && <span className="msg__src">From: {message.sources.join(" · ")}</span>}
                    </div>
                  ))}
                  {busy && <div className="msg msg--bot msg--think"><i /><i /><i /></div>}
                </div>
                {!hasAsked && !done && (
                  <div className="rag__seed ai-chat__seeds">
                    {RAG_SEEDS.map((seed) => <button type="button" onClick={() => ask(seed)} key={seed}>{seed}</button>)}
                  </div>
                )}
                <div className="ai-chat__composer">
                  {!done ? (
                    <>
                      <form className="chat__form" onSubmit={(event) => { event.preventDefault(); ask(question); }}>
                        <label className="sr" htmlFor="aiChatInput">Ask about Kanwal</label>
                        <textarea
                          id="aiChatInput"
                          ref={inputRef}
                          rows="1"
                          maxLength="500"
                          placeholder="Ask about Kanwal..."
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
                        <button className="btn ai-chat__send" type="submit" disabled={busy} aria-label="Send question"><SendIcon /></button>
                      </form>
                      <p className={`ai-chat__note${remaining <= 2 ? " low" : ""}`}>
                        Answers only from my own documents · <b>{remaining}</b> questions left
                      </p>
                    </>
                  ) : (
                    <div className="chat__done">
                      <h4>That is the demo</h4>
                      <p>If it answered what you needed, the next step is a conversation.</p>
                      <a className="btn btn--sm" href={`mailto:${CONTACT.email}`}>Email me</a>
                    </div>
                  )}
                  <Link className="ai-chat__how" href="/projects/rag-agent" onClick={closeWidget}>How it works →</Link>
                </div>
              </div>
            ) : (
              <VoicePanel switchToChat={() => setActiveTab("chat")} />
            )}
          </div>
        </div>
        <div className="ai-launchers" ref={launchersRef}>
          <button
            className="ai-launcher ai-launcher--chat"
            type="button"
            ref={chatLauncherRef}
            aria-label="Open AI chat"
            aria-expanded={open && activeTab === "chat"}
            aria-controls="ai-widget-dialog"
            onClick={() => openWidget("chat")}
          >
            <ChatIcon />
          </button>
          <button
            className="ai-launcher ai-launcher--voice"
            type="button"
            ref={voiceLauncherRef}
            aria-label="Open AI voice assistant"
            aria-expanded={open && activeTab === "voice"}
            aria-controls="ai-widget-dialog"
            onClick={() => openWidget("voice")}
          >
            <MicIcon />
          </button>
        </div>
      </div>
    </AIWidgetContext.Provider>
  );
}
