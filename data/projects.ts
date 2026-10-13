export type FeaturedProject = {
  slug: string;
  order: number; // display position, 1 = first
  name: string;
  description: string;
  stack: string[];
  isLive: boolean;
  liveUrl?: string;
  repoUrl: string;
  diagramPath: string;
  featured: true;
};

export type IndexProject = {
  name: string;
  description: string;
  stack: string[];
  repoUrl: string;
  featured: false;
};

export type Project = FeaturedProject | IndexProject;

export const projects: Project[] = [
  // Featured
  {
    slug: "campaign-engine",
    order: 2,
    name: "Campaign Engine",
    description:
      "Multi-tenant SMS delivery platform with queue-backed dispatch, segment-aware billing, and idempotent payment webhooks.",
    stack: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Paystack",
      "Africa's Talking",
    ],
    isLive: true,
    liveUrl: "https://campaign-engine-tau.vercel.app/",
    repoUrl: "https://github.com/Belladihno/campaign-engine",
    diagramPath: "/diagrams/campaign-engine.svg",
    featured: true,
  },
  {
    slug: "ideaforge",
    order: 3,
    name: "IdeaForge",
    description:
      "AI use case prioritization pipeline with weighted scoring, ranked leaderboard, and governed status transitions in Clean Architecture.",
    stack: ["ASP.NET Core", "C#", ".NET 8", "EF Core 9", "PostgreSQL", "MediatR"],
    isLive: true,
    liveUrl: "https://ideaforge-omega-inky.vercel.app/",
    repoUrl: "https://github.com/Belladihno/IdeaForge",
    diagramPath: "/diagrams/ideaforge.svg",
    featured: true,
  },
  {
    slug: "zeedle",
    order: 1,
    name: "Zeedle",
    description:
      "Peer-to-peer digital wallet for instant, zero-fee transfers with double-entry bookkeeping and idempotent payment webhooks.",
    stack: [
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "Paystack",
      "Next.js",
    ],
    isLive: true,
    liveUrl: "https://zeedle.vercel.app",
    repoUrl: "https://github.com/Belladihno/zeedle",
    diagramPath: "/diagrams/zeedle.svg",
    featured: true,
  },
  // Index
  {
    name: "Logistics Dispatch API",
    description:
      "Three-sided haulage marketplace connecting shippers, drivers, and fleet owners with load assignment and tracking.",
    stack: ["NestJS", "TypeScript", "PostgreSQL"],
    repoUrl: "https://github.com/Belladihno/logistics_dispatch",
    featured: false,
  },
  {
    name: "Event Ticketing API",
    description:
      "Production-grade ticketing platform with pessimistic seat locking, QR code delivery, and 106 tests.",
    stack: ["NestJS", "TypeScript", "PostgreSQL", "Redis"],
    repoUrl: "https://github.com/Belladihno/event-ticket-api",
    featured: false,
  },
  {
    name: "JobPilot",
    description:
      "Opportunity intelligence platform combining job listing discovery with automated business website scanning.",
    stack: ["NestJS", "TypeScript", "PostgreSQL"],
    repoUrl: "https://github.com/Belladihno/jobpilot",
    featured: false,
  },
  {
    name: "Account & Transaction API",
    description:
      "Nigerian NUBAN account simulation with Interswitch-style transaction processing in Clean Architecture.",
    stack: ["ASP.NET Core", "C#", "PostgreSQL"],
    repoUrl: "https://github.com/Belladihno/BankingApi",
    featured: false,
  },
];

export const featuredProjects: FeaturedProject[] = projects
  .filter((p): p is FeaturedProject => p.featured === true)
  .sort((a, b) => a.order - b.order);

export const indexProjects: IndexProject[] = projects.filter(
  (p): p is IndexProject => p.featured === false
);
