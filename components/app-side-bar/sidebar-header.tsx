"use client";
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import useWorkspace from "@/hooks/workspace/use-workspace";

const SidebarTopActionGroup = () => {
  const { state } = useSidebar();
  const workspaceId = useParams().workspaceId;
  const workspace = useWorkspace({
    workspaceId: workspaceId as Id<"workspaces">,
  });

  if (!workspace) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  const isExpanded = state === "expanded";
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex items-center gap-1 justify-between w-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md cursor-pointer",
            isExpanded && "py-2 px-2",
          )}
        >
          <div className="flex items-center gap-2">
            <Avatar
              className={cn(
                "rounded-sm font-semibold",
                isExpanded ? "h-6 w-6" : "h-8 w-8",
              )}
            >
              <AvatarImage src="" />
              <AvatarFallback
                className={cn(
                  "bg-sky-800 text-white rounded-sm",
                  isExpanded ? "text-xs" : "text-sm",
                )}
              >
                {workspace?.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            {isExpanded && (
              <Label className="cursor-pointer whitespace-nowrap min-w-[120px]">
                {workspace?.name}
              </Label>
            )}
          </div>
          <ChevronDown className="size-4 text-neutral-500" />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-80" align="start">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const Header = () => {
  return (
    <SidebarHeader className="pt-3">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarTopActionGroup />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

Header.displayName = "SidebarHeader";
export { Header };
