import { CONTACT } from "../data";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__in">
        <span>Kanwal Kumar AI &amp; automation engineer</span>
        <span className="dim">·</span>
        <a href={`mailto:${CONTACT.email}`} target="_blank" rel="noopener">Email</a>
        <span className="dim">·</span>
        <a href={CONTACT.linkedin} target="_blank" rel="noopener">LinkedIn</a>
        <span className="dim">·</span>
        <a href={CONTACT.github} target="_blank" rel="noopener">GitHub</a>
        <span className="dim">·</span>
        <a href={CONTACT.whatsapp} target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </footer>
  );
}
