"use client";
import type React from "react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Inputs from "../dashboard/Inputs";
import EditorTool from "../dashboard/EditorTool";
import { createBlog } from "@/app/services/dashboard/blogService";
import { useAuth } from "@/app/context/AuthContext";
import { setAuthToken } from "@/app/services/apiClient";

const FormLayout = () => {
  const { token } = useAuth();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    writer: "",
    category: "",
    description: "",
    cover: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: createBlog,
    onSuccess: (res) => {
      if (res.success) {
        setForm({
          title: "",
          slug: "",
          writer: "",
          category: "",
          description: "",
          cover: null,
        });
        setPreviewUrl(null);
        const fileInput = document.getElementById("cover") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
      }
    },
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    console.log(
      "[v0] File selected:",
      file ? { name: file.name, type: file.type, size: file.size } : "none"
    );
    setForm((prev) => ({ ...prev, cover: file }));
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = () => {
    if (!form.cover) {
      alert("Please select a cover image");
      return;
    }

    setAuthToken(token);
    mutate(form, {
      onError: (err: any) => {
        console.error("Create blog error:", err);
      },
    });
  };

  return (
    <div className="flex flex-col justify-center my-10 px-10 py-10 leading-10">
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
          className="block text-sm font-medium text-gray-700"
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
        {previewUrl && (
          <div className="mt-4">
            <img
              src={previewUrl || "/placeholder.svg"}
              alt="Cover preview"
              className="max-w-xs h-auto rounded"
            />
          </div>
        )}
      </div>

      <div className="px-2.5 m-2 pt-4">
        <EditorTool
          onChange={(val: string) => handleChange("description", val)}
          value={form.description}
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="mx-auto block my-10 rounded border dark:border-white p-2 bg-gray-400 dark:bg-transparent cursor-pointer capitalize font-[NunitoMedium] text-md border-black disabled:opacity-50"
      >
        {isPending ? "Submitting..." : "Submit"}
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

export default FormLayout;
