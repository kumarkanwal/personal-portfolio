"use client";

import { useEffect, useRef, useState } from "react";
import { PROFILE } from "../data";

function Count({ value, suffix }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    const match = String(value).match(/\d+/);
    if (!node || !match || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.IntersectionObserver) return;
    const target = Number(match[0]);
    const at = String(value).indexOf(match[0]);
    const pre = String(value).slice(0, at);
    const post = String(value).slice(at + match[0].length);
    let frame;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      let start;
      const tick = (time) => {
        start ??= time;
        const progress = Math.min(1, (time - start) / 900);
        setDisplay(`${pre}${Math.round(target * (1 - Math.pow(1 - progress, 3)))}${post}`);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { rootMargin: "0px 0px -12% 0px" });
    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value]);

  return <b ref={ref}>{display}{suffix}</b>;
}

export default function Metrics({ projects }) {
  const liveProjects = projects.filter((project) => project.live).length;
  const metrics = PROFILE.metrics.map((metric, index) => index === 0 ? [String(liveProjects), metric[1], metric[2]] : metric);
  return (
    <div className="mstrip">
      {metrics.map(([value, label, suffix]) => (
        <div key={label}><Count value={value} suffix={suffix || ""} /><span>{label}</span></div>
      ))}
    </div>
  );
}
