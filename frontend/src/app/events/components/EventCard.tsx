"use client";

import { EventType } from "../../../../types/index";
import { addEventToCalendar } from "../../../../lib/calendar";
import styles from "../styles/event.module.css";
import { formatDate } from "./EventUtils";


/*
Props:
- event: the event data to display
- onClick: optional function (used to open popup when card is clicked)
*/
type Props = {
  event: EventType;
  onClick?: (event: EventType) => void;
};


export default function EventCard({ event, onClick }: Props) {
  
  const { weekday, day, month } = formatDate(event.startDate);

  return (
    <div
      className={styles["event-card"]}
      onClick={() => onClick && onClick(event)}
    >
      {/* ===== DATE BADGE (left side) ===== */}
      <div className={styles["event-date-badge"]}>
        <span className={styles["event-weekday"]}>{weekday}</span>
        <span className={styles["event-day"]}>{day}</span>
        <span className={styles["event-month"]}>{month}</span>
      </div>

      {/* ===== MAIN EVENT CONTENT ===== */}
      <div className={styles["event-content"]}>

        {/* Title + Event Type */}
        <div className={styles["event-title-row"]}>
          <h3 className={styles["event-name"]}>{event.title}</h3>

          {/* Event type badge (GBM, PCI, etc.) */}
          {event.type && (
            <span
              className={`${styles["event-type-badge"]} ${
                styles[`event-${event.type.toLowerCase().replace(" ", "-")}`]
              }`}
            >
              {event.type}
            </span>
          )}
        </div>

        {/* ----- META INFO (time + location) ----- */}
        <div className={styles["event-meta"]}>
          {/* Time */}
          <span className={styles["event-meta-item"]}>
            {event.startTime || "All Day"}
          </span>

          {/* Location */}
          <span className={styles["event-meta-item"]}>
            {event.location || "Location TBA"}
          </span>
        </div>

        {/* ----- DESCRIPTION ----- */}
        <p className={styles["event-description"]}>
          {event.description || "More details coming soon."}
        </p>

        {/* ----- ADD TO CALENDAR BUTTON ----- */}
        <button
          className={styles["event-add-btn"]}
          onClick={(e) => {
            e.stopPropagation();
            addEventToCalendar(event);
          }}
        >
          Add to Calendar
        </button>
      </div>
    </div>
  );
}