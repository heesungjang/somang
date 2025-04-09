import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { NavItemCollapsible } from "./sidebar-nav-item";
import { NavItem } from "./sidebar-data";

interface ChannelsSectionProps {
  title?: string;
  channels: NavItem[];
  onAddChannel?: () => void;
}

export const ChannelsSection = ({
  title = "채널",
  channels,
  onAddChannel,
}: ChannelsSectionProps) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarGroupAction onClick={onAddChannel}>
        <Plus />
      </SidebarGroupAction>
      <SidebarMenu>
        {channels.map((item) => (
          <NavItemCollapsible key={item.title} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
