import type {
  ApiResponse,
  Blog,
  CreateBlogPayload,
  PaginatedResponse,
} from "../@types";
import { apiClient } from "../apiClient";

export async function createBlog(payload: {
  title: string;
  slug: string;
  writer: string;
  category: string;
  description: string;
  cover: File | null;
}): Promise<ApiResponse<Blog>> {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("slug", payload.slug);
  formData.append("writer", payload.writer);
  formData.append("category", payload.category);
  formData.append("Description", payload.description);

  if (payload.cover) {
    formData.append("cover", payload.cover);
  }

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`  ${key}:`, value.name, value.type, value.size);
    } else {
      console.log(`  ${key}:`, value);
    }
  }

  return apiClient<ApiResponse<Blog>>("/Blog", {
    method: "POST",
    body: formData,
  });
}

export async function getBlogById(id: string): Promise<ApiResponse<Blog>> {
  return apiClient<ApiResponse<Blog>>(`/Blog/${id}`, {
    method: "GET",
  });
}

export async function updateBlog(
  id: string,
  payload: CreateBlogPayload
): Promise<ApiResponse<Blog>> {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("slug", payload.slug);
  formData.append("writer", payload.writer);
  formData.append("category", payload.category);
  formData.append("Description", payload.description);

  // Only append cover if it’s a File (new image)
  if (payload.cover instanceof File) {
    formData.append("cover", payload.cover);
  }

  // Log FormData for debugging
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`  ${key}:`, value.name, value.type, value.size);
    } else {
      console.log(`  ${key}:`, value);
    }
  }

  return apiClient<ApiResponse<Blog>>(`/Blog/${id}`, {
    method: "PUT",
    body: formData,
  });
}

export async function getBlogsPaginated(
  pageNumber = 1,
  pageSize = 10
): Promise<PaginatedResponse<Blog>> {
  return apiClient<PaginatedResponse<Blog>>(
    `/Blog?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    {
      method: "GET",
    }
  );
}
