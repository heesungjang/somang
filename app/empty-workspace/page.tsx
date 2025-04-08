"use client";

import { LogIn, ArchiveX, CirclePlus, GalleryVerticalEnd } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import StickyHeader from "@/components/ui/sticky-header";

interface ActionButtonProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
}

const ActionButton = ({
  icon: Icon,
  title,
  description,
  onClick,
}: ActionButtonProps) => (
  <Button
    variant="outline"
    className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-lg text-center border border-custom-border-200/40 w-full sm:w-60 h-auto sm:h-60 gap-4 sm:gap-8 cursor-pointer"
    onClick={onClick}
  >
    <div className="rounded-full bg-primary w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
      <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
    </div>
    <div className="flex flex-col gap-2">
      <span className="text-base sm:text-lg font-medium">{title}</span>
      <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
    </div>
  </Button>
);

const EmptyWorkspacePage = () => {
  const router = useRouter();
  const handleCreateWorkspace = () => {
    router.push("/create-workspace");
  };
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center bg-background p-4 sm:p-6">
      <StickyHeader />
      <Card className="p-4 sm:p-6 shadow-lg bg-custom-background-100 w-full max-w-2xl">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex flex-col space-y-2 text-center items-center">
            <ArchiveX className="w-10 h-10 text-custom-border-200 mt-4 mb-6 sm:mb-8" />
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">
              아직 워크스페이스가 없어요
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full justify-center">
            <ActionButton
              icon={LogIn}
              title="워크스페이스 참여"
              description="기존 워크스페이스에 참여하기"
            />
            <ActionButton
              icon={CirclePlus}
              title="워크스페이스 생성"
              description="새로운 워크스페이스 만들기"
              onClick={handleCreateWorkspace}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EmptyWorkspacePage;
