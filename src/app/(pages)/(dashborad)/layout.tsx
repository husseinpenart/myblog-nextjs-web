"use client";
import Sidebar from "@/app/components/global/dashboard/Sidebar";
import React, { ReactNode, useEffect } from "react";
import { ReactChildren } from "../@types";
import { AuthProvider } from "@/app/context/AuthContext";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";

const layout = ({ children }: ReactChildren) => {
  const token = new Cookies();
  const router = useRouter();
  const Authorizing = token.get("authToken");
  const Authorized = () => {
    Authorizing == null ? router.push("/") : Authorizing;
  };
  useEffect(() => {
    Authorized();
  });
  return (
    <AuthProvider>
      <div className="p-4 sm:ml-64">
        <Sidebar />
        {children}
      </div>
    </AuthProvider>
  );
};

export default layout;
