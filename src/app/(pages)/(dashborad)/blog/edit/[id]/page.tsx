"use client";
import EditBlogForm from "@/app/components/global/Layouts/EditBlogForm";
import { use } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const EditBlogPage = ({ params }: PageProps) => {
  const { id } = use(params);

  return <EditBlogForm blogId={id} />;
};

export default EditBlogPage;
