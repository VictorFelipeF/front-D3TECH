const indicadores = [
  { valor: "+20", nome: "projetos entregues" },
  { valor: "5", nome: "anos de experiência" },
  { valor: "10+", nome: "clientes atendidos" },
  { valor: "100%", nome: "foco em resultado" },
];

export function IndicadoresSection() {
  return (
    <section className="bg-d3-navy-dark text-white">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {indicadores.map((i) => (
            <div key={i.nome} className="text-center md:text-left">
              <div className="text-4xl font-bold text-d3-purple-light md:text-5xl">
                {i.valor}
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-white/60">
                {i.nome}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}