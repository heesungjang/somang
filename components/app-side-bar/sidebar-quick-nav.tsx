import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import useViewer from "@/hooks/user/use-viewer";
import { LucideIcon, Bell, Home, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface QuickNavItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const QuickNav = () => {
  const viewer = useViewer();
  const pathname = usePathname();

  const defaultItems = useMemo(
    () => [
      {
        icon: Home,
        label: "홈",
        href: `/workspace/${viewer?.defaultWorkspaceId}`,
      },
      {
        icon: Bell,
        label: "받은 편지함",
        href: `/workspace/${viewer?.defaultWorkspaceId}/inbox`,
      },
      {
        icon: Calendar,
        label: "일정",
        href: `/workspace/${viewer?.defaultWorkspaceId}/calendar/month-view`,
      },
    ],
    [viewer],
  );

  if (!viewer) {
    return (
      <div className="flex flex-col gap-2">
        {new Array(3).fill(null).map((_, index) => (
          <Skeleton key={index} className="w-full h-7" />
        ))}
      </div>
    );
  }

  const isActiveTab = (href: string) => pathname === href;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {defaultItems.map((item, index) => (
          <SidebarMenuButton
            tooltip={item.label}
            className="mb-1"
            key={index}
            asChild={Boolean(item.href)}
            isActive={isActiveTab(item.href)}
          >
            {item.href ? (
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            ) : (
              <>
                <item.icon />
                <span>{item.label}</span>
              </>
            )}
          </SidebarMenuButton>
        ))}
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
