import { CalendarProvider } from "@/components/app-calendar/calendar/contexts/calendar-context";

import { ChangeBadgeVariantInput } from "@/components/app-calendar/calendar/components/change-badge-variant-input";

import {
  getEvents,
  getUsers,
} from "@/components/app-calendar/calendar/requests";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [events, users] = await Promise.all([getEvents(), getUsers()]);

  return (
    <CalendarProvider users={users} events={events}>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 px-8 py-4">
        {children}
        <ChangeBadgeVariantInput />
      </div>
    </CalendarProvider>
  );
}
