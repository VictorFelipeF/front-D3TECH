import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { login } from "@/stores/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao entrar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-d3-navy via-d3-purple to-d3-purple-dark flex items-center justify-center px-4 py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-1">
          Entrar
        </h1>
        <p className="text-sm text-white/70 text-center mb-8">
          Acesse o painel administrativo
        </p>

        <div className="mb-4">
          <Label htmlFor="email" className="text-white/90">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white pl-9"
              required
            />
          </div>
        </div>

        <div className="mb-2">
          <Label htmlFor="password" className="text-white/90">
            Senha
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white pl-9 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
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

        <div className="text-right mb-4">
          <Link to="/admin/esqueci-senha" className="text-xs text-white/90 hover:underline">
            Esqueci minha senha
          </Link>
        </div>

        {error && (
          <p className="text-sm text-red-200 mb-4">{error}</p>
        )}

        <Button
          type="submit"
          className="w-full bg-d3-purple hover:bg-d3-purple-dark"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>

        <div className="border-t border-white/20 mt-6 pt-6 text-center">
          <p className="text-xs text-white/70 mb-1">Não tem uma conta?</p>
          <Link to="/admin/solicitar-acesso" className="text-xs text-white font-medium hover:underline">
            Solicitar Acesso
          </Link>
        </div>
      </form>
    </div>
  );
}
