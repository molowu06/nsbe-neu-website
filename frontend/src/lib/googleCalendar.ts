"use client";

import { EventType } from "../../types/event";

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

export async function fetchGoogleEvents(): Promise<EventType[]> {
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&singleEvents=true&orderBy=startTime`
  );

  const data = await res.json();
  if (!data.items) return [];

  // ✅ Filter out events containing "DOT" (case-insensitive)
  const filteredItems = data.items.filter(
    (event: any) => !(event.summary || "").toLowerCase().includes("dot")
  );

  return filteredItems.map((event: any, index: number) => {
    const isAllDay = !!event.start.date;
    const start = event.start.dateTime || event.start.date;
    const end = event.end.dateTime || event.end.date;

    const startObj = new Date(start);
    const endObj = new Date(end);

    return {
      id: index,
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