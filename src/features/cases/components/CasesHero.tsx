import { CTAButton } from "@/shared/components/CTAButton";

export function CasesHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-d3-purple/15 via-d3-purple/5 to-background py-24 md:py-32">
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-d3-purple/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-d3-purple/10 blur-3xl" />

      <div className="container relative mx-auto px-4 text-center">
        <span className="mb-6 inline-block rounded-full border border-d3-purple/30 bg-d3-purple/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-d3-purple-light">
          Cases de Sucesso
        </span>
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-d3-purple md:text-5xl lg:text-6xl">
          Conheça nossos cases de sucesso e inspire-se para melhorar seu ambiente profissional.
        </h1>

        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Mais do que uma simples empresa, somos o parceiro de negócios de empresas que buscam inovação e performance para estarem um passo à frente em seu mercado.
        </p>

        <div className="mt-8 flex justify-center">
          <CTAButton to="/contato" variant="primary">
            Solicite um orçamento
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
