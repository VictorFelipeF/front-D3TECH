import { Award, Calendar, Users } from "lucide-react";

const indicadores = [
  { valor: "+20", nome: "projetos entregues", icon: Award },
  { valor: "5", nome: "anos de experiência", icon: Calendar },
  { valor: "10+", nome: "clientes atendidos", icon: Users },
];

export function IndicadoresSection() {
  return (
    <section
      className="relative overflow-hidden bg-d3-navy-dark text-white"
      style={{
        backgroundImage:
          "radial-gradient(50% 60% at 80% 30%, rgba(22, 18, 29, 0.12) 0%, transparent 60%), radial-gradient(40% 50% at 20% 80%, rgba(155,92,246,0.08) 0%, transparent 60%)",
      }}
    >
      {/* Decorative orb */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-d3-purple/15 blur-3xl" />
      {/* Subtle vertical grid lines */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, transparent 1px)",
          backgroundSize: "25% 100%",
        }}
      />

      <div className="container relative mx-auto px-4 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-3 md:gap-x-12">
          {indicadores.map(({ valor, nome, icon: Icon }) => (
            <div key={nome} className="group text-center">
              <Icon className="mx-auto mb-3 h-5 w-5 text-d3-purple-light/40 transition-colors duration-300 group-hover:text-d3-purple-light" />
              <div className="bg-gradient-to-r from-white to-d3-purple-light bg-clip-text text-4xl font-bold text-transparent transition-transform duration-300 group-hover:scale-105 md:text-5xl">
                {valor}
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-white">
                {nome}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}