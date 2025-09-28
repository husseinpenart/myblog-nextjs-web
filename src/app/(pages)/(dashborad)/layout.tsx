"use client";
import Sidebar from "@/app/components/global/dashboard/Sidebar";
import React, { ReactNode } from "react";
import { ReactChildren } from "../@types";

const layout = ({ children }: ReactChildren) => {
  return (
    <div className="p-4 sm:ml-64">
      <Sidebar />
      <main>{children}</main>
    </div>
  );
};

export default layout;
