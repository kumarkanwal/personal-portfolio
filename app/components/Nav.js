"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
    const update = () => {
      const height = document.body.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (window.scrollY / height) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    if (next) document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("kk_theme", next ? "dark" : "light");
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="nav">
      <div className="nav__in">
        <Link className="mark" href="/" onClick={closeMenu}>
          <img className="mark__pic" src="/images/kanwal.jpg" alt="" />
          Kanwal Kumar
        </Link>
        <button
          className="nav__burger"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`nav__links${menuOpen ? " open" : ""}`}>
          <Link href="/#about" onClick={closeMenu}>About</Link>
          <Link href="/#stack" onClick={closeMenu}>Stack</Link>
          <Link href="/#experience" onClick={closeMenu}>Experience</Link>
          <Link href="/#projects" onClick={closeMenu}>Projects</Link>
          <Link href="/#ask" onClick={closeMenu}>Ask my AI</Link>
          <button className="themebtn" aria-label="Toggle dark mode" type="button" onClick={toggleTheme}>
            <svg className="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
            <svg className="moon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
            </svg>
          </button>
          <Link className="btn btn--sm" href="/#contact" onClick={closeMenu}>Let&apos;s talk →</Link>
        </div>
      </div>
      <div className="progress" style={{ width: `${progress}%` }} />
    </nav>
  );
}
