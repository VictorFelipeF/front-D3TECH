import { useState, useEffect } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTAButton } from "@/components/shared/CTAButton";
import { ServiceCard } from "@/pages/services/components/ServiceCard";
import { getServices, type ServiceBackend } from "@/services/services.service";

export function ServicesSection() {
  const [services, setServices] = useState<ServiceBackend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then((data) => setServices(data.slice(0, 3)))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && services.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-20 md:py-28">
      <SectionHeading
        align="center"
        eyebrow="Serviços em destaque"
        title="Soluções que entregam resultado"
        subtitle="Uma amostra do que fazemos. Conheça o portfólio completo na página de serviços."
      />

      {loading ? (
        <p className="text-center text-muted-foreground">Carregando...</p>
      ) : (
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <CTAButton to="/servicos" variant="primary">
          Ver todos os serviços
        </CTAButton>
      </div>
    </section>
  );
}
