import { isToday } from "date-fns";
import { useRouter } from "next/navigation";

import { useCalendar } from "@/components/app-calendar/calendar/contexts/calendar-context";

import { cn } from "@/lib/utils";

import type { IEvent } from "@/components/app-calendar/calendar/interfaces";

interface IProps {
  day: number;
  date: Date;
  events: IEvent[];
}

export function YearViewDayCell({ day, date, events }: IProps) {
  const { push } = useRouter();
  const { setSelectedDate } = useCalendar();

  const maxIndicators = 3;
  const eventCount = events.length;

  const handleClick = () => {
    setSelectedDate(date);
    push("/day-view");
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="flex h-11 flex-1 flex-col items-center justify-start gap-0.5 rounded-md pt-1 hover:bg-bg-primary-hover"
    >
      <div
        className={cn(
          "flex size-6 items-center justify-center rounded-full text-xs font-medium",
          isToday(date) && "bg-primary-600 font-semibold text-white",
        )}
      >
        {day}
      </div>

      {eventCount > 0 && (
        <div className="mt-0.5 flex gap-0.5">
          {eventCount <= maxIndicators ? (
            events.map((event) => (
              <div
                key={event.id}
                className={cn(
                  "size-1.5 rounded-full",
                  event.color === "blue" && "bg-blue-600",
                  event.color === "green" && "bg-green-600",
                  event.color === "red" && "bg-red-600",
                  event.color === "yellow" && "bg-yellow-600",
                  event.color === "purple" && "bg-purple-600",
                  event.color === "orange" && "bg-orange-600",
                )}
              />
            ))
          ) : (
            <>
              <div className="size-1.5 rounded-full bg-primary-600" />
              <span className="text-[7px] text-t-tertiary">
                +{eventCount - 1}
              </span>
            </>
          )}
        </div>
      )}
    </button>
  );
}
