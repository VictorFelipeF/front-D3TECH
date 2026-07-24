import { useMutation } from "@tanstack/react-query";
import { updateProfilePicture } from "@/services/users.service";

export function useUpdateProfilePicture() {
  return useMutation({
    mutationFn: (url: string) => updateProfilePicture(url),
  });
}
