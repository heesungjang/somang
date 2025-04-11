import {
  CALENDAR_ITENS_MOCK,
  USERS_MOCK,
} from "@/components/app-calendar/calendar/mocks";

export const getEvents = async () => {
  // Increase the delay to better see the loading state
  await new Promise((resolve) => setTimeout(resolve, 100));
  return CALENDAR_ITENS_MOCK;
};

export const getUsers = async () => {
  // Increase the delay to better see the loading state
  await new Promise((resolve) => setTimeout(resolve, 100));
  return USERS_MOCK;
};
