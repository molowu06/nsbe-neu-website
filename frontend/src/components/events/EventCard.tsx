"use client";

import { Clock, MapPin } from "lucide-react";
import { EventType } from "../../../types/event";
import styles from "../../../styles/event.module.css";

type Props = {
  event: EventType;
  onClick?: (event: EventType) => void;
};

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
      className={styles["event-list-card"]}
      onClick={() => onClick && onClick(event)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className={styles["event-list-title"]}>{event.title}</h4>

          <div className={styles["event-list-time"]}>
            <Clock size={16} className={styles["event-icon"]} />{" "}
            {isSingleDay
              ? `${new Date(event.startDate).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })} – ${event.time}`
              : `${new Date(event.startDate).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })} – ${new Date(event.endDate).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}`}
          </div>

          <div className={styles["event-list-location"]}>
            <MapPin size={16} className={styles["event-icon"]} /> {event.location}
          </div>
        </div>

        <div className={styles["event-list-actions"]}>
          <button
            className={styles["add-to-calendar-btn"]}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCalendar();
            }}
          >
            Add to Calendar
          </button>
        </div>
      </div>
    </div>
  );
}