"use client";

import { useState } from "react";
import { CONTACT } from "../data";

const emptyForm = { name: "", email: "", company: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [note, setNote] = useState("Goes straight to my inbox. You get a confirmation back within seconds.");
  const [error, setError] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function update(field) {
    return (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!name || !email.includes("@") || !message) {
      setNote("Name, a valid email, and a message then I will send it.");
      setError(true);
      return;
    }
    setError(false);
    if (!CONTACT.formEndpoint) {
      setNote("No endpoint set yet, so this opens your mail client. Set CONTACT.formEndpoint to send it silently.");
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Role enquiry from ${name}`)}&body=${encodeURIComponent(`${message}\n\n${email}`)}`;
      return;
    }
    setSending(true);
    try {
      const response = await fetch(CONTACT.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-form-key": "kk-portfolio-9f3a2b" },
        body: JSON.stringify({ name, email, message, company: form.company }),
      });
      if (!response.ok) throw new Error("Contact request failed");
      setSent(true);
    } catch {
      setNote(`That did not send. Email me directly at ${CONTACT.email}.`);
      setError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="band band--tint" id="contact" data-rail="Contact">
      <div className="wrap">
        <div className="cgrid">
          <div>
            <p className="eyebrow">Next step</p>
            <h2 style={{ maxWidth: "18ch" }}>Happy to walk through any of this on a call.</h2>
            <p className="lede" style={{ marginTop: 16 }}>Send me the role and I will tell you honestly whether I am a fit. If I am not, I will say so rather than take up your time.</p>
            <p style={{ marginTop: 20 }}>
              <a className="btn" href={`mailto:${CONTACT.email}`} target="_blank" rel="noopener">Email me</a>{" "}
              <a className="btn btn--ghost" href={CONTACT.linkedin} target="_blank" rel="noopener">LinkedIn</a>{" "}
              <a className="btn btn--ghost" href={CONTACT.github} target="_blank" rel="noopener">GitHub</a>
            </p>
            <p className="small dim">I reply within 4 hours during my working hours (Mon–Fri • 9:00 AM – 5:00 PM ET). Faster on <a href={CONTACT.whatsapp} target="_blank" rel="noopener">WhatsApp</a>.</p>
          </div>
          <div className="formbox">
            {!sent ? (
              <>
                <p className="canvas__title" style={{ marginBottom: 14 }}>Or leave it here</p>
                <form onSubmit={submit} noValidate>
                  <div className="field"><label htmlFor="fname">Name</label><input id="fname" autoComplete="name" value={form.name} onChange={update("name")} /></div>
                  <div className="field"><label htmlFor="femail">Email</label><input id="femail" type="email" autoComplete="email" value={form.email} onChange={update("email")} /></div>
                  <div className="field" style={{ position: "absolute", left: -9999 }} aria-hidden="true">
                    <label htmlFor="fx1">Leave this empty</label><input id="fx1" tabIndex="-1" autoComplete="new-password" value={form.company} onChange={update("company")} />
                  </div>
                  <div className="field"><label htmlFor="fmsg">The role, or the question</label><textarea id="fmsg" value={form.message} onChange={update("message")} /></div>
                  <button className="btn btn--dark" type="submit" disabled={sending} style={{ width: "100%", justifyContent: "center" }}>{sending ? "Sending…" : "Send"}</button>
                  <p className="small dim" style={{ margin: "12px 0 0", color: error ? "var(--leak)" : undefined }}>{note}</p>
                </form>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "18px 4px" }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--run-tint)", color: "var(--run)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 22 }}>✓</div>
                <h4 style={{ marginBottom: 8 }}>Message sent</h4>
                <p className="small dim" style={{ marginBottom: 18 }}>A confirmation is on its way to {form.email.trim()} (please check your spam folder) . I reply within about 4 hours during working hours.</p>
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => { setSent(false); setForm(emptyForm); }}>Send another</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
