import { CERTS, EXPERIENCE } from "../data";

export default function Experience() {
  return (
    <section className="band band--tint" id="experience" data-rail="Experience">
      <div className="wrap">
        <p className="eyebrow">Experience</p>
        <h2 style={{ maxWidth: "16ch" }}>Where I have done it.</h2>
        <div className="tl">
          {EXPERIENCE.map((item) => (
            <div className="tl__item" key={item.when}>
              <div className="tl__when">{item.when}</div>
              <h4>{item.role}</h4>
              <ul>{item.b.map((line) => <li key={line}>{line}</li>)}</ul>
            </div>
          ))}
        </div>
        <p className="eyebrow" style={{ marginTop: 46 }}>Education and certifications</p>
        <div className="certs">
          {CERTS.map(([name, source]) => <div className="cert" key={name}><b>{name}</b>{source}</div>)}
        </div>
      </div>
    </section>
  );
}
