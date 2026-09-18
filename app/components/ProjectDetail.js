import Link from "next/link";
import { Fragment } from "react";
import { CONTACT } from "../data";
import { MediaFrame } from "./Media";
import WorkflowCanvas from "./WorkflowCanvas";

function internalHref(href) {
  if (href === "#/#ask") return "/#ask";
  if (href === "#/#contact" || href === "https://kanwalkumar.com/#/#contact") return "/#contact";
  const oldProject = href.match(/^#\/p\/([\w-]+)/);
  return oldProject ? `/projects/${oldProject[1]}` : href;
}

function ActionLink({ href, children }) {
  const normalized = internalHref(href);
  const external = /^(https?:|mailto:)/.test(normalized);
  if (normalized.startsWith("/")) return <Link className="btn btn--ghost btn--sm" href={normalized}>{children}</Link>;
  return <a className="btn btn--ghost btn--sm" href={normalized} target={external ? "_blank" : undefined} rel={external ? "noopener" : undefined}>{children}</a>;
}

export default function ProjectDetail({ project }) {
  return (
    <section className="band band--flat wrap" data-rail="Project" style={{ paddingTop: "clamp(38px,6vw,68px)" }}>
      <Link className="back" href="/#projects">← All projects</Link>
      <div className="d__head">
        <div>
          <div className="pcard__top" style={{ margin: "18px 0 12px" }}>
            <span className="pill">{project.cat}</span>
            {project.live && <span className="pill pill--live">Live in production</span>}
          </div>
          <h1 style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>{project.name}</h1>
          <p className="lede" style={{ marginTop: 16 }}>{project.tagline}</p>
          <p style={{ color: "var(--run)" }}>{project.result}</p>
          <p>
            {project.url && <><a className="btn btn--sm" href={internalHref(project.url)} target={project.url.startsWith("http") ? "_blank" : undefined} rel="noopener">Open it live</a>{" "}</>}
            {project.links.map(([label, href]) => (
              <Fragment key={`${label}-${href}`}><ActionLink href={href}>{label}</ActionLink>{" "}</Fragment>
            ))}
          </p>
        </div>
        <div>
          <div className="d__meta">
            {project.meta.map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}
            <div><span>Stack</span><b>{project.stack.length} technologies</b></div>
          </div>
          {project.ask && (
            <div className="d__ask">
              <h4>Want to see it running?</h4>
              <p style={{ margin: 0 }}>This one lives inside a client&apos;s business, so the repo is private and there is no public demo. Happy to screen-share the whole system on a call.</p>
              <p style={{ margin: "12px 0 0" }}><a className="btn btn--sm" href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Walkthrough ${project.name}`)}`}>Ask for a walkthrough</a></p>
            </div>
          )}
        </div>
      </div>
      <div className="shots">
        <div className="frame wide"><video src={`/images/projects/${project.slug}-3.mp4`} controls preload="metadata" playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
        <MediaFrame src={`/images/projects/${project.slug}-1.jpg`} label="The system running" shape="wide" />
        <MediaFrame src={`/images/projects/${project.slug}-2.jpg`} label="Workflow or admin view" shape="wide" />
      </div>
      <div className="block">
        <h3>What it is</h3><p>{project.what}</p>
        <h3>The problem it solves</h3><p>{project.problem}</p>
        <h3>How it works</h3><ol>{project.built.map((item) => <li key={item}>{item}</li>)}</ol>
      </div>
      <WorkflowCanvas nodes={project.nodes} />
      <div className="callout"><h4>{project.hard.t}</h4><p>{project.hard.d}</p></div>
      <div className="hard"><h4>What I would do differently</h4><p>{project.learn}</p></div>
      <div className="block">
        <h3>Built with</h3>
        <div className="chips" style={{ marginTop: 10 }}>{project.stack.map((item) => <span className="chip" key={item}>{item}</span>)}</div>
      </div>
      <p style={{ marginTop: 40 }}>
        <Link className="btn" href="/#projects">See the other projects</Link>{" "}
        <a className="btn btn--ghost" href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`About ${project.name}`)}`}>Ask me about this one</a>
      </p>
    </section>
  );
}
