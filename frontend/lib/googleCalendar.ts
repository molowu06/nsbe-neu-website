"use client";

import { EventType } from "../types/index";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY;
const CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID;

function mapTypeFromTitle(title: string): EventType["type"] {
  const lowerTitle = (title || "").toLowerCase();

  if (lowerTitle.includes("pci")) return "PCI";
  if (lowerTitle.includes("torch")) return "Torch";
  if (lowerTitle.includes("mixer") || lowerTitle.includes("soiree") || lowerTitle.includes("collab")) return "Big Events";
  if (lowerTitle.includes("conference")) return "Conference";
  if (lowerTitle.includes("aex")) return "AEx";

  return "GBM";
}

function cleanDescription(html: string): string {
  // Replace <br> tags with newlines
  let text = html.replace(/<br\s*\/?>/gi, "\n");
  // Convert anchor tags to just their text/URL
  text = text.replace(/<a\s+href="([^"]*)"[^>]*>[^<]*<\/a>/gi, "$1");
  // Strip any remaining HTML tags
  text = text.replace(/<[^>]+>/g, "");
  // Decode common HTML entities
  text = text.replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"');
  return text.trim();
}

/*
Google returns all-day events as a bare "YYYY-MM-DD" string.
`new Date("2026-03-07")` parses that as UTC midnight, which is the *previous*
evening in Eastern time — so all-day events rendered one day early.
Appending a time with no "Z" makes the browser parse it as local midnight instead.
*/
function allDayToLocal(dateStr: string, endOfDay = false): string {
  return `${dateStr}T${endOfDay ? "23:59:59" : "00:00:00"}`;
}

/*
Google's all-day `end.date` is EXCLUSIVE: a one-day event on the 16th comes back
as end.date = the 17th. Roll it back a day so the event doesn't bleed into the
following cell on the calendar grid.
*/
function exclusiveEndToInclusive(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d - 1);

  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/*
Only hide the club's internal DOT working sessions — i.e. events whose title
*starts* with "DOT". A plain substring match also swallowed real GBMs like
"GBM 1: BESS 101 + DOT", which is why they never appeared on the calendar.
*/
function isInternalDotEvent(title: string): boolean {
  return /^\s*dot\b/i.test(title || "");
}

/*
The API returns at most 250 events per page by default and pages the rest behind
a nextPageToken, which the previous version silently dropped. Walk every page so
the calendar keeps working as the club adds more events.
*/
async function fetchAllPages(): Promise<any[]> {
  const items: any[] = [];
  let pageToken: string | undefined;

  do {
    const url = new URL(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        CALENDAR_ID || ""
      )}/events`
    );
    url.searchParams.set("key", API_KEY || "");
    url.searchParams.set("singleEvents", "true"); // expand recurring events
    url.searchParams.set("orderBy", "startTime");
    url.searchParams.set("maxResults", "2500");
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const res = await fetch(url.toString());
    if (!res.ok) {
      throw new Error(
        `Google Calendar API error ${res.status}: ${await res.text()}`
      );
    }

    const data = await res.json();
    if (data.items) items.push(...data.items);
    pageToken = data.nextPageToken;
  } while (pageToken);

  return items;
}

export async function fetchGoogleEvents(): Promise<EventType[]> {
  const allItems = await fetchAllPages();

  const filteredItems = allItems.filter(
    (event: any) =>
      event.status !== "cancelled" && !isInternalDotEvent(event.summary)
  );

  return filteredItems.map((event: any) => {
    const isAllDay = !!event.start.date;

    const start = isAllDay
      ? allDayToLocal(event.start.date)
      : event.start.dateTime;

    const end = isAllDay
      ? allDayToLocal(exclusiveEndToInclusive(event.end.date), true)
      : event.end.dateTime;

    const startObj = new Date(start);
    const endObj = new Date(end);

    return {
      id: event.id,
      title: event.summary || "Untitled Event",
      type: mapTypeFromTitle(event.summary || ""),
      startDate: start,
      endDate: end, // store end date
      displayDate: startObj.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: isAllDay
        ? "All Day"
        : `${startObj.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})} - ${endObj.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}`,
      startTime: isAllDay
        ? "All Day"
        : startObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"}),
      location: event.location || "TBA",
      description: event.description
        ? cleanDescription(event.description)
        : "More details coming soon.",
      link: event.htmlLink,
    };
  });
}