export type ContactMessagePayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  location?: string;
  subject: string;
  message: string;
};

export async function sendContactMessage(data: ContactMessagePayload) {
  // TODO: Implementar chamada real de API
  return new Promise<{ success: true }>((resolve) => {
    setTimeout(() => {
      console.log("Mensagem enviada (simulado):", data);
      resolve({ success: true });
    }, 800);
  });
}
