import { Link } from "react-router-dom";
import { Link2, MessageCircle, Mail, Phone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-d3-navy-dark text-white">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-10 py-16 md:grid-cols-2 lg:grid-cols-3">
          {/* Coluna 1: Marca */}
          <div className="space-y-5">
            <img src="/logoFooter.svg" alt="D3TECH" className="h-8" />
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              {/* TODO: conteúdo institucional real pendente */}
              Transformando conhecimento acadêmico em soluções tecnológicas reais.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn da D3TEC"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white/70 transition-all duration-200 hover:bg-d3-purple/20 hover:text-d3-purple-light"
              >
                <Link2 className="h-5 w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da D3TEC"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white/70 transition-all duration-200 hover:bg-d3-purple/20 hover:text-d3-purple-light"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">
              Links
            </h3>
            <div className="flex flex-col space-y-3">
              <Link
                to="/sobre-nos"
                className="text-sm text-white/60 transition-colors duration-150 hover:text-d3-purple-light"
              >
                Sobre nós
              </Link>
              <Link
                to="/servicos"
                className="text-sm text-white/60 transition-colors duration-150 hover:text-d3-purple-light"
              >
                Serviços
              </Link>
              <Link
                to="/contato"
                className="text-sm text-white/60 transition-colors duration-150 hover:text-d3-purple-light"
              >
                Contato
              </Link>
              <Link
                to="/politica-de-privacidade"
                className="text-sm text-white/60 transition-colors duration-150 hover:text-d3-purple-light"
              >
                Política de Privacidade
              </Link>
            </div>
          </div>

          {/* Coluna 3: Contato */}
          <div className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">
              Contato
            </h3>
            <div className="flex flex-col space-y-3">
              {/* TODO: confirmar e-mail oficial — RN02 */}
              <a
                href="mailto:contato@d3tech.com.br"
                className="inline-flex items-center gap-3 text-sm text-white/60 transition-colors duration-150 hover:text-d3-purple-light"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span>contato@d3tech.com.br</span>
              </a>
              {/* TODO: confirmar telefone oficial — RN02 */}
              <a
                href="tel:+5500000000000"
                className="inline-flex items-center gap-3 text-sm text-white/60 transition-colors duration-150 hover:text-d3-purple-light"
              >
                <Phone className="h-4 w-4 shrink-0" />
                <span>+55 (00) 00000-0000</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 text-center text-xs text-white/40">
          <p>&copy; {currentYear} D3TECH. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
