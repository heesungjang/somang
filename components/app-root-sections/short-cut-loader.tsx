import { Skeleton } from "@/components/ui/skeleton";

const ShortcutSectionSkeleton = () => (
  <div className="flex flex-col gap-2">
    <div className="flex w-full justify-between items-center">
      <Skeleton className="h-5 w-[150px]" />
      <Skeleton className="h-6 w-[120px]" />
    </div>
    <Skeleton className="h-32 w-full rounded-md" />
  </div>
);

ShortcutSectionSkeleton.displayName = "ShortcutSectionSkeleton";
export default ShortcutSectionSkeleton;
