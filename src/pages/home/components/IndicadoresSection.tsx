import { useState, useEffect } from "react";
import {getIndicadores, type IndicadorBackend} from "@/services/indicadores.service";

export function IndicadoresSection() {

const [indicadores, setIndicadores] = useState<IndicadorBackend[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  getIndicadores()
  .then((data)=> setIndicadores(data))
  .catch(() => setIndicadores([]))
  .finally(() => setLoading(false));
}, []);

  return (
    <section className="relative overflow-hidden bg-d3-navy text-white">
      {/* Decorative orb */}
      <div className="pointer-events-none absolute -right--30 -top-20 h-50 w-72 rounded-full bg-d3-purple/15 blur-3xl" />

      <div className="container relative mx-auto px-4 py-12 md:py-8">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-3 md:gap-x-12">
          {loading && <p className="text-white/60">Carregando...</p>}
          {indicadores.map(({ valor, nome}) => {
            return(
            <div key={nome} className="group text-center">
              <div className="bg-gradient-to-r from-white to-d3-purple-light bg-clip-text text-4xl font-bold text-transparent transition-transform duration-300 group-hover:scale-105 md:text-5xl">
                + {valor}
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-white">
                {nome}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}