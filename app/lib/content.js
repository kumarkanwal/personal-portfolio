import "server-only";

import fs from "node:fs";
import path from "node:path";
import { CATS } from "../data";

const root = process.cwd();
const projectsRoot = path.join(root, "public", "projects");
const testimonialsPath = path.join(root, "public", "data", "testimonials.json");
const requiredProjectFields = ["name", "cat", "tagline", "result", "stack", "date"];

function displayPath(filePath) {
  return path.relative(root, filePath).split(path.sep).join("/");
}

function contentError(filePath, message) {
  throw new Error(`${displayPath(filePath)}: ${message}`);
}

function readJson(filePath) {
  if (!fs.existsSync(filePath)) contentError(filePath, "file not found");
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    contentError(filePath, `invalid JSON (${error.message})`);
  }
}

function missing(value) {
  return value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0);
}

function loadProject(folderName) {
  const folderPath = path.join(projectsRoot, folderName);
  const jsonPath = path.join(folderPath, "project.json");
  const project = readJson(jsonPath);

  for (const field of requiredProjectFields) {
    if (missing(project[field])) contentError(jsonPath, `missing field '${field}'`);
  }
  if (!CATS.includes(project.cat)) {
    contentError(jsonPath, `field 'cat' must be one of: ${CATS.join(", ")}`);
  }
  if (!Array.isArray(project.stack)) {
    contentError(jsonPath, "field 'stack' must be an array");
  }
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(project.date)) {
    contentError(jsonPath, "field 'date' must use YYYY-MM format");
  }
  if (project.slug && project.slug !== folderName) {
    contentError(jsonPath, `field 'slug' must match folder name '${folderName}'`);
  }

  const coverPath = path.join(folderPath, "cover.jpg");
  if (!fs.existsSync(coverPath)) contentError(coverPath, "required cover image not found");

  const publicBase = `/projects/${folderName}`;
  const shots = ["shot-1.jpg", "shot-2.jpg"]
    .filter((name) => fs.existsSync(path.join(folderPath, name)))
    .map((name) => `${publicBase}/${name}`);
  const videoPath = path.join(folderPath, "demo.mp4");

  return {
    ...project,
    slug: folderName,
    featured: Boolean(project.featured),
    live: Boolean(project.live),
    ask: Boolean(project.ask),
    url: project.url || "",
    meta: Array.isArray(project.meta) ? project.meta : [],
    built: Array.isArray(project.built) ? project.built : [],
    nodes: Array.isArray(project.nodes) ? project.nodes : [],
    links: Array.isArray(project.links) ? project.links : [],
    media: {
      cover: `${publicBase}/cover.jpg`,
      shots,
      video: fs.existsSync(videoPath) ? `${publicBase}/demo.mp4` : null,
    },
  };
}

export function getProjects() {
  if (!fs.existsSync(projectsRoot)) contentError(projectsRoot, "projects folder not found");
  return fs.readdirSync(projectsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name !== "_template")
    .map((entry) => loadProject(entry.name))
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.date.localeCompare(a.date));
}

export function getProject(slug) {
  return getProjects().find((project) => project.slug === slug);
}

export function getTestimonials() {
  const testimonials = readJson(testimonialsPath);
  if (!Array.isArray(testimonials)) contentError(testimonialsPath, "expected an array");
  testimonials.forEach((testimonial, index) => {
    for (const field of ["q", "n", "r"]) {
      if (missing(testimonial[field])) contentError(testimonialsPath, `item ${index + 1}: missing field '${field}'`);
    }
  });
  return testimonials;
}
