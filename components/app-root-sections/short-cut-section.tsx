"use client";

import {
  Tag,
  Plus,
  Pencil,
  Trash,
  EllipsisVertical,
  Link as LinkIcon,
} from "lucide-react";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import useViewer from "@/hooks/user/use-viewer";

import { toast } from "sonner";
import NextLink from "next/link";
import { useMutation } from "convex/react";
import { ConvexError } from "convex/values";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { formatUrl, isUrlValid } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import useQuickLinks from "@/hooks/workspace/use-quick-links";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Id } from "@/convex/_generated/dataModel";

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

    const formattedUrl = formatUrl(url);

    if (isEditing && currentQuickLinkId) {
      updateQuickLink({
        quickLinkId: currentQuickLinkId,
        url: formattedUrl,
        name: shortcutName,
      })
        .then(() => {
          toast.success("바로가기 링크가 수정되었습니다.");
          resetForm();
        })
        .catch(handleError);
    } else {
      createQuickLink({
        workspaceId: viewer.defaultWorkspaceId,
        url: formattedUrl,
        name: shortcutName,
      })
        .then(() => {
          toast.success("바로가기 링크가 추가되었습니다.");
          resetForm();
        })
        .catch(handleError);
    }
  };

  const handleError = (error: any) => {
    const errorMessage =
      error instanceof ConvexError
        ? (error.data as { message: string }).message
        : "예상치 못한 오류가 발생했습니다.";

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
    await deleteQuickLink({ quickLinkId });
    toast.success("바로가기 링크가 삭제되었습니다.");
  };

  const renderEmptyState = () => (
    <>
      <LinkIcon className="text-muted-foreground opacity-50 w-4 h-4" />
      <span className="text-muted-foreground opacity-50 text-sm">
        유용한 바로가기 링크를 저장합니다.
      </span>
    </>
  );

  const renderLinkItem = (link: any) => (
    <div
      key={link._id}
      className="cursor-pointer group flex items-center justify-between bg-card px-4 w-[250px] h-[56px] border-[0.5px] border-border rounded-md hover:shadow-md transition-shadow"
    >
      <NextLink
        href={link.url}
        target="_blank"
        className="flex items-center gap-4 flex-1 overflow-hidden"
      >
        <div className="flex-shrink-0 size-8 rounded p-2 bg-muted grid place-items-center">
          <LinkIcon className="size-4 stroke-2 text-muted-foreground" />
        </div>
        <div className="flex-1 truncate">
          <div className="text-sm font-medium truncate">{link.name}</div>
          <div className="text-xs font-medium text-muted-foreground truncate">
            {link.url}
          </div>
        </div>
      </NextLink>
      <div className="group-hover:block ml-2 flex-shrink-0">
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
              onClick={() => handleEdit(link)}
            >
              <Pencil className="w-4 h-4" />
              수정
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => handleDelete(link._id)}
            >
              <Trash className="w-4 h-4" />
              삭제
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  const renderFormContent = () => (
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
        <LinkIcon className="w-4 h-4" />
        <Input
          type="text"
          placeholder="링크 url을 입력해주세요."
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) resetForm();
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
          <div className="flex flex-row gap-2 items-center h-full w-full justify-center">
            {quickLinks && quickLinks.length === 0 && renderEmptyState()}
            {quickLinks && quickLinks.length > 0 && (
              <div className="flex flex-wrap gap-4 justify-start w-full px-4">
                {quickLinks.map(renderLinkItem)}
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
          {renderFormContent()}

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

ShortcutSection.displayName = "ShortcutSection";

export default ShortcutSection;
