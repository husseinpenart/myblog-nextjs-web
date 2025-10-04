import { useMutation } from "@tanstack/react-query";
import {
  ApiResponse,
  RegisterPayload,
  RegisterResponse,
} from "../services/@types";
import { registerUser } from "../services/authService";

export function useRegister() {
  return useMutation<ApiResponse<RegisterResponse>, Error, RegisterPayload>({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
  });
}
