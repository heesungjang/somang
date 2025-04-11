import { Skeleton } from "@/components/ui/skeleton";

const CalendarSectionSkeleton = () => (
  <div className="flex flex-col gap-2">
    <div className="flex w-full justify-between items-center">
      <Skeleton className="h-5 w-[150px]" />
      <Skeleton className="h-6 w-[120px]" />
    </div>
    <div className="flex flex-col md:flex-row gap-4">
      <Skeleton className="h-[240px] md:w-[300px] w-full rounded-md" />
      <Skeleton className="h-[240px] w-full rounded-md" />
    </div>
  </div>
);

CalendarSectionSkeleton.displayName = "CalendarSectionSkeleton";
export default CalendarSectionSkeleton;
