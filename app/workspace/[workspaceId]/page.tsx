"use client";

import { Section } from "@/components/ui/section";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WorkspaceGreeting from "@/components/work-space-greeting/greeting";

import { Cross, Link } from "lucide-react";

export default function WorkspaceDashboardPage() {
  return (
    <>
      <WorkspaceGreeting />

      <Section title="오늘의 말씀" addButtonText="성경 구절 변경">
        <Alert>
          <Cross className="h-4 w-4" />
          <AlertTitle>요한복은 3:16</AlertTitle>
          <AlertDescription>
            하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 저를 믿는
            자마다 멸망치 않고 영생을 얻게 하려 하심이니라.
          </AlertDescription>
        </Alert>
      </Section>

      <Section title="바로가기 링크" addButtonText="링크 추가">
        <div className="h-32 w-full rounded-md border bg-card">
          <div className="flex flex-row gap-2 items-center h-full w-full justify-center">
            <Link className="text-muted-foreground opacity-50 w-4 h-4" />
            <span className="text-muted-foreground opacity-50 text-sm">
              유용한 바로가기 링크를 저장합니다.
            </span>
          </div>
        </div>
      </Section>

      <Separator />

      <Section title="일정" titleLink="/calendar" addButtonText="일정 추가">
        <div className="flex flex-col md:flex-row gap-4">
          <Calendar className="bg-card rounded-md" fixedWeeks />
          <ScrollArea className="h-82 w-full rounded-md border bg-card"></ScrollArea>
        </div>
      </Section>

      <Separator />

      <Section
        title="공지사항"
        titleLink="/announcement"
        addButtonText="공지사항 추가"
      >
        <ScrollArea className="h-82 w-full rounded-md border bg-card"></ScrollArea>
      </Section>
    </>
  );
}
