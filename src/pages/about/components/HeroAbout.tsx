import equipeImg from "@/assets/EquipeD3techPorto.webp";
import { Button } from "@/components/ui/button";

export function HeroAbout() {
  const scrollToDiferenciais = () => {
    document
      .getElementById("diferenciais")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-d3-navy text-white">
      {/* Background image — in flow so the section grows with it */}
      <img
        src={equipeImg}
        alt=""
        className="block h-[70vh] w-full object-cover object-top"
        loading="eager"
      />
      {/* Overlay to keep text legible */}
      <div className="absolute inset-0 bg-d3-navy/70" />
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-d3-purple/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-d3-purple/10 blur-3xl" />

      <div className="container absolute inset-0 mx-auto flex flex-col items-center justify-center px-4 text-center">
        <span className="mb-6 inline-block rounded-full border border-d3-purple/30 bg-d3-purple/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-d3-purple-light">
          Sobre nós
        </span>
        <h1 className="mb-8 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Transformando conhecimento acadêmico em soluções tecnológicas reais.
        </h1>
        <Button
          size="lg"
          onClick={scrollToDiferenciais}
          className="h-12 gap-2 px-8 text-base bg-d3-purple text-white shadow-md shadow-d3-purple/25 hover:bg-d3-purple-light hover:shadow-lg hover:shadow-d3-purple/30 hover:-translate-y-px active:translate-y-0"
        >
          Conheça nossos diferenciais
        </Button>
      </div>
    </section>
  );
}
