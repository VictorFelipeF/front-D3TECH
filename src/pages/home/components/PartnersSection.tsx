import { useState, useEffect } from "react";
import { getPartners, type PartnerBackend } from "@/services/partners.service";
import { fileUrl } from "@/services/api";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Carousel } from "@/components/shared/Carousel";

export function PartnersSection() {
  const [partners, setPartners] = useState<PartnerBackend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPartners()
      .then((data) =>
        setPartners(data.filter((p) => p.ativo && p.autorizacaoExibicao))
      )
      .catch(() => setPartners([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && partners.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-20 md:py-24">
      <SectionHeading
        align="center"
        eyebrow="Parceiros"
        title="Empresas que confiam na D3TECH"
        subtitle="Mais do que clientes, parceiros que caminham conosco rumo à inovação."
      />
      {loading ? (
        <p className="text-center text-muted-foreground">Carregando...</p>
      ) : (
        <div className="mx-auto max-w-5xl">
          <Carousel
            items={partners}
            itemsPerView={{ base: 2, sm: 3, md: 4, lg: 5 }}
            renderItem={(p) => {
              const img = (
                <div className="flex h-28 w-full items-center justify-center rounded-2xl border border-border bg-background p-4 sm:h-32 md:h-40 md:p-6">
                  <img
                    src={fileUrl(p.logo)}
                    alt={p.nome}
                    loading="lazy"
                    className="max-h-20 w-auto rounded-xl object-contain sm:max-h-24 md:max-h-28"
                  />
                </div>
              );
              return p.link ? (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={p.nome}
                >
                  {img}
                </a>
              ) : (
                img
              );
            }}
          />
        </div>
      )}
    </section>
  );
}