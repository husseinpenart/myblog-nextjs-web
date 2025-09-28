"use client";
import React from "react";
import Inputs from "../dashboard/Inputs";
import EditorTool from "../dashboard/EditorTool";
import FileUpload from "../dashboard/FileUpload";

const FromtLayout = () => {
  return (
    <div className="flex flex-col justify-center justify-items-center my-10 px-10 py-10 leading-10">
      <Inputs label="title" placeholder="" />
      <Inputs label="slug" placeholder="" />
      <Inputs label="writer" placeholder="" />
      <Inputs label="category" placeholder="" />

      <FileUpload />
      <div className="px-2.5 m-2 pt-4">
        <EditorTool />
      </div>
    </div>
  );
};

export default FromtLayout;
