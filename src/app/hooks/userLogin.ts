import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { ApiResponse, LoginPayLoad, LoginResponse } from "../services/@types";
import { LoginUser } from "../services/authService";

export function useLogin() {
  const { login } = useAuth();

  return useMutation<ApiResponse<LoginResponse>, Error, LoginPayLoad>({
    mutationFn: (payload) => LoginUser(payload),
    onSuccess: (res) => {
      console.log("Setting token:", res.data);
      if (res.success && res.data) {
        login(res.data as never);
      }
    },
  });
}