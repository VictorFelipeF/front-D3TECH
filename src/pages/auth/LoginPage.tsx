import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useLogin";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { fetchUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const loginMutation = useLogin();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await loginMutation.mutateAsync({ email, password });
      if (res.mfaRequired) {
        navigate("/admin/mfa", { state: { mfaToken: res.mfaToken } });
        return;
      }
      if (res.emailVerificationRequired) {
        setError("Verifique seu email antes de fazer login");
        return;
      }
      await fetchUser();
      navigate("/admin/home");
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Erro ao entrar");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-white flex">
      {/* Left - Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-d3-purple via-d3-purple-dark to-d3-navy relative overflow-hidden items-center justify-center">
        {/* Decorative geometric elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-none rotate-45 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-none -rotate-12 -translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-20 left-10 w-24 h-24 border-2 border-white/10 rounded-none" />
        <div className="absolute bottom-20 right-20 w-16 h-16 border-2 border-white/10 rounded-none rotate-45" />

        <div className="relative z-10 text-center px-12">
          <img
            src="/logoPainelAdmin.svg"
            alt="D3TECH"
            className="h-auto w-72 mx-auto mb-8"
          />
          <h2 className="text-2xl font-bold text-white mb-3">
            Painel Administrativo
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-sm mx-auto">
            Gerencie o conteúdo do site, publicações do blog, cases de sucesso e muito mais.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 text-left">
            <div className="bg-white/10 rounded-none p-4 border border-white/10 backdrop-blur-sm">
              <div className="w-2 h-2 bg-white rounded-none mb-2" />
              <p className="text-white text-sm font-medium">Gestão de Conteúdo</p>
              <p className="text-white/50 text-xs mt-1">Posts, cases e serviços</p>
            </div>
            <div className="bg-white/10 rounded-none p-4 border border-white/10 backdrop-blur-sm">
              <div className="w-2 h-2 bg-white rounded-none mb-2" />
              <p className="text-white text-sm font-medium">Análises</p>
              <p className="text-white/50 text-xs mt-1">Dashboard e métricas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative bg-white">
        {/* Mobile logo */}
        <div className="absolute top-8 left-8 lg:hidden">
          <img src="/logoPainelAdmin.svg" alt="D3TECH" className="h-8" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-16 right-16 w-32 h-px bg-d3-purple/20 hidden lg:block" />
        <div className="absolute top-20 right-16 w-20 h-px bg-d3-purple/10 hidden lg:block" />
        <div className="absolute bottom-16 left-16 w-20 h-20 border-2 border-d3-purple/10 rounded-none -rotate-12 hidden lg:block" />

        <div className="w-full max-w-sm">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-d3-navy mb-2">Entrar</h1>
            <p className="text-gray-400 text-sm">
              Acesse o painel administrativo da D3TECH
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2 block">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="bg-gray-50 border-gray-200 text-d3-navy placeholder:text-gray-300 pl-11 h-12 rounded-none focus:border-d3-purple focus:ring-1 focus:ring-d3-purple"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="password" className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
                  Senha
                </Label>
                <Link to="/admin/esqueci-senha" className="text-xs text-d3-purple/60 hover:text-d3-purple transition-colors">
                  Esqueci a senha?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border-gray-200 text-d3-navy placeholder:text-gray-300 pl-11 pr-10 h-12 rounded-none focus:border-d3-purple focus:ring-1 focus:ring-d3-purple"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-d3-purple transition-colors"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-none px-4 py-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-d3-purple hover:bg-d3-purple-dark text-white h-12 rounded-none font-semibold text-sm uppercase tracking-wider transition-all disabled:opacity-50 group"
            >
              {loginMutation.isPending ? (
                "Entrando..."
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Entrar
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              Não tem uma conta?{" "}
              <Link to="/admin/solicitar-acesso" className="text-d3-purple font-medium hover:underline transition-colors">
                Solicitar acesso
              </Link>
            </p>
          </div>

          {/* Bottom dots */}
          <div className="mt-10 flex justify-center gap-3">
            <span className="w-1.5 h-1.5 bg-d3-purple rounded-none" />
            <span className="w-1.5 h-1.5 bg-d3-purple/40 rounded-none" />
            <span className="w-1.5 h-1.5 bg-d3-purple/20 rounded-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
