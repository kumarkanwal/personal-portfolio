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

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Stack />
      <Experience />
      <Projects />
      <AskAI />
      <Approach />
      <References />
      <FAQ />
      <Contact />
    </>
  );
}
