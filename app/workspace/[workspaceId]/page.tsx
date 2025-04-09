"use client";

import { Section } from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WorkspaceGreeting from "@/components/work-space-greeting/greeting";
import { FluentProvider, webDarkTheme } from "@fluentui/react-components";
import { useMemo, ReactNode, useState } from "react";
import { Cross, Plus } from "lucide-react";
import useViewer from "@/hooks/user/use-viewer";
import useWorkspace from "@/hooks/workspace/use-workspace";
import { Skeleton } from "@/components/ui/skeleton";
import useQuickLinks from "@/hooks/workspace/use-quick-links";
import { Button } from "@/components/ui/button";

import {
  DateRangeType,
  Calendar as FluentCalendar,
} from "@fluentui/react-calendar-compat";
import ShortcutSection from "@/components/app-root-sections/short-cut-section";
import ShortcutSectionSkeleton from "@/components/app-root-sections/short-cut-loader";

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
    <Alert>
      <Cross className="h-4 w-4" />
      <AlertTitle>요한복은 3:16</AlertTitle>
      <AlertDescription>
        하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 저를 믿는 자마다
        멸망치 않고 영생을 얻게 하려 하심이니라.
      </AlertDescription>
    </Alert>
  </Section>
);

const CalendarSection = ({ isAdmin }: { isAdmin: boolean }) => (
  <Section
    title="일정"
    titleLink="/calendar"
    action={
      <Button variant="link" className="cursor-pointer">
        <Plus />
        일정 추가
      </Button>
    }
  >
    <div className="flex flex-col md:flex-row gap-4">
      <FluentProvider
        style={{ background: "none" }}
        theme={{
          ...webDarkTheme,
          colorBrandBackgroundInvertedSelected: "oklch(0.3 0.01 250)",
          colorNeutralForeground1Static: "oklch(0.95 0.01 250)",
          colorBrandBackgroundInvertedHover: "oklch(0.3 0.01 250)",
          colorBrandBackground: "oklch(0.65 0.2 250)",
          colorBrandForegroundOnLightHover: "oklch(0.65 0.2 250)",
        }}
      >
        <div className="bg-card rounded-md h-full w-full flex justify-center items-center">
          <FluentCalendar
            className="bg-card rounded-md h-full w-full"
            showMonthPickerAsOverlay
            dateRangeType={DateRangeType.Week}
          />
        </div>
      </FluentProvider>
      <ScrollArea className="h-82 w-full rounded-md border bg-card"></ScrollArea>
    </div>
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
