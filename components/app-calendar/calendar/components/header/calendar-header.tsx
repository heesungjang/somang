import Link from "next/link";
import {
  Columns,
  Grid3x3,
  List,
  Plus,
  Grid2x2,
  CalendarRange,
} from "lucide-react";

import {
  Button,
  ButtonGroup,
} from "@/components/app-calendar/components/ui/button";

import { UserSelect } from "@/components/app-calendar/calendar/components/header/user-select";
import { TodayButton } from "@/components/app-calendar/calendar/components/header/today-button";
import { DateNavigator } from "@/components/app-calendar/calendar/components/header/date-navigator";
import { AddEventDialog } from "@/components/app-calendar/calendar/components/dialogs/add-event-dialog";

import type { IEvent } from "@/components/app-calendar/calendar/interfaces";
import type { TCalendarView } from "@/components/app-calendar/calendar/types";
import useViewer from "@/hooks/user/use-viewer";
import { Skeleton } from "@/components/ui/skeleton";

interface IProps {
  view: TCalendarView;
  events: IEvent[];
}

export function CalendarHeader({ view, events }: IProps) {
  const viewer = useViewer();
  const workspaceId = viewer?.defaultWorkspaceId;

  if (!workspaceId) {
    return (
      <div className="flex flex-col gap-4 border-b pb-4 lg:flex-row lg:items-center lg:justify-between">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 border-b pb-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-3">
        <TodayButton />
        <DateNavigator view={view} events={events} />
      </div>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex w-full items-center gap-1.5">
          <ButtonGroup>
            <Button asChild aria-label="View by day">
              <Link href={`/workspace/${workspaceId}/calendar/day-view`}>
                <List strokeWidth={1.8} />
              </Link>
            </Button>

            <Button
              asChild
              aria-label="View by week"
              className="hidden md:flex"
            >
              <Link href={`/workspace/${workspaceId}/calendar/week-view`}>
                <Columns strokeWidth={1.8} />
              </Link>
            </Button>

            <Button asChild aria-label="View by month">
              <Link href={`/workspace/${workspaceId}/calendar/month-view`}>
                <Grid2x2 strokeWidth={1.8} />
              </Link>
            </Button>

            {/* <Button asChild aria-label="View by year">
              <Link href={`/workspace/${workspaceId}/calendar/year-view`}>
                <Grid3x3 strokeWidth={1.8} />
              </Link>
            </Button> */}

            {/* <Button asChild aria-label="View by agenda">
              <Link href={`/workspace/${workspaceId}/calendar/agenda-view`}>
                <CalendarRange strokeWidth={1.8} />
              </Link>
            </Button> */}
          </ButtonGroup>

          {/* <UserSelect /> */}
        </div>

        <AddEventDialog>
          <Button
            size="sm"
            className="w-full sm:w-auto bg-primary cursor-pointer"
          >
            <Plus />
            Add Event
          </Button>
        </AddEventDialog>
      </div>
    </div>
  );
}
