import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { sendContactMessage } from "../api/sendContactMessage";
import { Loader2, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    // Honeypot check
    if (formData.get("website")) {
      return;
    }

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    const phone = formData.get("phone") as string;
    const company = formData.get("company") as string;
    const location = formData.get("location") as string;

    if (!name || !email || !subject || !message) {
      setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Por favor, insira um e-mail válido.");
      return;
    }

    setStatus("submitting");

    try {
      await sendContactMessage({
        name,
        email,
        phone,
        company,
        location,
        subject,
        message,
      });
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde."
      );
    }
  };

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center rounded-xl border border-d3-purple/20 bg-d3-purple/5 p-10 text-center"
        aria-live="polite"
      >
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-d3-purple/10">
          <CheckCircle2 className="h-7 w-7 text-d3-purple" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-d3-purple">
          Mensagem enviada com sucesso!
        </h3>
        <p className="text-sm text-muted-foreground">
          Obrigado pelo contato. Retornaremos em breve.
        </p>
        <Button
          variant="outline"
          className="mt-6 border-d3-purple/30 text-d3-purple hover:bg-d3-purple/5"
          onClick={() => setStatus("idle")}
        >
          Enviar nova mensagem
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div aria-live="polite">
        {errorMessage && (
          <div className="mb-5 rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {errorMessage}
          </div>
        )}
      </div>

      {/* Honeypot field */}
      <div className="hidden" aria-hidden="true">
        <Label htmlFor="website">Website</Label>
        <Input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nome completo *</Label>
          <Input id="name" name="name" placeholder="Seu nome" required disabled={status === "submitting"} className="focus-visible:ring-d3-purple" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail *</Label>
          <Input id="email" name="email" type="email" placeholder="voce@empresa.com" required disabled={status === "submitting"} className="focus-visible:ring-d3-purple" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone / WhatsApp</Label>
          <Input id="phone" name="phone" type="tel" placeholder="(00) 00000-0000" disabled={status === "submitting"} className="focus-visible:ring-d3-purple" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Empresa ou instituição</Label>
          <Input id="company" name="company" placeholder="Nome da empresa" disabled={status === "submitting"} className="focus-visible:ring-d3-purple" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Endereço (Cidade/Estado)</Label>
        <Input id="location" name="location" placeholder="Cidade, Estado" disabled={status === "submitting"} className="focus-visible:ring-d3-purple" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Assunto *</Label>
        <Input id="subject" name="subject" placeholder="Como podemos ajudar?" required disabled={status === "submitting"} className="focus-visible:ring-d3-purple" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensagem *</Label>
        <Textarea id="message" name="message" rows={5} placeholder="Descreva seu projeto ou necessidade..." required disabled={status === "submitting"} className="resize-none focus-visible:ring-d3-purple" />
      </div>

      <Button
        type="submit"
        className="w-full bg-d3-purple text-white shadow-md shadow-d3-purple/25 hover:bg-d3-purple-light hover:shadow-lg hover:shadow-d3-purple/30"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar mensagem"
        )}
      </Button>
    </form>
  );
}
