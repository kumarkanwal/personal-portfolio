"use client";

import { useState } from "react";
import { REFERENCES } from "../data";

function Avatar({ person, initials }) {
  const [failed, setFailed] = useState(false);
  if (!person.img || failed) return initials;
  return <img src={person.img} alt="" onError={() => setFailed(true)} />;
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.1 20.45H3.54V8.98H7.1v11.47Z" />
    </svg>
  );
}

export default function References() {
  const [showAll, setShowAll] = useState(false);
  const initialCount = 3;
  const visible = showAll ? REFERENCES : REFERENCES.slice(0, initialCount);
  const remaining = Math.max(0, REFERENCES.length - initialCount);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function toggleReferences() {
    if (!showAll) {
      setShowAll(true);
      return;
    }
    setShowAll(false);
    window.requestAnimationFrame(() => {
      document.getElementById("references")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    });
  }

  return (
    <section className="band band--tint" id="references" data-rail="References">
      <div className="wrap">
        <p className="eyebrow">References</p>
        <h2 style={{ maxWidth: "22ch" }}>People who have watched me build something.</h2>
        <div className="tgrid">
          {visible.map((person) => {
            const initials = person.n.trim().split(/\s+/).map((word) => word[0]).slice(0, 2).join("").toUpperCase();
            return (
              <div className="tcard" key={person.n}>
                <p>“{person.q}”</p>
                <div className="twho">
                  <span className="tavatar"><Avatar person={person} initials={initials} /></span>
                  <span>
                    <span className="tname">
                      {person.n}{" "}
                      {person.linkedin && (
                        <a href={person.linkedin} target="_blank" rel="noopener" aria-label={`${person.n} on LinkedIn`}>
                          <LinkedInIcon />
                        </a>
                      )}
                    </span><br />
                    <span className="trole">{person.r} · {person.src}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {REFERENCES.length > initialCount && (
          <div className="list-toggle">
            <button className="btn btn--ghost" type="button" onClick={toggleReferences}>
              {showAll ? "Show less" : `Show more testimonials (${remaining} more)`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
