import { getProjects } from "./lib/content";

const SITE_URL = "https://kanwalkumar.com";

export default function sitemap() {
  return [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...getProjects().map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
