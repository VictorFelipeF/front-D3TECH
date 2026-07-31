import { SectionHeading } from "@/components/shared/SectionHeading";

export function HistorySection() {
  return (
    <section className="container mx-auto px-4 py-20 md:py-28">
      <SectionHeading
        align="center"
        eyebrow="Nossa trajetória"
        title="Nossa história e raízes acadêmicas"
      />
      {/* TODO: conteúdo institucional real pendente */}
      <div className="mx-auto max-w-3xl space-y-4 text-center text-base leading-relaxed text-muted-foreground">
        <p>
          Fundada por estudantes apaixonados por tecnologia, a D3TEC nasceu com o
          propósito de conectar o ambiente acadêmico ao mercado de trabalho. Ao
          longo dos anos, evoluímos e nos consolidamos como uma ponte entre o
          ensino de excelência da nossa universidade e as necessidades reais das
          empresas.
        </p>
        <p>
          Nossa trajetória é marcada por projetos desafiadores e pelo compromisso
          com a qualidade. Cada membro que passa pela nossa empresa leva consigo
          não apenas experiência prática, mas a vivência de criar soluções que
          impactam positivamente a sociedade.
        </p>
      </div>

      {/* Imagens */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <img
          src="/foto1History.jpeg"
          alt="D3TEC História 1"
          className="relative z-10 w-full rounded-lg object-cover"
        />
        <img
          src="/foto2History.jpeg"
          alt="D3TEC História 2"
          className="relative z-10 w-full rounded-lg object-cover"
        />
      </div>
    </section>
  );
}
