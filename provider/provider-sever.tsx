"use server";

import { ReactNode } from "react";
import { cookies } from "next/headers";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

export interface IAppProvider {
  children: ReactNode;
}

export const AppServerProvider: React.FC<IAppProvider> = async (props) => {
  return (
    <ConvexAuthNextjsServerProvider>
      <SidebarProvider defaultOpen={true}>{props.children}</SidebarProvider>
    </ConvexAuthNextjsServerProvider>
  );
};
