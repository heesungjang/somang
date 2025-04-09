import { SearchIcon } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";

interface SearchButtonProps {
  label?: string;
  onClick?: () => void;
}

export const SearchButton = ({
  label = "검색",
  onClick,
}: SearchButtonProps) => {
  return (
    <SidebarMenuButton
      variant="default"
      className="w-full justify-start cursor-pointer bg-sidebar-accent opacity-60 border border-zinc-700"
      onClick={onClick}
    >
      <SearchIcon />
      <span>{label}</span>
    </SidebarMenuButton>
  );
};
