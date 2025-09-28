import { ChangeEventHandler } from "react";

export type TabStatus = "Login" | "Register";
export type OpenSidebar = "Open" | "Close";
export interface InputTypes {
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string;
  label?: string;
}
