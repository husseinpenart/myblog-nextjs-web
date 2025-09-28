
"use client";

import React, { useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import LoadingSpinner from "../LoadingSpinner";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => <div className="mx-auto block mt-10"><LoadingSpinner /></div>
});

interface EditorPropsTypes {
  placeholder?: string;
  value: string;
  onBlur?: (newContent: string) => void;
  onChange: (newContent: string) => void;
}

const EditorTool: React.FC<EditorPropsTypes> = ({
  placeholder,
  value,
  onBlur,
  onChange
}) => {
  const editor = useRef(null);
  const toolbars = useMemo(
    () => ({
      toolbar: true,
      spellcheck: true,
      language: "en",
      toolbarButtonSize: "large",
      toolbarAdaptive: false,
      showCharsCounter: true,
      showWordsCounter: true,
      showXPathInStatusbar: false,
      askBeforePasteHTML: true,
      askBeforePasteFromWord: true,
      uploader: {
        insertImageAsBase64URI: true
      },
      style: {
        backgroundColor: "",
        color: "black"
      },
      readonly: false,
      placeholder: placeholder || " writer your text ... "
    }),
    [placeholder]
  );

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={toolbars}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
};

export default EditorTool;
