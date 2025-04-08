"use client";

import {
  SidebarMenu,
  SidebarFooter,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { SideBarUser } from "./sidebar-user";

const Footer = () => {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          {/* <ThemeToggleButton /> */}
          <SideBarUser
            user={{
              name: "John Doe",
              email: "john.doe@example.com",
              avatar: "https://github.com/shadcn.png",
            }}
          />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

Footer.displayName = "SidebarFooter";
export { Footer };
