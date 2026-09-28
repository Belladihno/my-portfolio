const ROWS: { label: string; primary: string[]; secondary: string[] }[] = [
  {
    label: "Languages",
    primary: ["TypeScript", "C#"],
    secondary: ["JavaScript"],
  },
  {
    label: "Frameworks",
    primary: ["NestJS", "ASP.NET Core"],
    secondary: ["Express"],
  },
  {
    label: "Data",
    primary: ["PostgreSQL", "Redis"],
    secondary: ["TypeORM", "EF Core", "Prisma"],
  },
  {
    label: "Infrastructure",
    primary: ["Docker", "BullMQ"],
    secondary: ["Vercel", "Render", "Neon", "Supabase"],
  },
  {
    label: "Frontend",
    primary: ["React", "Next.js"],
    secondary: ["Tailwind CSS", "Vite"],
  },
  {
    label: "Testing",
    primary: ["Vitest", "xUnit"],
    secondary: ["NSubstitute", "FluentAssertions"],
  },
];

export default function Stack() {
  return (
    <section id="stack" className="flex w-full flex-col gap-4">
      <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
        03 — Stack
      </div>
      <div className="flex w-full flex-col divide-y divide-border border-y border-border">
        {ROWS.map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:gap-6"
          >
            <div className="shrink-0 font-mono text-[12px] uppercase tracking-wider text-muted sm:w-[180px]">
              {row.label}
            </div>
            <div className="flex flex-wrap items-center gap-x-2 text-[16px]">
              {row.primary.map((t) => (
                <span key={t} className="font-medium text-text">
                  {t}
                </span>
              ))}
              {row.secondary.map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <span className="text-muted">·</span>
                  <span className="text-muted">{t}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
