import Link from "next/link";
import { ReactNode } from "react";
import { ChevronRight, Plus } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SectionProps {
  title: string;
  titleLink?: string;
  addButtonText: string;
  children: ReactNode;
  className?: string;
}

export function Section({
  title,
  titleLink,
  addButtonText,
  children,
  className,
}: SectionProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex w-full justify-between items-center">
        {titleLink ? (
          <Link
            href={titleLink}
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <Label className="cursor-pointer">{title}</Label>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <Label>{title}</Label>
        )}
        <Button variant="link" className="cursor-pointer">
          <Plus />
          {addButtonText}
        </Button>
      </div>
      {children}
    </div>
  );
}
