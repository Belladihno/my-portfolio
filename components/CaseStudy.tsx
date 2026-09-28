import type { FeaturedProject } from "../data/projects";
import { caseStudies } from "../data/case-studies";

export default function CaseStudy({ project }: { project: FeaturedProject }) {
  const content = caseStudies[project.slug];

  return (
    <div className="mx-auto w-full max-w-prose px-5 py-10">
      <div className="mb-8">
        <a
          href="/#work"
          className="font-mono text-[13px] text-muted transition-colors duration-150 hover:text-accent"
        >
          ← Back to work
        </a>
      </div>

      <header className="mb-12 border-b border-border pb-8">
        <h1 className="mb-4 text-[32px] font-semibold tracking-tight text-text">
          {project.name}
        </h1>
        {project.isLive && (
          <div className="mb-4 flex items-center gap-1.5 font-mono text-[11px] text-muted">
            <span className="text-[8px] leading-none text-accent">●</span>
            <span>Live</span>
          </div>
        )}
        <div className="mb-4 flex flex-wrap items-center gap-6 font-mono text-[13px]">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text transition-colors duration-150 hover:text-accent"
            >
              Live demo ↑↗
            </a>
          )}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text transition-colors duration-150 hover:text-accent"
          >
            GitHub ↑↗
          </a>
        </div>
        <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
          {project.stack.join(" · ")}
        </div>
      </header>

      {content ? (
        <>
          <section className="mb-12 border-b border-border pb-12">
            <div className="mb-6 font-mono text-[11px] uppercase tracking-wider text-muted">
              01 / Problem
            </div>
            <div className="space-y-4 text-[16px] leading-relaxed text-text">
              {content.problem.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          <section className="mb-12 border-b border-border pb-12">
            <div className="mb-6 font-mono text-[11px] uppercase tracking-wider text-muted">
              02 / Architecture
            </div>
            <div className="mb-8 w-full">
              <img
                src={project.diagramPath}
                alt={`${project.name} architecture diagram`}
                className="h-auto w-full"
              />
            </div>
            <p className="mb-4 text-[16px] leading-relaxed text-text">
              {content.architectureIntro}
            </p>
            <div className="space-y-4 text-[16px] leading-relaxed text-text">
              {content.architecture.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          <section className="mb-12 border-b border-border pb-12">
            <div className="mb-6 font-mono text-[11px] uppercase tracking-wider text-muted">
              03 / Key Decisions
            </div>
            <ol className="flex list-none flex-col gap-6 p-0">
              {content.decisions.map((d, i) => (
                <li
                  key={i}
                  className="border-l border-border pl-4"
                >
                  <div className="mb-1 font-mono text-[11px] uppercase text-accent">
                    Decision {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mb-1 text-[16px] font-medium text-text">
                    {d.title}
                  </div>
                  <p className="text-[16px] leading-relaxed text-text">
                    {d.body}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mb-12 border-b border-border pb-12">
            <div className="mb-6 font-mono text-[11px] uppercase tracking-wider text-muted">
              04 / Results
            </div>
            <ul className="flex list-disc flex-col gap-2 pl-5 text-[16px] leading-relaxed text-text">
              {content.results.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <div className="mb-6 font-mono text-[11px] uppercase tracking-wider text-muted">
              05 / What I&apos;d change
            </div>
            <p className="text-[16px] leading-relaxed text-text">
              {content.change}
            </p>
          </section>
        </>
      ) : (
        <p className="text-[16px] leading-relaxed text-muted">
          Case study content for {project.name} — pending.
        </p>
      )}

      <div className="border-t border-border pt-8">
        <a
          href="/#work"
          className="font-mono text-[13px] text-text underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-accent hover:decoration-accent"
        >
          ← Return to all projects
        </a>
      </div>
    </div>
  );
}
