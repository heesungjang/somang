import { cva } from "class-variance-authority";
import { format, differenceInMinutes, parseISO } from "date-fns";

import { useCalendar } from "@/components/app-calendar/calendar/contexts/calendar-context";

import { EventDetailsDialog } from "@/components/app-calendar/calendar/components/dialogs/event-details-dialog";

import { cn } from "@/lib/utils";

import type { HTMLAttributes } from "react";
import type { IEvent } from "@/components/app-calendar/calendar/interfaces";
import type { VariantProps } from "class-variance-authority";

const calendarWeekEventCardVariants = cva(
  "flex select-none flex-col gap-0.5 truncate whitespace-nowrap rounded-md border px-2 py-1.5 text-xs focus-visible:outline-offset-2",
  {
    variants: {
      color: {
        // Colored and mixed variants
        blue: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300 [&_.event-dot]:fill-blue-600",
        green:
          "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300 [&_.event-dot]:fill-green-600",
        red: "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300 [&_.event-dot]:fill-red-600",
        yellow:
          "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300 [&_.event-dot]:fill-yellow-600",
        purple:
          "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300 [&_.event-dot]:fill-purple-600",
        orange:
          "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300 [&_.event-dot]:fill-orange-600",

        // Dot variants
        "blue-dot":
          "border-b-primary bg-bg-secondary text-t-primary [&_.event-dot]:fill-blue-600",
        "green-dot":
          "border-b-primary bg-bg-secondary text-t-primary [&_.event-dot]:fill-green-600",
        "red-dot":
          "border-b-primary bg-bg-secondary text-t-primary [&_.event-dot]:fill-red-600",
        "orange-dot":
          "border-b-primary bg-bg-secondary text-t-primary [&_.event-dot]:fill-orange-600",
        "purple-dot":
          "border-b-primary bg-bg-secondary text-t-primary [&_.event-dot]:fill-purple-600",
        "yellow-dot":
          "border-b-primary bg-bg-secondary text-t-primary [&_.event-dot]:fill-yellow-600",
      },
    },
    defaultVariants: {
      color: "blue-dot",
    },
  },
);

interface IProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof calendarWeekEventCardVariants>, "color"> {
  event: IEvent;
}

export function EventBlock({ event, className }: IProps) {
  const { badgeVariant } = useCalendar();

  const start = parseISO(event.startDate);
  const end = parseISO(event.endDate);
  const durationInMinutes = differenceInMinutes(end, start);
  const heightInPixels = (durationInMinutes / 60) * 96 - 8;

  const color = (
    badgeVariant === "dot" ? `${event.color}-dot` : event.color
  ) as VariantProps<typeof calendarWeekEventCardVariants>["color"];

  const calendarWeekEventCardClasses = cn(
    calendarWeekEventCardVariants({ color, className }),
    durationInMinutes < 35 && "py-0 justify-center",
  );

  return (
    <EventDetailsDialog event={event}>
      <div
        role="button"
        tabIndex={0}
        className={calendarWeekEventCardClasses}
        style={{ height: `${heightInPixels}px` }}
      >
        <div className="flex items-center gap-1.5 truncate">
          {["mixed", "dot"].includes(badgeVariant) && (
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              className="event-dot shrink-0"
            >
              <circle cx="4" cy="4" r="4" />
            </svg>
          )}

          <p className="truncate font-semibold">{event.title}</p>
        </div>

        {durationInMinutes > 25 && (
          <p>
            {format(start, "h:mm a")} - {format(end, "h:mm a")}
          </p>
        )}
      </div>
    </EventDetailsDialog>
  );
}
