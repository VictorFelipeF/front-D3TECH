import { SectionHeading } from "@/shared/components/SectionHeading";
import { ContactForm } from "../components/ContactForm";
import { Mail, Clock, Shield } from "lucide-react";

export default function ContactPage() {
  return (
    <section
      id="contato"
      className="relative scroll-mt-20 overflow-hidden container mx-auto px-4 py-20 md:py-28"
    >
      {/* Background decorativo sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-d3-purple/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-d3-navy/5 blur-3xl"
      />

      <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-24">
        {/* Coluna Esquerda */}
        <div className="flex flex-col justify-center">
          <SectionHeading
            eyebrow="Fale conosco"
            title="Vamos conversar?"
            subtitle="A D3TEC está pronta para ajudar a sua empresa a alcançar o próximo nível com soluções tecnológicas inovadoras e eficientes."
          />

          {/* TODO: conteúdo institucional real pendente */}
          <div className="mt-4 max-w-md space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Conte para a gente onde quer chegar — a D3TEC cuida do caminho
              tecnológico com você. Preencha o formulário ao lado com seus dados
              e detalhe como podemos ajudar.
            </p>
          </div>

          {/* Trust signals */}
          <div className="mt-12 overflow-hidden rounded-2xl border border-border/50 bg-muted/30">
            <ul className="divide-y divide-border/50">
              {[
                {
                  icon: Mail,
                  label: "Resposta em até 24 horas úteis",
                },
                {
                  icon: Clock,
                  label: "Orçamento sem compromisso",
                },
                {
                  icon: Shield,
                  label: "Seus dados estão seguros conosco",
                },
              ].map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 px-5 py-4 text-sm text-muted-foreground transition-colors hover:bg-muted/60"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-d3-purple/10 to-d3-purple/5 text-d3-purple ring-1 ring-d3-purple/20">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Coluna Direita */}
        <div className="relative">
          {/* Glow decorativo atrás do card */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-4 -z-10 rounded-3xl bg-d3-purple/10 blur-2xl"
          />
          <div className="rounded-3xl border border-border/50 bg-card p-6 shadow-xl shadow-d3-purple/5 ring-1 ring-d3-purple/10 sm:p-8">
            <div className="mb-6 border-b border-border/40 pb-5">
              <h2 className="text-sm font-semibold text-foreground">
                Envie sua mensagem
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Os campos marcados com * são obrigatórios.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
