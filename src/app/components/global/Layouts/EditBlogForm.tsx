"use client";
import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { getBlogById, updateBlog } from "@/app/services/dashboard/blogService";
import { useAuth } from "@/app/context/AuthContext";
import { setAuthToken } from "@/app/services/apiClient";
import LoadingSpinner from "../LoadingSpinner";
import Inputs from "../dashboard/Inputs";
import EditorTool from "../dashboard/EditorTool";

interface EditBlogFormProps {
  blogId: string;
}

const EditBlogForm = ({ blogId }: EditBlogFormProps) => {
  const { token } = useAuth();
  const isFormInitialized = useRef(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    writer: "",
    category: "",
    description: "",
    cover: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [existingImagePath, setExistingImagePath] = useState<string | null>(
    null
  );

  const {
    data: blogData,
    isLoading: isFetching,
    error: fetchError,
  } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: async () => {
      setAuthToken(token);
      const response = await getBlogById(blogId);
      return response;
    },
    enabled: !!blogId && !!token,
    retry: 1,
  });

  useEffect(() => {
    if (blogData && !isFormInitialized.current) {
      const blog = blogData;
      const description = blog.description || (blog as any).Description || "";

      setForm({
        title: blog.title || "",
        slug: blog.slug || "",
        writer: blog.writer || "",
        category: blog.category || "",
        description: description,
        cover: blog.imagePath,
      });

      if (blog.imagePath) {
        setExistingImagePath(blog.imagePath);
      }

      isFormInitialized.current = true;
    }
  }, [blogData]);

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: (payload: typeof form) => updateBlog(blogId, payload),
    onSuccess: (res) => {
      if (res.success) {
        setForm((prev) => ({ ...prev, cover: null }));
        setPreviewUrl(null);
        const fileInput = document.getElementById("cover") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
        if (res.data?.imagePath) {
          setExistingImagePath(res.data.imagePath);
        }
      }
    },
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    setForm((prev) => ({ ...prev, cover: file }));
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = () => {
    if (
      !form.title ||
      !form.slug ||
      !form.writer ||
      !form.category ||
      !form.description
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const payload = {
      ...form,
    };
    setAuthToken(token);
    mutate(payload, {
      onError: (err: any) => {
        console.error("Update blog error:", err);
      },
    });
  };

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "";

    // If imagePath is already a full URL, return it as-is
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

    // Remove /api/v1 from the base URL to get the root domain
    const rootUrl = baseUrl.replace(/\/api\/v\d+\/?$/, "");

    // Ensure imagePath doesn't start with a slash if rootUrl ends with one
    const cleanImagePath = imagePath.startsWith("/")
      ? imagePath
      : `/${imagePath}`;

    return `${rootUrl}${cleanImagePath}`;
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600">
          <p>Error loading blog: {(fetchError as Error).message}</p>
          <p className="text-sm mt-2">Blog ID: {blogId}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center my-10 px-10 py-10 leading-10">
      <h1 className="text-2xl font-bold mb-6">Edit Blog</h1>

      <Inputs
        label="title"
        placeholder="Enter blog title"
        onChange={(e: any) => handleChange("title", e.target.value)}
        value={form.title}
      />
      <Inputs
        label="slug"
        placeholder="Enter blog slug"
        onChange={(e: any) => handleChange("slug", e.target.value)}
        value={form.slug}
      />
      <Inputs
        label="writer"
        placeholder="Enter writer name"
        onChange={(e: any) => handleChange("writer", e.target.value)}
        value={form.writer}
      />
      <Inputs
        label="category"
        placeholder="Enter category"
        onChange={(e: any) => handleChange("category", e.target.value)}
        value={form.category}
      />

      <div className="p-5">
        <label
          htmlFor="cover"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Cover Image
        </label>
        <input
          type="file"
          id="cover"
          name="cover"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
        {previewUrl ? (
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              New image preview:
            </p>
            <img
              src={previewUrl || "/placeholder.svg"}
              alt="New cover preview"
              className="max-w-xs h-auto rounded border border-gray-300"
            />
          </div>
        ) : existingImagePath ? (
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Current image:
            </p>
            <img
              src={getImageUrl(existingImagePath) || "/placeholder.svg"}
              alt="Current cover"
              className="max-w-xs h-auto rounded border border-gray-300"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const errorMsg = document.createElement("p");
                errorMsg.className = "text-red-500 text-sm mt-2";
                errorMsg.textContent = `Failed to load image. Check console for URL.`;
                e.currentTarget.parentElement?.appendChild(errorMsg);
              }}
              onLoad={() => {}}
            />
          </div>
        ) : null}
      </div>

      <div className="px-2.5 m-2 pt-4">
        <EditorTool
          onChange={(val: string) => handleChange("description", val)}
          value={form.description}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isPending || isFetching}
        className="mx-auto block my-10 rounded border dark:border-white p-2 bg-gray-400 dark:bg-transparent cursor-pointer capitalize font-[NunitoMedium] text-md border-black disabled:opacity-50 hover:bg-gray-500 dark:hover:bg-gray-800 transition-colors"
      >
        {isPending ? "Updating..." : "Update Blog"}
      </button>

      {data && (
        <p
          className={`text-center mt-4 ${
            data.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {data.message}
        </p>
      )}
      {error && (
        <p className="text-red-600 text-center mt-4">
          {(error as any)?.response?.data?.message ?? (error as Error).message}
        </p>
      )}
    </div>
  );
};

export default EditBlogForm;
