"use client";

import { useState, useCallback, useEffect } from "react";
import { Header } from "@/app/components/layout/Header";
import { Footer } from "@/app/components/layout/Footer";
import { Hero } from "@/app/components/sections/Hero";
import { FeelingsModal } from "@/app/components/FeelingsModal";
import { FeelingsSection } from "@/app/components/sections/FeelingsSection";
import { SoundSection } from "@/app/components/sections/SoundSection";
import { About } from "@/app/components/sections/About";
import { Benefits } from "@/app/components/sections/Benefits";
import { GuidedExperience } from "@/app/components/sections/GuidedExperience";
import { Testimonials } from "@/app/components/sections/Testimonials";
import { CallToAction } from "@/app/components/sections/CallToAction";
import type { FeelingId } from "@/app/lib/rituals";

export function HomeFlow() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFeeling, setSelectedFeeling] = useState<FeelingId | null>(null);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);
  const handleSelectFeeling = useCallback((id: FeelingId) => {
    setSelectedFeeling(id);
    setModalOpen(false);
    requestAnimationFrame(() => {
      document.getElementById("ritual-or-feelings")?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("begin") === "1") setModalOpen(true);
  }, []);

  return (
    <>
      <Header onBeginClick={openModal} />
      <main className="zen-bg">
        <Hero onBeginClick={openModal} />
        <FeelingsModal
          isOpen={modalOpen}
          onClose={closeModal}
          onSelect={handleSelectFeeling}
        />
        <SoundSection />
        <div id="ritual-or-feelings">
          <FeelingsSection
            selectedFeeling={selectedFeeling}
            onFeelingChange={setSelectedFeeling}
          />
        </div>
        <About />
        <Benefits />
        <GuidedExperience />
        <Testimonials />
        <CallToAction onBeginClick={openModal} />
      </main>
      <Footer />
    </>
  );
}
