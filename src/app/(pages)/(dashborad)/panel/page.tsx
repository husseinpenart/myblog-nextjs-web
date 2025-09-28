"use client";
import MainPanel from "@/app/components/global/dashboard/MainPanel";
import Sidebar from "@/app/components/global/dashboard/Sidebar";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="p-4 sm:ml-64">
        <MainPanel />
      </div>
    </div>
  );
};

export default page;
