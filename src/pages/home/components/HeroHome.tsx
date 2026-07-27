import { Link } from "react-router-dom";
import { CTAButton } from "@/components/shared/CTAButton";

export function HeroHome() {
  return (
    <section className="relative overflow-hidden bg-d3-navy text-white">
      {/* Gradient pattern background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-d3-purple/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-d3-purple/10 blur-3xl" />
      {/* Subtle bottom gradient to ease transition */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-d3-navy-dark/40" />

      <div className="container relative mx-auto grid grid-cols-1 items-center gap-12 px-4 py-28 text-left md:grid-cols-2 md:py-36">
        <div className="flex flex-col items-start">

          <h1 className="mb-6 max-w-xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Transformamos desafios reais em soluções digitais que geram resultado.
          </h1>

          <p className="mb-10 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            Somos a D3TECH — uma equipe que une engenharia, design e visão
            acadêmica para desenvolver sistemas, sites e automações sob medida
            que fazem o seu negócio crescer com confiança.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <CTAButton to="/contato" variant="primary">
              Fale conosco
            </CTAButton>
            <Link
              to="/servicos"
              className="inline-flex h-10 items-center justify-center rounded-lg border-2 border-white/25 bg-transparent px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:border-white/60 hover:bg-white/5"
            >
              Conhecer serviços
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="pointer-events-none absolute inset-0 scale-110 rounded-full bg-d3-purple/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-d3-purple-light/25 blur-2xl" />
          <img
            src="/logod3Hero.png"
            alt="D3TECH"
            loading="eager"
            decoding="async"
            className="relative z-10 w-full select-none drop-shadow-2xl pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}