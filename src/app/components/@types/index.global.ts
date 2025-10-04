import { ActualFileObject } from "./../../../../node_modules/filepond/types/index.d";
import { FilePondInitialFile } from "filepond";
import React, { ChangeEventHandler, Ref } from "react";

export type TabStatus = "Login" | "Register";
export type OpenSidebar = "Open" | "Close";
export type openToggleMenu = "On" | "Off";
export interface InputTypes {
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string;
  label?: string;
  type?: string;
}

export interface MobileSideBarType {
  onCloseAction?: () => void;
  ref?: Ref<HTMLDivElement> | undefined;
}
export interface FileUploadsType {
  files?: string | FilePondInitialFile | Blob | ActualFileObject;
  onupdatefiles?(e: any): void;
  maxFiles?: number;
  server?: string;
  name?: string;
  labelIdle?: string;
  className?: string;
  allowMultiple?: boolean;
  allowReorder?: boolean;
}
