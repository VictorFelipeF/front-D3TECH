import equipeImg from "@/assets/EquipeD3techPorto.webp";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CTAButton } from "@/components/shared/CTAButton";

export function AboutSection() {
  return (
    <section className="container mx-auto px-4 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* Left column — Image */}
        <div className="relative">
          <img
            src={equipeImg}
            alt="Equipe D3TECH"
            loading="lazy"
            className="aspect-video w-full rounded-2xl object-cover object-top shadow-xl ring-1 ring-border"
          />
        </div>

        {/* Right column — Text */}
        <div className="flex flex-col items-start">
          <SectionHeading
            align="left"
            eyebrow="Quem somos"
            title="Computação, design e visão acadêmica a serviço do seu negócio"
          />

          <p className="mb-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            A D3TEC nasceu da universidade com um propósito: transformar
            conhecimento técnico em soluções digitais que geram resultado
            real. Hoje somos uma equipe multidisciplinar que une engenharia de
            software, design e automação.
          </p>
          <p className="mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Desenvolvemos sistemas web, sites, dashboards e automações sob
            medida para pequenas e médias empresas — com a profundidade
            acadêmica e a praticidade do mercado.
          </p>

          <CTAButton to="/sobre-nos" variant="primary">
            Conhecer a D3TEC
          </CTAButton>
        </div>
      </div>
    </section>
  );
}