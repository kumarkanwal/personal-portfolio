"use client";

import { useState } from "react";

export function MediaFrame({ src, label, shape = "" }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`ph ${shape}`}>
        <span><b>{label}</b>{src}</span>
      </div>
    );
  }
  return (
    <div className={`frame ${shape}`}>
      <img src={src} alt={label} loading="lazy" onError={() => setFailed(true)} />
    </div>
  );
}

export function IconImage({ src, fallback, className }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="mono">{fallback}</span>;
  return <img className={className} src={src} alt="" loading="lazy" onError={() => setFailed(true)} />;
}
