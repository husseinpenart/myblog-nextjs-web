"use client";
import Sidebar from "@/app/components/global/dashboard/Sidebar";
import React, { ReactNode } from "react";
import { ReactChildren } from "../@types";
import { AuthProvider } from "@/app/context/AuthContext";

const layout = ({ children }: ReactChildren) => {
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
