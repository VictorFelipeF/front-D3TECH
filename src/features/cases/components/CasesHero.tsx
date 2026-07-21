export function CasesHero() {
  return (
    <section className="relative overflow-hidden bg-d3-navy py-24 text-white md:py-36">
      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-d3-purple/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-d3-purple/10 blur-3xl" />

      <div className="container relative mx-auto px-4 text-center">
        <span className="mb-6 inline-block rounded-full border border-d3-purple/30 bg-d3-purple/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-d3-purple-light">
          Cases de Sucesso
        </span>
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Projetos reais que geraram resultados reais.
        </h1>
        {/* TODO: conteúdo institucional real pendente */}
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
          {/* TODO: conteúdo institucional real pendente */}
        </p>
      </div>
    </section>
  );
}
