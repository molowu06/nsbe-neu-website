"use client";

import { EventType } from "../../../types/event";
import { addEventToCalendar } from "../../lib/calendar";
import styles from "../../../styles/event.module.css";



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
      className={styles["event-card"]}
      onClick={() => onClick && onClick(event)}
    >
      <div className={styles["event-date-badge"]}>
        <span className={styles["event-weekday"]}>{weekday}</span>
        <span className={styles["event-day"]}>{day}</span>
        <span className={styles["event-month"]}>{month}</span>
      </div>

      <div className={styles["event-content"]}>
        <h3 className={styles["event-name"]}>{event.title}</h3>

        <div className={styles["event-meta"]}>
          <span className={styles["event-meta-item"]}>
            {event.startTime || "All Day"}
          </span>

          <span className={styles["event-meta-item"]}>
            {event.location || "Location TBA"}
          </span>
        </div>

        <p className={styles["event-description"]}>
          {event.description || "More details coming soon."}
        </p>

        <button
          className={styles["event-rsvp-btn"]}
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