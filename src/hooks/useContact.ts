import { useMutation } from "@tanstack/react-query";
import { sendContactMessage, type ContactPayload } from "@/services/contact.service";

export function useSendContact() {
  return useMutation({
    mutationFn: (data: ContactPayload) => sendContactMessage(data),
  });
}
