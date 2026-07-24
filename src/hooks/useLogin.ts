import { useMutation } from "@tanstack/react-query";
import { login, type LoginRequest } from "@/services/auth.service";
import { setTokens } from "@/services/api";

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (res) => {
      setTokens(res.token, res.refreshToken);
    },
  });
}
