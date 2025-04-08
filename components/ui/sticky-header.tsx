import { Label } from "@radix-ui/react-label";
import { GalleryVerticalEnd } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "./button";

const StickyHeader = () => {
  const { signOut } = useAuthActions();

  return (
    <div className="fixed top-0 left-0 w-full h-16 flex items-center justify-between border-b border-custom-border-200/40 px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <GalleryVerticalEnd className="w-6 h-6 mr-3 text-primary" />
        <Label className="text-2xl font-bold tracking-tight">Somang</Label>
      </div>
      <Button variant="outline" className="cursor-pointer" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
};

export default StickyHeader;
