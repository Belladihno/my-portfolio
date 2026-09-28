import { indexProjects } from "../data/projects";

export default function OtherWork() {
  return (
    <section id="other-work" className="flex w-full flex-col gap-4">
      <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
        04 — Other Work
      </div>
      <div className="flex w-full flex-col divide-y divide-border border-y border-border">
        {indexProjects.map((p) => (
          <a
            key={p.name}
            href={p.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid grid-cols-1 items-center gap-2 px-2 py-4 transition-colors duration-150 hover:bg-surface md:grid-cols-12"
          >
            <div className="font-medium text-text transition-colors group-hover:text-accent md:col-span-4">
              {p.name}
            </div>
            <div className="text-[13px] text-muted md:col-span-5">
              {p.description}
            </div>
            <div className="hidden font-mono text-[11px] tracking-wider text-muted md:col-span-2 md:block">
              {p.stack.join(" · ")}
            </div>
            <div className="font-mono text-muted opacity-0 transition-all group-hover:text-accent group-hover:opacity-100 md:col-span-1 md:text-right">
              →
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
