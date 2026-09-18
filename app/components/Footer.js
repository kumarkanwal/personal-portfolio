import { CONTACT } from "../data";

function SocialIcon({ name }) {
  if (name === "GitHub") {
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.28-5.27-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.95 10.95 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.71 5.38-5.29 5.67.42.36.79 1.07.79 2.16v3.2c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .7Z" /></svg>;
  }
  if (name === "LinkedIn") {
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.1 20.45H3.54V8.98H7.1v11.47Z" /></svg>;
  }
  if (name === "Upwork") {
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" /></svg>;
  }
  if (name === "WhatsApp") {
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.84 9.84 0 0 0-8.43 14.93L2.05 22l5.2-1.53A9.96 9.96 0 1 0 12.04 2Zm0 17.96a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.08.91.92-3-.2-.31a8.12 8.12 0 1 1 6.79 3.71Zm4.45-6.08c-.24-.12-1.44-.71-1.66-.79-.23-.08-.39-.12-.55.12-.16.25-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21a7.34 7.34 0 0 1-1.36-1.69c-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.43.12-.14.16-.24.24-.41.08-.16.04-.3-.02-.43-.06-.12-.55-1.33-.75-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.3-.22.25-.85.83-.85 2.02s.87 2.34.99 2.5c.12.16 1.7 2.6 4.13 3.65.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" /></svg>;
  }
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 4h16v16H4z" /><path d="m4 6 8 6 8-6" /></svg>;
}

function IconLink({ href, name }) {
  return <a href={href} target="_blank" rel="noopener" aria-label={name} title={name}><SocialIcon name={name} /><span className="sr">{name}</span></a>;
}

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__in">
        <span>Kanwal Kumar · AI &amp; automation engineer</span>
        <span className="dim">·</span>
        <IconLink href={CONTACT.github} name="GitHub" />
        <IconLink href={CONTACT.upwork} name="Upwork" />
        <IconLink href={CONTACT.linkedin} name="LinkedIn" />
        <IconLink href={CONTACT.whatsapp} name="WhatsApp" />
        <IconLink href={`mailto:${CONTACT.email}`} name="Email" />
      </div>
    </footer>
  );
}
