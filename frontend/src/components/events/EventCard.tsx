"use client";

import { EventType } from "../../../types/event";
import { addEventToCalendar } from "../../lib/calendar";

type Props = {
  event: EventType;
  onClick?: (event: EventType) => void;
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return {
    weekday: date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
    day: date.getDate(),
    month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
  };
}

export default function EventCard({ event, onClick }: Props) {
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

  const handleAddToCalendar = () => {
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
  };

  const isSingleDay =
    new Date(event.startDate).toDateString() ===
    new Date(event.endDate).toDateString();

  return (
    <div
      className="event-card"
      onClick={() => onClick && onClick(event)}
    >
      <div className="event-date-badge">
        <span className="event-weekday">{weekday}</span>
        <span className="event-day">{day}</span>
        <span className="event-month">{month}</span>
      </div>

      <div className="event-content">
        <h3 className="event-name">{event.title}</h3>

        <div className="event-meta">
          <span className="event-meta-item">
            {event.startTime || "All Day"}
          </span>

          <span className="event-meta-item">
            {event.location || "Location TBA"}
          </span>
        </div>

        <p className="event-description">
          {event.description || "More details coming soon."}
        </p>

        <button
          className="event-rsvp-btn"
          onClick={(e) => {
            e.stopPropagation();
            addEventToCalendar(event);
          }}
        >
          Add to Calendar →
        </button>
      </div>
    </div>
  );
}