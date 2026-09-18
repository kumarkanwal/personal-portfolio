"use client";

import { useEffect, useRef, useState } from "react";

export default function WorkflowCanvas({ nodes }) {
  const [selected, setSelected] = useState(null);
  const [lit, setLit] = useState(-1);
  const running = useRef(false);
  const timers = useRef([]);
  const colWidth = 160;
  const gap = 8;
  const y = 30;
  const height = 78;
  const width = 40 + nodes.length * colWidth + (nodes.length - 1) * gap;

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function run() {
    if (running.current) return;
    running.current = true;
    setLit(-1);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLit(nodes.length - 1);
      running.current = false;
      return;
    }
    nodes.forEach((_, index) => {
      timers.current.push(setTimeout(() => {
        setLit(index);
        if (index === nodes.length - 1) running.current = false;
      }, index * 420));
    });
  }

  if (!nodes?.length) return null;

  return (
    <div className="canvas">
      <div className="canvas__bar">
        <span className="canvas__title">The system, step by step</span>
        <button type="button" className="btn btn--ghost btn--sm" onClick={run}>Play a run</button>
      </div>
      <div className="canvas__stage">
        <svg viewBox={`0 0 ${width} 150`} role="img" aria-label="How the system runs, step by step">
          {nodes.slice(0, -1).map((_, index) => {
            const x = 20 + index * (colWidth + gap) + colWidth;
            return <path className={`wf-link${index <= lit ? " lit" : ""}`} d={`M${x} ${y + height / 2} H${x + gap}`} key={`link-${index}`} />;
          })}
          {nodes.map((node, index) => {
            const x = 20 + index * (colWidth + gap);
            return (
              <g
                className={`wf-node${index === selected ? " sel" : ""}${index <= lit ? " lit" : ""}`}
                tabIndex="0"
                role="button"
                aria-label={node.t}
                onClick={() => setSelected(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelected(index);
                  }
                }}
                key={node.t}
              >
                <rect x={x} y={y} width={colWidth} height={height} rx="8" />
                <circle className="wf-dot" cx={x + 16} cy={y + 18} r="3.5" />
                <text className="wf-t" x={x + 16} y={y + 42}>{node.t}</text>
                <text x={x + 16} y={y + 61} fontSize="11" fill="#7F8DA0">{node.s}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="canvas__note">
        {selected === null ? (
          "Click any step to see what it does and why it is built that way."
        ) : (
          <><b>{nodes[selected].t}</b> {nodes[selected].d}</>
        )}
      </div>
    </div>
  );
}
