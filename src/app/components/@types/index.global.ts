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
  ref?: Ref<HTMLDivElement> | undefined
}
