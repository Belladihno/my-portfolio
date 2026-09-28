export default function About() {
  return (
    <section id="about" className="flex w-full flex-col gap-4">
      <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
        05 — About
      </div>
      <div className="flex max-w-narrow flex-col gap-4 text-[16px] leading-[1.6] text-text">
        <p>
          I&apos;m a self-taught backend engineer based in Lagos. I started
          with Node.js and Express, moved to NestJS and TypeScript as my
          primary stack, and more recently have been building production-ready
          APIs in ASP.NET Core and .NET 8 — partly to be useful across more
          teams, and partly because Clean Architecture maps cleanly between
          the two ecosystems.
        </p>
        <p>
          Most of what I build is centred on reliability: queue-backed
          delivery pipelines, transactional credit systems, idempotent webhook
          handlers, and multi-tenant data isolation. I care about getting the
          database right — explicit migrations, correct locking, indexes with
          reasoning behind them.
        </p>
        <p>
          I&apos;m currently open to backend engineering roles and take on
          select freelance contracts. If you&apos;re building something that
          needs a reliable API layer, I&apos;d like to hear about it.
        </p>
      </div>
    </section>
  );
}
