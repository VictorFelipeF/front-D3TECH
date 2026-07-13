import { SectionHeading } from "@/shared/components/SectionHeading";
import { ContactForm } from "../components/ContactForm";
import { Mail, Clock, Shield } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20 md:py-28">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-24">
        {/* Coluna Esquerda */}
        <div className="flex flex-col justify-center">
          <SectionHeading
            eyebrow="Fale conosco"
            title="Vamos conversar?"
            subtitle="A D3TEC está pronta para ajudar a sua empresa a alcançar o próximo nível com soluções tecnológicas inovadoras e eficientes."
          />
          {/* TODO: conteúdo institucional real pendente */}
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              Preencha o formulário ao lado com seus dados e detalhe como podemos
              ajudar. Nossa equipe analisará sua solicitação e entrará em contato o
              mais breve possível.
            </p>
          </div>

          {/* Trust signals */}
          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-d3-purple/10 text-d3-purple">
                <Mail className="h-4 w-4" />
              </div>
              <span>Resposta em até 24 horas úteis</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-d3-purple/10 text-d3-purple">
                <Clock className="h-4 w-4" />
              </div>
              <span>Orçamento sem compromisso</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-d3-purple/10 text-d3-purple">
                <Shield className="h-4 w-4" />
              </div>
              <span>Seus dados estão seguros conosco</span>
            </div>
          </div>
        </div>

        {/* Coluna Direita */}
        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm sm:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
