const steps = [
  ["01", "Watch the real thing", "I sit with the actual inbox, phone log or spreadsheet before designing anything. Systems built from a description solve a problem nobody has."],
  ["02", "Ship the narrowest version", "One path, handled properly, live. My repeated early mistake was building the full feature set before seeing real traffic — half of it never fired."],
  ["03", "Measure against real traffic", "Real messages, real failures, real edge cases. Two weeks of production data beats any amount of my own guessing."],
  ["04", "Extend from what happened", "Only then add the rest, in the order reality asked for. It is also why the systems stay simple enough to hand over."],
];

export default function Approach() {
  return (
    <section className="band" data-rail="Approach">
      <div className="wrap">
        <p className="eyebrow">How I approach a problem</p>
        <h2 style={{ maxWidth: "22ch" }}>The same four steps, whatever the stack is.</h2>
        <div className="proc">
          {steps.map(([number, title, description]) => (
            <div className="pstep" key={number}>
              <div className="pstep__n">{number}</div><h4>{title}</h4><p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
