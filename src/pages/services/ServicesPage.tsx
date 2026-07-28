import { SectionHeading } from "@/components/shared/SectionHeading";
import { ServiceCard } from "@/pages/services/components/ServiceCard";
import { HeroServices } from "@/pages/services/components/HeroServices";
import { useServices } from "@/hooks/useServices";

export default function ServicesPage() {
  const { data: services, isLoading } = useServices();
  const list = services ?? [];

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

        {isLoading ? (
          <p className="mt-16 text-center text-sm text-muted-foreground">
            Carregando serviços...
          </p>
        ) : list.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted-foreground">
            Nenhum serviço cadastrado no momento.
          </p>
        ) : (
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}