// lib/addToCalendar.ts
import { EventType } from "../../types/event";

const formatICSDate = (dateString: string) => {
  const date = new Date(dateString);

  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
};

const escapeICS = (text: string) => {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
};

export function addEventToCalendar(event: EventType) {
  const start = formatICSDate(event.startDate);
  const end = formatICSDate(event.endDate);

  const title = escapeICS(event.title || "Event");
  const description = escapeICS(event.description || "");
  const location = escapeICS(event.location || "");
  const uid = `${event.id || Date.now()}@yourwebsite.com`;
  const stamp = formatICSDate(new Date().toISOString());

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "PRODID:-//Your Organization//Events Calendar//EN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${(event.title || "event")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}.ics`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
}