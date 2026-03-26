"use client";

import { Clock, MapPin } from "lucide-react";
import { EventType } from "../../../types/event";
import styles from "../../../styles/event.module.css";

type Props = {
  event: EventType;
  onClick?: (event: EventType) => void;
};

export default function EventCard({ event, onClick }: Props) {
  const handleAddToCalendar = () => {
    alert(`Add "${event.title}" to your calendar`);
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