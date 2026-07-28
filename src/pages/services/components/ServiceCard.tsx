import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { CTAButton } from "@/components/shared/CTAButton";
import { cn } from "@/lib/utils";
import { getIcon } from "@/utils/icons";
import type { ServiceBackend } from "@/services/services.service";

type ServiceCardProps = {
  service: ServiceBackend;
  index?: number;
};

function hasContent(html?: string) {
  return !!html && html.trim().length > 0 && html.trim() !== "<p></p>";
}

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const [open, setOpen] = useState(false);

  const number = String(index + 1).padStart(2, "0");

  const hasDetails =
    hasContent(service.descricaoDetalhada) ||
    hasContent(service.problemasQueResolve) ||
    hasContent(service.beneficios);

  const ctaTexto = service.ctaTexto?.trim() || "Fale conosco";
  const ctaLink = service.ctaLink?.trim() || "/contato";

  return (
    <Card
      className={cn(
        "group relative flex h-full flex-col gap-0 overflow-hidden rounded-2xl border-0 bg-card p-7 ring-1 ring-border/60 transition-all duration-300",
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
        {service.icone && getIcon(service.icone) ? (() => {
          const Ico = getIcon(service.icone)!;
          return <Ico className="h-8 w-8" />;
        })() : <Sparkles className="h-8 w-8" />}
      </div>

      {/* Title */}
      <h3 className="relative mb-2 text-lg font-semibold leading-snug text-foreground">
        {service.nome}
      </h3>

      {/* Short description */}
      <p className="relative mb-6 text-sm leading-relaxed text-muted-foreground">
        {service.descricaoCurta}
      </p>

      {/* Expandable details */}
      {hasDetails && (
        <div className="relative mb-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-d3-purple transition-colors hover:text-d3-purple-light"
          >
            {open ? "Ver menos" : "Ver detalhes"}
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </button>

          <div
            className={cn(
              "grid transition-all duration-300 ease-out",
              open
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              {hasContent(service.descricaoDetalhada) && (
                <div
                  className="prose prose-sm mt-4 max-w-none text-sm leading-relaxed text-muted-foreground prose-p:my-1 prose-li:my-0.5 prose-headings:text-foreground prose-headings:text-base prose-a:text-d3-purple"
                  dangerouslySetInnerHTML={{ __html: service.descricaoDetalhada }}
                />
              )}

              {(hasContent(service.problemasQueResolve) ||
                hasContent(service.beneficios)) && (
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {hasContent(service.problemasQueResolve) && (
                    <div className="rounded-lg bg-d3-purple/5 p-4">
                      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-d3-purple">
                        Problemas que resolve
                      </p>
                      <div
                        className="prose prose-sm max-w-none text-sm leading-relaxed text-muted-foreground prose-p:my-1 prose-li:my-0.5"
                        dangerouslySetInnerHTML={{
                          __html: service.problemasQueResolve,
                        }}
                      />
                    </div>
                  )}
                  {hasContent(service.beneficios) && (
                    <div className="rounded-lg bg-d3-purple/5 p-4">
                      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-d3-purple">
                        Benefícios
                      </p>
                      <div
                        className="prose prose-sm max-w-none text-sm leading-relaxed text-muted-foreground prose-p:my-1 prose-li:my-0.5"
                        dangerouslySetInnerHTML={{
                          __html: service.beneficios,
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <div className="relative mt-auto pt-2">
        <CTAButton to={ctaLink} variant="outline">
          {ctaTexto}
        </CTAButton>
      </div>
    </Card>
  );
}