"use client";

import Link from "next/link";
import { useState } from "react";
import { CATS } from "../data";
import { MediaFrame } from "./Media";

const PAGE_SIZE = 3;

export default function Projects({ projects }) {
  const [active, setActive] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const filtered = active === "All" ? projects : projects.filter((project) => project.cat === active);
  const visible = active === "All" ? filtered.slice(0, visibleCount) : filtered;
  const remaining = Math.max(0, projects.length - visibleCount);
  const allShown = remaining === 0;
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function selectCategory(category) {
    setActive(category);
    setVisibleCount(PAGE_SIZE);
  }

  function toggleProjects() {
    if (!allShown) {
      setVisibleCount((count) => Math.min(count + PAGE_SIZE, projects.length));
      return;
    }
    setVisibleCount(PAGE_SIZE);
    window.requestAnimationFrame(() => {
      document.getElementById("projects")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    });
  }

  return (
    <section className="band" id="projects" data-rail="Projects">
      <div className="wrap">
        <p className="eyebrow">Projects</p>
        <h2 style={{ maxWidth: "22ch" }}>{projects.length} projects. Filter by what you are hiring for.</h2>
        <div className="filters">
          {["All", ...CATS].map((category) => {
            const count = category === "All" ? projects.length : projects.filter((project) => project.cat === category).length;
            return (
              <button type="button" key={category} aria-pressed={category === active} onClick={() => selectCategory(category)}>
                {category}<span className="count">{count}</span>
              </button>
            );
          })}
        </div>
        <div className="pgrid">
          {!visible.length && <div className="empty">Nothing here yet. Add a project folder for this category.</div>}
          {visible.map((project, index) => (
            <Link
              className="pcard"
              href={`/projects/${project.slug}`}
              style={{ animationDelay: `${reduced ? 0 : index * 55}ms` }}
              key={project.slug}
            >
              <div className="pcard__shot">
                <MediaFrame src={project.media.cover} label={project.name} />
              </div>
              <div className="pcard__body">
                <div className="pcard__top">
                  <span className="pill">{project.cat}</span>
                  {project.live && <span className="pill pill--live">Live in production</span>}
                  {project.ask && <span className="pill pill--demo">Private walkthrough on request</span>}
                </div>
                <h3>{project.name}</h3>
                <p className="pcard__d">{project.tagline}</p>
                <p className="pcard__res">{project.result}</p>
                <div className="chips">{project.stack.map((item) => <span className="chip" key={item}>{item}</span>)}</div>
                <span className="pcard__go">See how it was built →</span>
              </div>
            </Link>
          ))}
        </div>
        {active === "All" && projects.length > PAGE_SIZE && (
          <div className="list-toggle">
            <button className="btn btn--ghost" type="button" onClick={toggleProjects}>
              {allShown ? "Show less" : `Show more projects (${remaining} more)`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
