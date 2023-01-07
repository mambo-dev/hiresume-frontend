import React, { ReactNode } from "react";
import { UserProvider } from "./context";
type GlobalProvider = {
  children: ReactNode;
};
export default function GlobalProvider({ children }: GlobalProvider) {
  return <UserProvider>{children}</UserProvider>;
}
