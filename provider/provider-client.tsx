"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "./provider-theme";
import ConvexClientProvider from "@/components/ConvexClientProvider";

export interface IAppProvider {
  children: ReactNode;
}

export const AppClientProvider: React.FC<IAppProvider> = (props) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ConvexClientProvider>{props.children}</ConvexClientProvider>
    </ThemeProvider>
  );
};
