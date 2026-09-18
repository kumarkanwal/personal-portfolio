"use client";

import { useEffect, useRef, useState } from "react";
import { VOICE_ENABLED, VOICE_ENDPOINT } from "../data";

function MicIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8" />
    </svg>
  );
}

export default function VoiceAgent() {
  const [notice, setNotice] = useState("");
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  function startVoiceSession() {
    // TODO: Build and connect the voice agent to VOICE_ENDPOINT here.
    void VOICE_ENDPOINT;
  }

  function handleClick() {
    if (VOICE_ENABLED) {
      startVoiceSession();
      return;
    }
    setNotice("Voice is coming soon — try the chat for now.");
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setNotice(""), 3500);
  }

  return (
    <div className="hero__voice">
      <button type="button" className="btn btn--ghost" onClick={handleClick}>
        <MicIcon /> Talk to AI {!VOICE_ENABLED && <span className="chip">Soon</span>}
      </button>
      <p className="small dim hero__voice-note" role="status" aria-live="polite">{notice}</p>
    </div>
  );
}
