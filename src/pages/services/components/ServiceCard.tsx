import { Card } from "@/components/ui/card";
import { CTAButton } from "@/components/shared/CTAButton";
import { cn } from "@/lib/utils";
import { getIcon } from "@/utils/icons";
import * as Icons from "lucide-react";
import type { ServiceBackend } from "@/services/services.service";

type ServiceCardProps = {
  service: ServiceBackend;
  index?: number;
};

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const Icon = getIcon(service.icone);
  const number = String(index + 1).padStart(2, "0");

  return (
    <Card className={cn(
      "group relative h-full gap-0 overflow-hidden rounded-none border-0 bg-card p-7 ring-1 ring-border/60 transition-all duration-300",
      "hover:-translate-y-1 hover:shadow-xl hover:shadow-d3-purple/10 hover:ring-d3-purple/40"
    )}>
      <span aria-hidden className="pointer-events-none absolute right-5 top-2 select-none text-7xl font-bold leading-none text-d3-purple/[0.06] transition-colors duration-300 group-hover:text-d3-purple/10">
        {number}
      </span>

      <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-none bg-d3-purple/10 text-d3-purple transition-colors duration-300 group-hover:bg-d3-purple group-hover:text-white">
        {Icon ? <Icon className="h-8 w-8" /> : <Icons.Sparkles className="h-8 w-8" />}
      </div>

      <h3 className="relative mb-2 text-lg font-semibold leading-snug text-foreground">
        {service.nome}
      </h3>

      <p className="relative mb-6 text-sm leading-relaxed text-muted-foreground">
        {service.descricaoCurta}
      </p>

      <div className="relative mt-auto pt-2">
        <CTAButton to={service.ctaLink || "/contato"} variant="outline">
          {service.ctaTexto || "Fale conosco"}
        </CTAButton>
      </div>
    </Card>
  );
}
