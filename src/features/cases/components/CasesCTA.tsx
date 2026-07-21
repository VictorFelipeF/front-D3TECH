import { CTAButton } from "@/shared/components/CTAButton";

export function CasesCTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-d3-purple/5 to-d3-purple/10 py-24 text-center md:py-32">
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-d3-purple/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-d3-purple/10 blur-3xl" />

      <div className="container relative mx-auto px-4">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-d3-purple md:text-4xl lg:text-5xl">
          O próximo case de sucesso pode ser o seu.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Vamos transformar seu desafio em uma solução que gera resultados reais para o seu negócio.
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
