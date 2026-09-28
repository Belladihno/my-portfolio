import ProjectRow from "./ProjectRow";
import { featuredProjects } from "../data/projects";

export default function SelectedWork() {
  return (
    <section id="work" className="flex w-full flex-col gap-4">
      <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
        02 — Selected Work
      </div>
      <div className="flex flex-col divide-y divide-border">
        {featuredProjects.map((p, i) => (
          <ProjectRow
            key={p.slug}
            project={p}
            index={String(i + 1).padStart(2, "0")}
          />
        ))}
      </div>
    </section>
  );
}
