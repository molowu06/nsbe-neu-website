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
  const { weekday, day, month } = formatDate(event.startDate);

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