const questions = [
  ["Are you available, and from when?", "I am open to full-time and contract roles — email or WhatsApp me and I will confirm a start date the same day."],
  ["What are your salary expectations?", "I would rather discuss compensation once I understand the role, the scope and the package as a whole. I am flexible for the right team and will give you a clear number on a call."],
  ["How much of this did you build yourself?", "Most of my projects have been solo, where I handled everything from planning to deployment. When specialized expertise was needed, I collaborated with trusted professionals from my network to deliver the best results."],
  ["Have you worked on a team, or only solo?", "I've collaborated on team projects during internships and university, while most freelance projects have been solo. I handle projects end-to-end, document my work for smooth handovers, and collaborate with trusted specialists when specific expertise is needed."],
  ["What is your English like?", "I work in English daily with clients in the US and UK calls, written specs and documentation. Everything on this site was written by me. "],
  ["Can I see code?", "Yes. GitHub is linked at the top, and each project links its repository where the client permitted it. The private client systems are marked as such I will walk through the architecture on a call and share sanitised excerpts."],
  ["What are you looking for next?", "I'm looking for a collaborative team where I can build meaningful AI products, take ownership of challenging projects, and continue growing as an AI Automation Engineer while learning from experienced engineers and contributing to innovative solutions."],
  ["What are you weakest at?", "My biggest gap isn't building software it's building it alongside a large engineering team. Freelancing taught me ownership; now I want to learn the practices that only come from collaborating with experienced developers at scale, such as architecture reviews, mentorship, and long-term product development."],
];

export default function FAQ() {
  return (
    <section className="band" id="questions" data-rail="FAQ">
      <div className="wrap">
        <p className="eyebrow">Straight answers</p>
        <h2 style={{ maxWidth: "18ch" }}>The screening questions, answered before you ask.</h2>
        <div className="faq">
          {questions.map(([question, answer]) => (
            <details className="q" key={question}>
              <summary className="q__btn">{question}<span className="q__sign">+</span></summary>
              <div className="q__a"><p>{answer}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
