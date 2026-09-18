"use client";

function MicIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8" />
    </svg>
  );
}

export default function VoiceAgent({ endpoint }) {
  function startVoiceSession() {
    // TODO: Build and connect the voice agent to VOICE_ENDPOINT here.
    void endpoint;
  }

  return (
    <button className="btn ai-voice__action" type="button" onClick={startVoiceSession}>
      <MicIcon /> Start Voice Call
    </button>
  );
}
