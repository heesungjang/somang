"use client";

import { Cross, Plus } from "lucide-react";
import { useMemo, ReactNode } from "react";
import { Section } from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WorkspaceGreeting from "@/components/work-space-greeting/greeting";

import { Button } from "@/components/ui/button";
import useViewer from "@/hooks/user/use-viewer";
import { Skeleton } from "@/components/ui/skeleton";
import useQuickLinks from "@/hooks/workspace/use-quick-links";
import useWorkspace from "@/hooks/workspace/use-workspace";

import ShortcutSection from "@/components/app-root-sections/short-cut-section";
import CalendarSection from "@/components/app-root-sections/calendar-section";
import ShortcutSectionSkeleton from "@/components/app-root-sections/short-cut-loader";
import CalendarSectionSkeleton from "@/components/app-root-sections/calendar-loader";

interface LoadingStateProps {
  isLoading: boolean;
  skeleton: ReactNode;
  children: ReactNode;
}

const VerseSectionSkeleton = () => (
  <div className="flex flex-col gap-2">
    <div className="flex w-full justify-between items-center">
      <Skeleton className="h-5 w-[150px]" />
      <Skeleton className="h-6 w-[120px]" />
    </div>
    <Skeleton className="h-[80px] w-full rounded-md" />
  </div>
);

const AnnouncementSectionSkeleton = () => (
  <div className="flex flex-col gap-2">
    <div className="flex w-full justify-between items-center">
      <Skeleton className="h-5 w-[150px]" />
      <Skeleton className="h-6 w-[120px]" />
    </div>
    <Skeleton className="h-82 w-full rounded-md" />
  </div>
);

const LoadingState = ({ isLoading, skeleton, children }: LoadingStateProps) => {
  return isLoading ? skeleton : children;
};

const VerseSection = ({ isAdmin }: { isAdmin: boolean }) => (
  <Section
    title="오늘의 말씀"
    action={
      <Button variant="link" className="cursor-pointer">
        <Plus />
        성경 말씀 변경
      </Button>
    }
  >
    <Alert className="rounded-md">
      <Cross className="h-4 w-4" />
      <AlertTitle>요한복은 3:16</AlertTitle>
      <AlertDescription>
        하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 저를 믿는 자마다
        멸망치 않고 영생을 얻게 하려 하심이니라.
      </AlertDescription>
    </Alert>
  </Section>
);

const AnnouncementSection = () => (
  <Section
    title="공지사항"
    titleLink="/announcement"
    action={
      <Button variant="link" className="cursor-pointer">
        <Plus />
        공지사항 추가
      </Button>
    }
  >
    <ScrollArea className="h-82 w-full rounded-md border bg-card"></ScrollArea>
  </Section>
);

export default function WorkspaceDashboardPage() {
  const viewer = useViewer();
  const workspace = useWorkspace({
    workspaceId: viewer?.defaultWorkspaceId,
  });
  const quickLinks = useQuickLinks({
    workspaceId: viewer?.defaultWorkspaceId,
  });

  const isLoading = !viewer || !workspace || !quickLinks;
  const isAdmin = useMemo(() => {
    return workspace?.ownerId === viewer?._id;
  }, [workspace, viewer]);

  return (
    <>
      <WorkspaceGreeting />

      <LoadingState isLoading={isLoading} skeleton={<VerseSectionSkeleton />}>
        <VerseSection isAdmin={isAdmin} />
      </LoadingState>

      <LoadingState
        isLoading={isLoading}
        skeleton={<ShortcutSectionSkeleton />}
      >
        <ShortcutSection isAdmin={isAdmin} />
      </LoadingState>

      <Separator />

      <LoadingState
        isLoading={isLoading}
        skeleton={<CalendarSectionSkeleton />}
      >
        <CalendarSection isAdmin={isAdmin} />
      </LoadingState>

      <Separator />

      <LoadingState
        isLoading={isLoading}
        skeleton={<AnnouncementSectionSkeleton />}
      >
        <AnnouncementSection />
      </LoadingState>
    </>
  );
}
