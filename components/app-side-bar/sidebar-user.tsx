"use client";

import {
  Bell,
  LogOut,
  Sparkles,
  CreditCard,
  BadgeCheck,
  ChevronsUpDown,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  useSidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { useAuthActions } from "@convex-dev/auth/react";
import { ThemeToggleButton } from "@/components/ui/button-theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import useViewer from "@/hooks/user/use-viewer";
import { Skeleton } from "@/components/ui/skeleton";

const SideBarUser = ({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) => {
  const { isMobile } = useSidebar();
  const viewer = useViewer();
  const { signOut } = useAuthActions();

  if (!viewer) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8" />
        <div className="flex flex-col gap-1 w-full">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={viewer.image || ""} alt={viewer.name || ""} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{viewer.name}</span>
                <span className="truncate text-xs">{viewer.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={viewer.image || ""}
                    alt={viewer.name || ""}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight mr-3">
                  <span className="truncate font-semibold">{viewer.name}</span>
                  <span className="truncate text-xs">{viewer.email}</span>
                </div>
                <ThemeToggleButton />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup></DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

SideBarUser.displayName = "SideBarUser";
export { SideBarUser };
