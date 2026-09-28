"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-bg transition-colors duration-150 ${
        scrolled ? "border-b border-border" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-site flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between"
        id="top"
      >
        <a
          href="#top"
          className="font-mono text-sm font-medium tracking-wide text-text transition-colors duration-150 hover:text-accent"
        >
          ABIMBOLA
        </a>
        {/* Mobile: 2x2 grid centered below wordmark. Desktop: inline row. */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 md:flex md:items-center md:gap-8">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-mono text-[12px] text-muted transition-colors duration-150 hover:text-text"
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
