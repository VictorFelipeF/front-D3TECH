import { SectionHeading } from "@/components/shared/SectionHeading";
import { ServiceCard, type ServiceType } from "@/pages/services/components/ServiceCard";
import { HeroServices } from "@/pages/services/components/HeroServices";
import servicesData from "@/mocks/services.json";

export default function ServicesPage() {
  const services = servicesData as ServiceType[];

  return (
    <div>
      <HeroServices />

      <section
        id="servicos"
        className="container mx-auto scroll-mt-20 px-4 py-20 md:py-28"
      >
        <SectionHeading
          align="center"
          eyebrow="O que fazemos"
          title="Nossos serviços"
          subtitle="Soluções sob medida para cada desafio. Nossa equipe de especialistas transforma problemas reais em resultados digitais eficientes."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
