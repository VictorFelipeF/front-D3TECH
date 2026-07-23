import { CTAButton } from "@/components/shared/CTAButton";

export function CasesCTA() {
  return (
    <section className="py-24 text-center md:py-32">
      <div className="container mx-auto px-4">
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
