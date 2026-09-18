"use client";

import Link from "next/link";
import { CONTACT, PROFILE } from "../data";
import { MediaFrame } from "./Media";
import VoiceAgent from "./VoiceAgent";

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.1 20.45H3.54V8.98H7.1v11.47Z" />
    </svg>
  );
}

export default function Hero() {
  function focusChat() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => document.getElementById("chatInput")?.focus(), reduced ? 0 : 500);
  }

  return (
    <section className="hero wrap" data-rail="Hero">
      <div className="hero__grid">
        <div className="hero__left">
          <div className="hero__content">
            <span className="tag"><i />Open to Full-Time &amp; Contract Roles</span>
            <h1>I build AI systems that save time, cut costs, and help businesses scale.</h1>
            <p className="hero__sub lede">AI agents, automations, web apps and plugins — designed, built, deployed and maintained by me.</p>
            <div>
              <Link className="btn hero__primary" href="#projects">See the projects →</Link>
            </div>
            <div className="hero__cta hero__secondary">
              <Link className="btn btn--ghost" href="#contact">Contact Me</Link>
              <a className="btn btn--ghost hero__linkedin" href={CONTACT.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a className="btn btn--ghost" href={CONTACT.cv} target="_blank" rel="noopener">View CV</a>
            </div>
          </div>
          <div className="formbox hero__agent">
            <p className="canvas__title" style={{ marginBottom: 4 }}><span style={{ color: "var(--signal)" }} aria-hidden="true">✦</span> Ask my AI</p>
            <p className="small dim" style={{ margin: 0 }}>Instant answers about my work</p>
            <div className="hero__agent-actions">
              <a className="btn" href="#ask" onClick={focusChat}>Chat with AI</a>
              <VoiceAgent />
            </div>
          </div>
        </div>
        <aside className="hero__media">
          <MediaFrame src="/images/kanwal.jpg" label="Kanwal Kumar, AI automation engineer and AI agents builder" shape="sq" />
          <div className="hero__caption">
            <h3 style={{ fontWeight: 600 }}>Kanwal Kumar</h3>
            <p className="small" style={{ color: "var(--signal)", margin: "6px 0 0" }}>AI Automation Engineer · AI Agents Builder</p>
          </div>
          <div className="facts">
            {PROFILE.facts.map(([label, value]) => (
              <div key={label}><span>{label}</span><b>{value}</b></div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
