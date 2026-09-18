import { STACK } from "../data";
import { IconImage } from "./Media";

function TechIcon({ tech }) {
  const fallback = (tech.mono || tech.n.slice(0, 3)).toUpperCase();
  if (tech.i) return <IconImage src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.i}.svg`} fallback={fallback} />;
  if (tech.si) return <IconImage src={`https://cdn.simpleicons.org/${tech.si}`} fallback={fallback} />;
  if (tech.local) return <IconImage src={`/images/stack/${tech.local}.svg`} fallback={fallback} />;
  return <span className="mono">{fallback}</span>;
}

function Tech({ tech, id }) {
  return <span className="tech" key={id}><TechIcon tech={tech} /><span>{tech.n}</span></span>;
}

export default function Stack() {
  const half = Math.ceil(STACK.length / 2);
  const first = STACK.slice(0, half);
  const second = STACK.slice(half);
  const groups = STACK.reduce((result, tech) => {
    (result[tech.k] ||= []).push(tech);
    return result;
  }, {});

  return (
    <section className="band band--flat" id="stack" data-rail="Stack">
      <div className="wrap">
        <p className="eyebrow">What I work in</p>
        <h2 style={{ maxWidth: "20ch" }}>The stack, and where I have actually shipped with it.</h2>
      </div>
      <div className="mq" style={{ marginTop: 34 }} aria-hidden="true">
        <div className="mq__track">{first.concat(first).map((tech, index) => <Tech tech={tech} id={`a-${index}`} key={`a-${index}`} />)}</div>
      </div>
      <div className="mq mq--rev" style={{ marginTop: 12 }} aria-hidden="true">
        <div className="mq__track">{second.concat(second).map((tech, index) => <Tech tech={tech} id={`b-${index}`} key={`b-${index}`} />)}</div>
      </div>
      <div className="wrap">
        <div className="groups">
          {Object.entries(groups).map(([name, technologies]) => (
            <div className="group" key={name}>
              <h4>{name}</h4>
              <ul>{technologies.map((tech) => <li key={tech.n}>{tech.n}</li>)}</ul>
            </div>
          ))}
        </div>
        <p className="small dim" style={{ marginTop: 26 }}>
          Listed only where I have shipped something to production with it. Comfortable picking up anything adjacent most of this was learned on a deadline.
        </p>
      </div>
    </section>
  );
}
