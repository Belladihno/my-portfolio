import type { FeaturedProject } from "../data/projects";

type Props = {
  project: FeaturedProject;
  index: string;
};

export default function ProjectRow({ project, index }: Props) {
  return (
    <article className="grid grid-cols-1 items-center gap-8 py-12 lg:grid-cols-12 lg:gap-6">
      <div className="flex flex-col gap-3 lg:col-span-6">
        <span className="font-mono text-[11px] text-muted">{index}</span>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-[22px] font-semibold leading-tight text-text transition-colors duration-150 hover:text-accent">
            <a href={`/work/${project.slug}`}>{project.name}</a>
          </h3>
          <div className="flex shrink-0 items-center gap-1.5 font-mono text-[11px] text-muted">
            {project.isLive ? (
              <>
                <span className="text-[8px] leading-none text-accent">●</span>
                <span>Live</span>
              </>
            ) : (
              <span>Repository</span>
            )}
          </div>
        </div>
        <p className="max-w-xl text-[16px] leading-relaxed text-text">
          {project.description}
        </p>
        <div className="pt-1 font-mono text-[11px] tracking-wider text-muted">
          {project.stack.join(" · ")}
        </div>
        <div className="flex items-center gap-6 pt-2 font-mono text-[13px]">
          <a
            href={`/work/${project.slug}`}
            className="text-text underline decoration-border underline-offset-4 transition-colors duration-150 hover:text-accent hover:decoration-accent"
          >
            View case study →
          </a>
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors duration-150 hover:text-text"
          >
            GitHub ↑↗
          </a>
        </div>
      </div>
      <div className="w-full lg:col-span-6">
        <img
          src={project.diagramPath}
          alt={`${project.name} architecture diagram`}
          className="h-auto w-full"
          loading="lazy"
        />
      </div>
    </article>
  );
}
