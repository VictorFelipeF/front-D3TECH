import { BaseCard } from "@/shared/components/BaseCard";
import { CTAButton } from "@/shared/components/CTAButton";
import * as Icons from "lucide-react";

export type ServiceType = {
  id: string;
  name: string;
  shortDescription: string;
  icon: string;
};

type ServiceCardProps = {
  service: ServiceType;
};

export function ServiceCard({ service }: ServiceCardProps) {
  // Dinamicamente pega o ícone do lucide-react baseado no nome
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (Icons as any)[service.icon];

  return (
    <BaseCard
      icon={IconComponent ? <IconComponent className="h-8 w-8" /> : null}
      title={service.name}
      description={service.shortDescription}
      className="h-full"
      footer={
        <CTAButton to="/contato" variant="outline">
          Solicitar orçamento
        </CTAButton>
      }
    />
  );
}
