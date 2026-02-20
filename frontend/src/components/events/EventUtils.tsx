// /src/components/events/EventUtils.ts
import { EventType } from "../../../types/event";

export const formatMonthYear = (date: Date) =>
  date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

export const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  return { daysInMonth, startingDayOfWeek };
};

export function getEventsForDate(date: Date, events: EventType[]) {
  return events.filter((event) => {
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return false; // skip invalid dates

    // Compare only the date part (ignore time)
    const current = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const eventStart = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const eventEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate());

    return current >= eventStart && current <= eventEnd;
  });
}