import { CTAButton } from "@/shared/components/CTAButton";

export function HeroServices() {
  const scrollToServices = () => {
    document
      .getElementById("servicos")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-d3-navy text-white">
      {/* Gradient pattern background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-d3-purple/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-d3-purple/15 blur-3xl" />
      {/* Subtle bottom gradient to ease transition */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-d3-navy-dark/40" />

      <div className="container relative mx-auto flex flex-col items-center px-4 py-28 text-center md:py-36">
        <span className="mb-6 inline-block rounded-full border border-d3-purple/30 bg-d3-purple/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-d3-purple-light">
          Serviços
        </span>

        <h1 className="mb-6 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Tecnologia sob medida para o seu negócio crescer com confiança.
        </h1>

        <p className="mb-10 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          Do primeiro protótipo ao sistema em produção: combinamos engenharia,
          design e visão acadêmica para transformar desafios reais em soluções
          digitais que geram resultado.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <CTAButton to="/contato" variant="primary">
            Fale com a gente
          </CTAButton>
          <button
            type="button"
            onClick={scrollToServices}
            className="inline-flex h-10 items-center justify-center rounded-lg border-2 border-white/25 bg-transparent px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:border-white/60 hover:bg-white/5"
          >
            Ver serviços
          </button>
        </div>
      </div>
    </section>
  );
}
