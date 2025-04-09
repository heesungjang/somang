import {
  SidebarGroup,
  SidebarContent,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenu,
} from "@/components/ui/sidebar";

import { SearchDialog } from "./sidebar-search-dialog";
import { sidebarData } from "./sidebar-data";
import { QuickNav } from "./sidebar-quick-nav";
import { ChannelsSection } from "./sidebar-channels-section";

const Content = () => {
  return (
    <SidebarContent>
      {/* Search Section */}
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SearchDialog />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Quick Navigation Section */}
      <SidebarGroup>
        <SidebarGroupContent>
          <QuickNav />
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Channels Section */}
      <ChannelsSection channels={sidebarData.navMain} />
    </SidebarContent>
  );
};

Content.displayName = "SidebarContent";

export { Content };
