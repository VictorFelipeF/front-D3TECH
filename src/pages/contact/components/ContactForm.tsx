import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSendContact } from "@/hooks/useContact";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { toast } from "sonner";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const sendContact = useSendContact();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    const formData = new FormData(e.currentTarget);

    if (formData.get("website")) return;

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const phone = formData.get("phone") as string;
    const company = formData.get("company") as string;
    const location = formData.get("location") as string;

    if (!name || !email || !subject || !message) {
      setErrorMessage("Preencha todos os campos obrigatorios.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Insira um e-mail valido.");
      return;
    }

    setStatus("submitting");
    try {
      await sendContact.mutateAsync({ nome: name, email, telefone: phone, empresa: company, endereco: location, assunto: subject, mensagem: message });
      setStatus("success");
      toast.success("Mensagem enviada com sucesso!");
    } catch {
      setStatus("error");
      setErrorMessage("Erro ao enviar. Tente novamente.");
      toast.error("Erro ao enviar mensagem.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center rounded-none border border-d3-purple/20 bg-d3-purple/5 p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-d3-purple mb-3" />
        <h3 className="text-lg font-bold text-d3-navy mb-1">Mensagem enviada!</h3>
        <p className="text-sm text-gray-500">Obrigado pelo contato. Retornaremos em breve.</p>
        <Button onClick={() => setStatus("idle")} className="mt-5 bg-d3-purple hover:bg-d3-purple-dark text-white rounded-none">
          Nova mensagem
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {errorMessage && (
        <div className="flex items-center gap-2 rounded-none border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {errorMessage}
        </div>
      )}

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Nome *</Label>
          <Input id="name" name="name" placeholder="Seu nome" required disabled={status === "submitting"} className="mt-1.5 h-11 rounded-none border-gray-200 focus:border-d3-purple focus:ring-1 focus:ring-d3-purple" />
        </div>
        <div>
          <Label htmlFor="email" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">E-mail *</Label>
          <Input id="email" name="email" type="email" placeholder="voce@empresa.com" required disabled={status === "submitting"} className="mt-1.5 h-11 rounded-none border-gray-200 focus:border-d3-purple focus:ring-1 focus:ring-d3-purple" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Telefone</Label>
          <Input id="phone" name="phone" type="tel" placeholder="(00) 00000-0000" disabled={status === "submitting"} className="mt-1.5 h-11 rounded-none border-gray-200 focus:border-d3-purple" />
        </div>
        <div>
          <Label htmlFor="company" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Empresa</Label>
          <Input id="company" name="company" placeholder="Nome da empresa" disabled={status === "submitting"} className="mt-1.5 h-11 rounded-none border-gray-200 focus:border-d3-purple" />
        </div>
      </div>

      <div>
        <Label htmlFor="location" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Endereco (Cidade/Estado)</Label>
        <Input id="location" name="location" placeholder="Cidade, Estado" disabled={status === "submitting"} className="mt-1.5 h-11 rounded-none border-gray-200 focus:border-d3-purple" />
      </div>

      <div>
        <Label htmlFor="subject" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Assunto *</Label>
        <Input id="subject" name="subject" placeholder="Como podemos ajudar?" required disabled={status === "submitting"} className="mt-1.5 h-11 rounded-none border-gray-200 focus:border-d3-purple" />
      </div>

      <div>
        <Label htmlFor="message" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Mensagem *</Label>
        <Textarea id="message" name="message" rows={4} placeholder="Descreva seu projeto ou necessidade..." required disabled={status === "submitting"} className="mt-1.5 rounded-none border-gray-200 focus:border-d3-purple resize-none" />
      </div>

      <Button type="submit" className="w-full bg-d3-purple hover:bg-d3-purple-dark text-white h-12 rounded-none font-semibold text-sm uppercase tracking-wider gap-2" disabled={status === "submitting"}>
        {status === "submitting" ? <><Loader2 className="h-4 w-4 animate-spin" /> Enviando...</> : <><Send className="h-4 w-4" /> Enviar mensagem</>}
      </Button>

      <p className="text-center text-xs text-gray-400">Retornamos em ate 24 horas uteis.</p>
    </form>
  );
}
