// /src/components/events/EventUtils.ts

import { EventType } from "../../../../types/index";

/*
Formats a date into "Month Year"
Example: April 2026
Used in calendar header
*/
export const formatMonthYear = (date: Date) =>
  date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

/*
Formats a date string into pieces for the event card badge:
- weekday → MON
- day → 12
- month → APR

Used in:
- EventCard
- UpcomingEvents
*/
export function formatDate(dateStr: string) {
  const date = new Date(dateStr);

  return {
    weekday: date
      .toLocaleDateString("en-US", { weekday: "short" })
      .toUpperCase(),
    day: date.getDate(),
    month: date
      .toLocaleDateString("en-US", { month: "short" })
      .toUpperCase(),
  };
}

/*
Returns:
- daysInMonth → number of days (28–31)
- startingDayOfWeek → which day the month starts on (0 = Sunday)

Used to build the calendar grid correctly
*/
export const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  // First day of the month
  const firstDay = new Date(year, month, 1);

  // Last day of the month
  const lastDay = new Date(year, month + 1, 0);

  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  return { daysInMonth, startingDayOfWeek };
};

/*
Returns all events that occur on a specific date

Important:
- Supports multi-day events (start → end range)
- Ignores invalid dates
- Compares only YEAR/MONTH/DAY (not time)

Used in:
- EventCalendar to populate each day cell
*/
export function getEventsForDate(date: Date, events: EventType[]) {
  return events.filter((event) => {
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);

    // Skip events with invalid dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return false;

    /*
    Normalize all dates to remove time component
    This ensures accurate day-by-day comparison
    */
    const current = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const eventStart = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate()
    );

    const eventEnd = new Date(
      end.getFullYear(),
      end.getMonth(),
      end.getDate()
    );

    /*
    Check if current date falls within event range
    (handles single-day + multi-day events)
    */
    return current >= eventStart && current <= eventEnd;
  });
}

/*
Returns the start of the week (Sunday)

Used for:
- "This Week" filtering in Events.tsx

Important:
- Resets time to midnight for accurate comparisons
*/
export function getStartOfWeek(date: Date) {
  const d = new Date(date);
  const day = d.getDay(); // Sunday = 0
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

/*
Formats a week range string

Example:
Apr 7 - Apr 13, 2026

Used in:
- list view header in Events.tsx
*/
export function formatWeekRange(startDate: Date) {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);

  const startMonth = startDate.toLocaleDateString("en-US", { month: "short" });
  const startDay = startDate.getDate();

  const endMonth = endDate.toLocaleDateString("en-US", { month: "short" });
  const endDay = endDate.getDate();

  const year = endDate.getFullYear();

  return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
}