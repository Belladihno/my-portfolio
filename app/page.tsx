import Hero from "../components/Hero";
import SelectedWork from "../components/SelectedWork";
import Stack from "../components/Stack";
import OtherWork from "../components/OtherWork";
import About from "../components/About";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-site flex-col gap-24 px-5 py-10 md:py-16">
      <Hero />
      <SelectedWork />
      <Stack />
      <OtherWork />
      <About />
      <Contact />
    </div>
  );
}
