import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "../../../components/CaseStudy";
import { featuredProjects } from "../../../data/projects";

export function generateStaticParams() {
  return featuredProjects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = featuredProjects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Case Study — Bellanzo" };
  return {
    title: `${project.name} — Bellanzo`,
    description: project.description,
    openGraph: {
      title: `${project.name} — Bellanzo`,
      description: project.description,
      images: ["/og-image.png"],
    },
  };
}

export default function WorkPage({ params }: { params: { slug: string } }) {
  const project = featuredProjects.find((p) => p.slug === params.slug);
  if (!project) notFound();
  return <CaseStudy project={project} />;
}
