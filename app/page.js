import Hero from "./components/Hero";
import About from "./components/About";
import Stack from "./components/Stack";
import AskAI from "./components/AskAI";
import Projects from "./components/Projects";
import Approach from "./components/Approach";
import References from "./components/References";
import Experience from "./components/Experience";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import { getProjects, getTestimonials } from "./lib/content";

export default function HomePage() {
  const projects = getProjects();
  const testimonials = getTestimonials();

  return (
    <>
      <Hero />
      <About projects={projects} />
      <Stack />
      <Experience />
      <Projects projects={projects} />
      <AskAI />
      <Approach />
      <References testimonials={testimonials} />
      <FAQ />
      <Contact />
    </>
  );
}
