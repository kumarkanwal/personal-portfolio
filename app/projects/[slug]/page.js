import { notFound } from "next/navigation";
import ProjectDetail from "../../components/ProjectDetail";
import { PROJECTS } from "../../data";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Kanwal Kumar`,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.name,
      description: project.tagline,
      url: `/projects/${project.slug}`,
      images: [`/images/projects/${project.slug}-card.jpg`],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = PROJECTS.find((item) => item.slug === slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
