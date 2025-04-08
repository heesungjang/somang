import { Label } from "@/components/ui/label";
import useViewer from "@/hooks/user/use-viewer";
import { Skeleton } from "@/components/ui/skeleton";

const WorkspaceGreeting = () => {
  const viewer = useViewer();

  if (!viewer) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-56" />
        <Skeleton className="h-6 w-42" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-md">안녕하세요, {viewer?.name}님 👋</Label>
      <span className="text-muted-foreground text-md">
        오늘도 좋은 하루 보내세요!
      </span>
    </div>
  );
};

export default WorkspaceGreeting;
