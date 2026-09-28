export default function Hero() {
  return (
    <section id="hero" className="w-full">
      <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
        01 — Introduction
      </div>
      <div className="mt-6 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-6">
        <div className="flex min-w-0 flex-col gap-8 lg:col-span-7">
          <h1 className="text-[32px] font-semibold leading-[1.12] tracking-tight text-text sm:text-[44px] lg:text-[52px]">
            Backend engineer building reliable APIs and delivery{" "}
            <span className="text-accent">systems</span>
          </h1>
          <div className="flex items-center gap-8 font-mono text-[13px]">
            <a
              href="#work"
              className="text-text transition-colors duration-150 hover:text-accent hover:underline hover:underline-offset-4"
            >
              See my work ↓
            </a>
            <a
              href="https://github.com/Belladihno"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors duration-150 hover:text-text"
            >
              GitHub ↑↗
            </a>
            <a
              href="https://drive.google.com/file/d/1lJkCNMz7F51gzdbEilfPakqaIHUEE9xU/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors duration-150 hover:text-text"
            >
              Resume ↑↗
            </a>
          </div>
        </div>
        <div className="w-full border border-border bg-surface p-6 lg:col-span-5">
          <div className="flex flex-col font-mono text-[12px]">
            <div className="flex flex-col divide-y divide-border">
              <div className="flex items-start justify-between gap-4 py-2">
                <span className="shrink-0 uppercase text-muted">Role</span>
                <span className="text-right text-text">Backend Engineer</span>
              </div>
              <div className="flex items-start justify-between gap-4 py-2">
                <span className="shrink-0 uppercase text-muted">Based in</span>
                <span className="text-right text-text">Lagos, Nigeria</span>
              </div>
              <div className="flex items-start justify-between gap-4 py-2">
                <span className="shrink-0 uppercase text-muted">Primary</span>
                <span className="text-right text-text">
                  NestJS · TypeScript · PostgreSQL
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 py-2">
                <span className="shrink-0 uppercase text-muted">Also uses</span>
                <span className="text-right text-text">
                  ASP.NET Core · React · Redis
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 pt-2">
                <span className="shrink-0 uppercase text-muted">Status</span>
                <span className="flex items-center gap-2 text-text">
                  <span className="inline-block h-1.5 w-1.5 bg-accent" />
                  Open to work
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
