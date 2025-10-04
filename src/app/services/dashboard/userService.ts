import { ProfileApiResponse, profileType, UpdateProfileType } from "../@types";
import { apiClient } from "../apiClient";

export async function getProfile(): Promise<ProfileApiResponse<profileType>> {
  return apiClient<ProfileApiResponse<profileType>>("/User/profile", {
    method: "GET",
  });
}

export async function updateProfile(
  data: UpdateProfileType
): Promise<ProfileApiResponse<profileType>> {
  return apiClient<ProfileApiResponse<profileType>>("/User/profile", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
