import {
  Calendar,
  Smile,
  Calculator,
  User,
  CreditCard,
  Settings,
} from "lucide-react";
import {
  CommandDialog,
  CommandDialogContent,
  CommandDialogTitle,
  CommandDialogTrigger,
} from "../app-command-palette/command";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../ui/command";

import { SearchButton } from "./sidebar-search-button";

interface SearchDialogProps {
  trigger?: React.ReactNode;
}

export const SearchDialog = ({ trigger }: SearchDialogProps) => {
  return (
    <CommandDialog>
      <CommandDialogTrigger asChild>
        {trigger || <SearchButton />}
      </CommandDialogTrigger>
      <CommandDialogTitle></CommandDialogTitle>
      <CommandDialogContent className="sm:max-w-[425px]">
        <Command className="rounded-lg border shadow-md md:min-w-[450px]">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Calendar />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <Smile />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem disabled>
                <Calculator />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCard />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialogContent>
    </CommandDialog>
  );
};
