const LINKS = [
  {
    label: "Email",
    href: "mailto:abimbolaomisakin678@gmail.com",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/2348105980102",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/adeyemi-abimbola",
  },
  {
    label: "GitHub",
    href: "https://github.com/Belladihno",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="flex w-full flex-col gap-4 pb-8">
      <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
        06 — Contact
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid max-w-narrow grid-cols-1 gap-6 sm:grid-cols-2">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex items-center justify-between border-b border-border py-2 text-[18px] text-text transition-colors duration-150 hover:text-accent"
            >
              <span>{l.label}</span>
              <span className="font-mono text-[12px] text-muted transition-colors group-hover:text-accent">
                ↑↗
              </span>
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
          <span className="inline-block h-1.5 w-1.5 bg-accent" />
          <span>Available for backend roles and freelance contracts.</span>
        </div>
      </div>
    </section>
  );
}
