import { SectionHeading } from "@/components/shared/SectionHeading";
import { ServiceCard } from "@/pages/services/components/ServiceCard";
import { HeroServices } from "@/pages/services/components/HeroServices";
import { getServices } from "@/services/services.service";
import type { ServiceBackend } from "@/services/services.service";
import { useState, useEffect } from "react";

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceBackend[]>([]);

  useEffect(() => {
    getServices().then(setServices).catch(() => {});
  }, []);


  return (
    <div>
      <HeroServices />

      <section id="servicos" className="container mx-auto scroll-mt-20 px-4 py-20 md:py-28">
        <SectionHeading
          align="center"
          eyebrow="O que fazemos"
          title="Nossos servicos"
          subtitle="Solucoes sob medida para cada desafio."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}