import { CONTACT } from "../data";
import Metrics from "./Metrics";

export default function About({ projects }) {
  return (
    <>
      <section className="band band--flat band--after-hero" id="about" data-rail="About">
        <div className="wrap">
          <p className="eyebrow">About</p>
          <h2 style={{ maxWidth: "20ch" }}>I build useful systems and own them through production.</h2>
          {/* TODO: Review and personalize this drafted About copy. */}
          <p className="lede" style={{ marginTop: 16, maxWidth: "70ch" }}>
            I design, build and deploy AI agents, workflow automations, web apps, products and plugins, then maintain them after launch. Over five years of freelance work, I have owned projects end to end—from architecture and integrations to deployment—and most of the systems shown here are still running in production. I am now looking to bring that ownership into a collaborative engineering team while continuing to grow alongside experienced developers.
          </p>
          <p style={{ marginTop: 20 }}><a href={CONTACT.cv}>View my CV →</a></p>
        </div>
      </section>
      <Metrics projects={projects} />
    </>
  );
}
