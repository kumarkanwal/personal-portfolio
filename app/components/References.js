"use client";

import { useState } from "react";
import { REFERENCES } from "../data";

function Avatar({ person, initials }) {
  const [failed, setFailed] = useState(false);
  if (!person.img || failed) return initials;
  return <img src={person.img} alt="" onError={() => setFailed(true)} />;
}

export default function References() {
  return (
    <section className="band" id="references" data-rail="References">
      <div className="wrap">
        <p className="eyebrow">References</p>
        <h2 style={{ maxWidth: "22ch" }}>People who have watched me build something.</h2>
        <div className="tgrid">
          {REFERENCES.map((person) => {
            const initials = person.n.trim().split(/\s+/).map((word) => word[0]).slice(0, 2).join("").toUpperCase();
            return (
              <div className="tcard" key={person.n}>
                <p>“{person.q}”</p>
                <div className="twho">
                  <span className="tavatar"><Avatar person={person} initials={initials} /></span>
                  <span>
                    <span className="tname">{person.n}</span><br />
                    <span className="trole">{person.r} · {person.src}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
