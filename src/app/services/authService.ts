// src/services/authService.ts
import { apiClient } from "./apiClient";
import {
  ApiResponse,
  LoginPayLoad,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "./@types";

export function registerUser(
  payload: RegisterPayload
): Promise<ApiResponse<RegisterResponse>> {
  return apiClient<ApiResponse<RegisterResponse>>("/User/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function LoginUser(
  payload: LoginPayLoad
): Promise<ApiResponse<LoginResponse>> {
  return apiClient<ApiResponse<LoginResponse>>("/User/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
