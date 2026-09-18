import Link from "next/link";
import { CONTACT, PROFILE } from "../data";
import { MediaFrame } from "./Media";

export default function Hero() {
  return (
    <section className="hero wrap" data-rail="Intro">
      <div className="hero__grid">
        <div>
          <span className="tag"><i />Open to Full-Time &amp; Contract Roles</span>
          <h1>I build AI systems that save time, cut costs, and Help Businesses scale</h1>
          <p className="hero__sub lede">
            AI Agents, automation, web apps, products and plugins designed, written and deployed by me, then maintained after launch. Most of what is below is still running right now. 
          </p>
          <div className="hero__cta">
            <Link className="btn" href="#projects">See the projects</Link>
            <Link className="btn btn--ghost" href="#ask">Ask my AI about me</Link>
            <a className="btn btn--ghost" href={CONTACT.cv}>Download CV</a>
          </div>
        </div>
        <aside>
          <MediaFrame src="/images/kanwal.jpg" label="Kanwal Kumar, AI and automation engineer" shape="sq" />
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
