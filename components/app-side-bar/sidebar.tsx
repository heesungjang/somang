"use client";

import { Sidebar } from "@/components/ui/sidebar";

import { Header } from "./sidebar-header";
import { Footer } from "./sidebar-footer";
import { Content } from "./sidebar-content";

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon" variant="floating">
      <Header />
      <Content />
      <Footer />
    </Sidebar>
  );
};

export { AppSidebar };
