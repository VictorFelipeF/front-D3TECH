import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTAButton } from "@/components/shared/CTAButton";
import {
  ServiceCard,
  type ServiceType,
} from "@/pages/services/components/ServiceCard";
import servicesData from "@/mocks/services.json";

const featuredNames = [
  "Desenvolvimento de sistemas web",
  "Desenvolvimento de landing pages",
  "Dashboards e Business Intelligence",
];

const featured = (servicesData as ServiceType[])
  .filter((s) => featuredNames.includes(s.name))
  .sort(
    (a, b) =>
      featuredNames.indexOf(a.name) - featuredNames.indexOf(b.name),
  );

export function ServicesSection() {
  return (
    <section className="container mx-auto px-4 py-20 md:py-28">
      <SectionHeading
        align="center"
        eyebrow="Serviços em destaque"
        title="Soluções que entregam resultado"
        subtitle="Uma amostra do que fazemos. Conheça o portfólio completo na página de serviços."
      />

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <CTAButton to="/servicos" variant="outline">
          Ver todos os serviços
        </CTAButton>
      </div>
    </section>
  );
}