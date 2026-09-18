import Hero from "./components/Hero";
import Metrics from "./components/Metrics";
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
      <Metrics />
      <Stack />
      <AskAI />
      <Projects />
      <Approach />
      <References />
      <Experience />
      <FAQ />
      <Contact />
    </>
  );
}
