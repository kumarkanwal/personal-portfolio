"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function SiteEffects() {
  const pathname = usePathname();
  const router = useRouter();
  const lineRef = useRef(null);

  useEffect(() => {
    function handleLegacyHash() {
      const project = window.location.hash.match(/^#\/p\/([\w-]+)/);
      if (project) {
        router.replace(`/projects/${project[1]}`);
        return;
      }
      const anchor = window.location.hash.match(/^#\/#([\w-]+)/);
      if (anchor) {
        window.history.replaceState(null, "", `/#${anchor[1]}`);
        requestAnimationFrame(() => document.getElementById(anchor[1])?.scrollIntoView());
      }
    }
    handleLegacyHash();
    window.addEventListener("hashchange", handleLegacyHash);
    return () => window.removeEventListener("hashchange", handleLegacyHash);
  }, [router]);

  useEffect(() => {
    const root = document.querySelector("main");
    const line = lineRef.current;
    if (!root || !line) return;
    const sections = Array.from(root.querySelectorAll("[data-rail]"));
    line.replaceChildren();
    const dots = sections.map((section, index) => {
      const dot = document.createElement("span");
      dot.className = "rail__dot";
      dot.style.top = `${sections.length < 2 ? 0 : (index / (sections.length - 1)) * 100}%`;
      dot.dataset.label = section.dataset.rail;
      line.appendChild(dot);
      return dot;
    });

    if (typeof IntersectionObserver === "undefined") {
      root.querySelectorAll(".band,.mstrip,.hero__grid").forEach((item) => item.classList.add("in"));
      return;
    }

    const railObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        const index = sections.indexOf(entry.target);
        if (index > -1) dots[index]?.classList.toggle("on", entry.isIntersecting);
      }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((section) => railObserver.observe(section));

    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      }),
      { rootMargin: "0px 0px -6% 0px" },
    );
    root.querySelectorAll(".band,.mstrip,.hero__grid").forEach((item) => {
      item.classList.add("reveal");
      revealObserver.observe(item);
    });

    return () => {
      railObserver.disconnect();
      revealObserver.disconnect();
    };
  }, [pathname]);

  return (
    <div className="rail" aria-hidden="true">
      <div className="rail__line" ref={lineRef} />
    </div>
  );
}
