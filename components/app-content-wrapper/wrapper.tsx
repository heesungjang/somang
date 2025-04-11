"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppHeader } from "@/components/app-header";
import { AppBreadcrumb } from "@/components/app-breadcrumb";

import {
  GalleryVerticalEnd,
  PanelLeftClose,
  PanelLeftOpen,
  SquareMenu,
} from "lucide-react";
import { Label } from "../ui/label";

const AppContentWrapper = ({ children }: { children?: React.ReactNode }) => {
  const { state, toggleSidebar, isMobile } = useSidebar();

  const isExpanded = state === "expanded";
  const handleSidebarExpand = () => {
    toggleSidebar();
  };

  return (
    <div className="flex flex-col w-full h-full">
      <AppHeader>
        <AppHeader.Left>
          {!isMobile &&
            (isExpanded ? (
              <PanelLeftClose
                strokeWidth={1.5}
                size={20}
                onClick={handleSidebarExpand}
                className="cursor-pointer text-zinc-500"
              />
            ) : (
              <PanelLeftOpen
                strokeWidth={1.5}
                size={20}
                onClick={handleSidebarExpand}
                className="cursor-pointer text-zinc-500"
              />
            ))}
          {isMobile && (
            <SquareMenu
              strokeWidth={1.5}
              size={20}
              onClick={handleSidebarExpand}
              className="cursor-pointer text-zinc-500"
            />
          )}
          <Separator orientation="vertical" className="max-h-5" />

          <AppBreadcrumb />
        </AppHeader.Left>

        <AppHeader.Right></AppHeader.Right>
      </AppHeader>
      <div className="flex flex-col p-6 w-full h-full overflow-scroll">
        <div className="flex flex-col gap-8">{children}</div>
      </div>
    </div>
  );
};

AppContentWrapper.displayName = "AppContentWrapper";
export { AppContentWrapper };
