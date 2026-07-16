import { Card } from "@/components/ui/card";
import { CTAButton } from "@/shared/components/CTAButton";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";

export type ServiceType = {
  id: string;
  name: string;
  shortDescription: string;
  icon: string;
  category?: string;
  longDescription?: string;
  deliverables?: string[];
};

type ServiceCardProps = {
  service: ServiceType;
  index?: number;
};

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (Icons as any)[service.icon];
  const Icon = IconComponent ?? Icons.Sparkles;
  const number = String(index + 1).padStart(2, "0");

  return (
    <Card
      className={cn(
        "group relative h-full gap-0 overflow-hidden rounded-2xl border-0 bg-card p-7 ring-1 ring-border/60 transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl hover:shadow-d3-purple/10 hover:ring-d3-purple/40"
      )}
    >
      {/* Watermark number */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-5 top-2 select-none text-7xl font-bold leading-none text-d3-purple/[0.06] transition-colors duration-300 group-hover:text-d3-purple/10"
      >
        {number}
      </span>

      {/* Icon container */}
      <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-d3-purple/10 text-d3-purple transition-colors duration-300 group-hover:bg-d3-purple group-hover:text-white">
        <Icon className="h-8 w-8" />
      </div>

      {/* Title */}
      <h3 className="relative mb-2 text-lg font-semibold leading-snug text-foreground">
        {service.name}
      </h3>

      {/* Description */}
      <p className="relative mb-6 text-sm leading-relaxed text-muted-foreground">
        {service.shortDescription}
      </p>

      {/* Footer CTA */}
      <div className="relative mt-auto pt-2">
        <CTAButton to="/contato" variant="outline">
          Solicitar orçamento
        </CTAButton>
      </div>
    </Card>
  );
}
