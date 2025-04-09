"use client";

import { Section } from "@/components/ui/section";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WorkspaceGreeting from "@/components/work-space-greeting/greeting";
import {
  FluentProvider,
  teamsDarkTheme,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";

import { useMemo, ReactNode, useState } from "react";
import {
  ChevronRight,
  Cross,
  EllipsisVertical,
  Link,
  Menu,
  Pencil,
  Plus,
  Tag,
  Trash,
} from "lucide-react";
import useViewer from "@/hooks/user/use-viewer";
import useWorkspace from "@/hooks/workspace/use-workspace";
import { Skeleton } from "@/components/ui/skeleton";
import useQuickLinks from "@/hooks/workspace/use-quick-links";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ConvexError } from "convex/values";
import { formatUrl, isUrlValid } from "@/lib/utils";
import NextLink from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Id } from "@/convex/_generated/dataModel";
import {
  DateRangeType,
  Calendar as FluentCalendar,
} from "@fluentui/react-calendar-compat";

interface LoadingStateProps {
  isLoading: boolean;
  skeleton: ReactNode;
  children: ReactNode;
}
// Skeleton loaders for each section type
const VerseSectionSkeleton = () => (
  <div className="flex flex-col gap-2">
    <div className="flex w-full justify-between items-center">
      <Skeleton className="h-5 w-[150px]" />
      <Skeleton className="h-6 w-[120px]" />
    </div>
    <Skeleton className="h-[80px] w-full rounded-md" />
  </div>
);

const ShortcutSectionSkeleton = () => (
  <div className="flex flex-col gap-2">
    <div className="flex w-full justify-between items-center">
      <Skeleton className="h-5 w-[150px]" />
      <Skeleton className="h-6 w-[120px]" />
    </div>
    <Skeleton className="h-32 w-full rounded-md" />
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

// Section components
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

const ShortcutSection = ({ isAdmin }: { isAdmin: boolean }) => {
  const viewer = useViewer();

  const [url, setUrl] = useState("");
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [shortcutName, setShortcutName] = useState("");

  const [currentQuickLinkId, setCurrentQuickLinkId] =
    useState<Id<"workspaceQuickLinks"> | null>(null);

  const createQuickLink = useMutation(api.workspace_mutation.createQuickLink);
  const updateQuickLink = useMutation(api.workspace_mutation.updateQuickLink);
  const deleteQuickLink = useMutation(api.workspace_mutation.deleteQuickLink);

  const quickLinks = useQuickLinks({
    workspaceId: viewer?.defaultWorkspaceId,
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!url || !shortcutName) {
      return toast.error("모든 필드를 입력해주세요.");
    }
    if (!viewer?.defaultWorkspaceId) {
      return toast.error("워크스페이스를 선택해주세요.");
    }

    if (!isUrlValid(url)) {
      return toast.error(`유효한 URL을 입력해주세요.`);
    }

    if (isEditing && currentQuickLinkId) {
      updateQuickLink({
        quickLinkId: currentQuickLinkId,
        url: formatUrl(url),
        name: shortcutName,
      })
        .then(() => {
          toast.success("바로가기 링크가 수정되었습니다.");
          resetForm();
        })
        .catch((error) => {
          handleError(error);
        });
    } else {
      createQuickLink({
        workspaceId: viewer?.defaultWorkspaceId,
        url: formatUrl(url),
        name: shortcutName,
      })
        .then(() => {
          toast.success("바로가기 링크가 추가되었습니다.");
          resetForm();
        })
        .catch((error) => {
          handleError(error);
        });
    }
  };

  const handleError = (error: any) => {
    let errorMessage = "";
    if (error instanceof ConvexError) {
      errorMessage = (error.data as { message: string }).message;
    } else {
      errorMessage = "예상치 못한 오류가 발생했습니다.";
    }
    toast.error(errorMessage);
  };

  const resetForm = () => {
    setUrl("");
    setShortcutName("");
    setOpen(false);
    setIsEditing(false);
    setCurrentQuickLinkId(null);
  };

  const handleEdit = (link: any) => {
    setIsEditing(true);
    setCurrentQuickLinkId(link._id);
    setShortcutName(link.name);
    setUrl(link.url);
    setOpen(true);
  };

  const handleDelete = async (quickLinkId: Id<"workspaceQuickLinks">) => {
    await deleteQuickLink({
      quickLinkId,
    });
    toast.success("바로가기 링크가 삭제되었습니다.");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          resetForm();
        }
        setOpen(open);
      }}
    >
      <Section
        title="바로가기 링크"
        action={
          isAdmin && (
            <Button
              variant="link"
              className="cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <Plus />
              링크 추가
            </Button>
          )
        }
      >
        <div className="min-h-32 w-full rounded-md border bg-card py-4">
          <div className="flex flex-row gap-2 items-center h-full w-full justify-center ">
            {quickLinks && quickLinks?.length === 0 && (
              <>
                <Link className="text-muted-foreground opacity-50 w-4 h-4" />
                <span className="text-muted-foreground opacity-50 text-sm">
                  유용한 바로가기 링크를 저장합니다.
                </span>
              </>
            )}
            {quickLinks && quickLinks?.length > 0 && (
              <div className="flex flex-wrap gap-4 justify-start w-full px-4">
                {quickLinks?.map((link) => (
                  <div
                    key={link._id}
                    className="cursor-pointer group flex items-center bg-card px-4 w-[250px] h-[56px] border-[0.5px] border-border rounded-md gap-4 hover:shadow-md transition-shadow"
                  >
                    <NextLink
                      href={link.url}
                      target="_blank"
                      className="flex items-center gap-4"
                    >
                      <div className="flex-shrink-0 size-8 rounded p-2 bg-muted grid place-items-center">
                        <Link className="size-4 stroke-2 text-muted-foreground" />
                      </div>
                      <div className="flex-1 truncate">
                        <div className="text-sm font-medium truncate">
                          {link.name}
                        </div>
                        <div className="text-xs font-medium text-muted-foreground">
                          {link.url}
                        </div>
                      </div>
                    </NextLink>
                    <div className="group-hover:block">
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size={"icon"}
                            className="cursor-pointer w-6 h-6 p-4"
                          >
                            <EllipsisVertical className="w-3 h-3 text-muted-foreground" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={(e) => {
                              handleEdit(link);
                            }}
                          >
                            <Pencil className="w-4 h-4" />
                            수정
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={(e) => {
                              handleDelete(link._id);
                            }}
                          >
                            <Trash className="w-4 h-4" />
                            삭제
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>

      <DialogContent>
        <DialogTitle>
          {isEditing ? "바로가기 링크 수정" : "바로가기 링크 추가"}
        </DialogTitle>
        <div className="flex flex-col gap-12 mt-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
              <Tag className="w-4 h-4" />
              <Input
                type="text"
                placeholder="링크 이름을 입력해주세요."
                required
                value={shortcutName}
                onChange={(e) => setShortcutName(e.target.value)}
              />
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Link className="w-4 h-4" />
              <Input
                type="text"
                placeholder="링크 url을 입력해주세요."
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>

          {isAdmin && (
            <div className="flex flex-row gap-2 justify-end">
              <Button
                variant="outline"
                type="button"
                className="cursor-pointer min-w-[100px]"
                onClick={resetForm}
              >
                취소
              </Button>
              <Button
                type="submit"
                className="cursor-pointer min-w-[100px] bg-primary"
                onClick={handleSubmit}
              >
                {isEditing ? "수정" : "추가"}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

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
      {/* <Calendar className="bg-card rounded-md" fixedWeeks /> */}
      <FluentProvider
        style={{
          background: "none",
        }}
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
