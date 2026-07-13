import { SectionHeading } from "@/shared/components/SectionHeading";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading title="Política de Privacidade" />

        {/* TODO: conteúdo institucional real pendente */}
        <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
          <p>
            A D3TEC leva a sua privacidade a sério. Esta política descreve como
            coletamos, usamos e protegemos suas informações pessoais.
          </p>

          <div>
            <h3 className="mb-3 text-lg font-bold text-foreground">
              1. Coleta de Informações
            </h3>
            <p>
              Coletamos informações que você nos fornece diretamente, como quando
              preenche o formulário de contato.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-bold text-foreground">
              2. Uso das Informações
            </h3>
            <p>
              Utilizamos suas informações exclusivamente para responder às suas
              solicitações e melhorar nossos serviços.
            </p>
          </div>

          <p className="border-t border-border pt-8 text-sm text-muted-foreground/60">
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>
    </div>
  );
}
