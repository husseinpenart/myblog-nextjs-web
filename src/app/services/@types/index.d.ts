export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  itemLength: number;
  statusCode: number;
  data: T | null;
  extra: unknown;
}

export interface RegisterResponse {
  name: string;
  email: string;
  phone: string;
  password: string | null;
}

export interface LoginPayLoad {
  email: string;
  password: string;
}
export interface LoginResponse {
  email: string;
  password: string;
}

export interface CreateBlogPayload {
  title: string;
  slug: string;
  writer: string;
  category: string;
  description: string;
  imagePath?: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  imagePath: string;
  description: string;
  category: string;
  writer: string;
  userId: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  itemLength: number;
  statusCode: number;
  data: T;
  extra: any;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  imagePath: string;
  description: string;
  category: string;
  writer: string;
  userId: string;
  createdAt: string;
}

export interface CreateBlogPayload {
  slug: string;
  title: string;
  cover: string | File;
  description: string;
  category: string;
  writer: string;
}

export interface PaginatedData<T> {
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  itemLength: number;
  statusCode: number;
  data: PaginatedData<T>;
  extra: null;
}
