import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { Hero } from "@/app/components/sections/Hero";
import { About } from "@/app/components/sections/About";
import { Benefits } from "@/app/components/sections/Benefits";
import { GuidedExperience } from "@/app/components/sections/GuidedExperience";
import { Testimonials } from "@/app/components/sections/Testimonials";
import { CallToAction } from "@/app/components/sections/CallToAction";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Benefits />
        <GuidedExperience />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
