import { useMemo } from "react";
import { isToday, startOfDay } from "date-fns";

import { EventBullet } from "@/components/app-calendar/calendar/components/month-view/event-bullet";
import { MonthEventBadge } from "@/components/app-calendar/calendar/components/month-view/month-event-badge";

import { getMonthCellEvents } from "@/components/app-calendar/calendar/helpers";

import type {
  ICalendarCell,
  IEvent,
} from "@/components/app-calendar/calendar/interfaces";
import { cn } from "@/lib/utils";

interface IProps {
  cell: ICalendarCell;
  events: IEvent[];
  eventPositions: Record<string, number>;
}

const MAX_VISIBLE_EVENTS = 3;

export function DayCell({ cell, events, eventPositions }: IProps) {
  const { day, currentMonth, date } = cell;

  const cellEvents = useMemo(
    () => getMonthCellEvents(date, events, eventPositions),
    [date, events, eventPositions],
  );
  const isSunday = date.getDay() === 0;

  return (
    <div
      className={cn(
        "flex flex-col gap-1 border-l border-t py-1.5 lg:py-2",
        isSunday && "border-l-0",
      )}
    >
      <span
        className={cn(
          "h-6 px-1 text-xs font-semibold lg:px-2",
          !currentMonth && "opacity-20",
          isToday(date) &&
            "flex w-6 translate-x-1 items-center justify-center rounded-full bg-primary-600 px-0 font-bold text-white",
        )}
      >
        {day}
      </span>

      <div
        className={cn(
          "flex h-6 gap-1 px-2 lg:h-[94px] lg:flex-col lg:gap-2 lg:px-0",
          !currentMonth && "opacity-50",
        )}
      >
        {[0, 1, 2].map((position) => {
          const event = cellEvents.find((e) => e.position === position);
          const eventKey = event
            ? `event-${event.id}-${position}`
            : `empty-${position}`;

          return (
            <div key={eventKey} className="lg:flex-1">
              {event && (
                <>
                  <EventBullet className="lg:hidden" color={event.color} />
                  <MonthEventBadge
                    className="hidden lg:flex"
                    event={event}
                    cellDate={startOfDay(date)}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>

      {cellEvents.length > MAX_VISIBLE_EVENTS && (
        <p
          className={cn(
            "h-4.5 px-1.5 text-xs font-semibold text-t-quaternary",
            !currentMonth && "opacity-50",
          )}
        >
          <span className="sm:hidden">
            +{cellEvents.length - MAX_VISIBLE_EVENTS}
          </span>
          <span className="hidden sm:inline">
            {" "}
            {cellEvents.length - MAX_VISIBLE_EVENTS} more...
          </span>
        </p>
      )}
    </div>
  );
}
