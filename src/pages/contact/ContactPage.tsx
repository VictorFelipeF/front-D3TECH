import { SectionHeading } from "@/components/shared/SectionHeading";
import { ContactForm } from "@/pages/contact/components/ContactForm";
import { Mail, Clock, Shield } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden container mx-auto px-4 py-20 md:py-28">
      <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
        {/* Coluna Esquerda */}
        <div className="flex flex-col justify-center">
          <SectionHeading
            eyebrow="Fale conosco"
            title="Vamos conversar?"
            subtitle="A D3TEC esta pronta para ajudar sua empresa a alcancar o proximo nivel com solucoes tecnologicas."
          />

          <div className="mt-6 space-y-4">
            {[
              { icon: Mail, title: "Resposta em ate 24 horas uteis" },
              { icon: Clock, title: "Orcamento sem compromisso" },
              { icon: Shield, title: "Seus dados estao seguros conosco" },
            ].map(({ icon: Icon, title }) => (
              <div key={title} className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none bg-d3-purple/10 text-d3-purple">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-sm text-gray-600">{title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna Direita - Formulario */}
        <div>
          <div className="bg-white border border-gray-100 rounded-none p-8 shadow-sm">
            <div className="mb-6 pb-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-d3-navy">Envie sua mensagem</h2>
              <p className="text-xs text-gray-400 mt-1">Campos com * sao obrigatorios.</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
