"use client";

import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { EventType } from "../../../types/event";
import { getDaysInMonth, getEventsForDate, formatMonthYear } from "./EventUtils";
import styles from "../../../styles/event.module.css";

type Props = {
  events: EventType[];
  onSelectEvent: (event: EventType) => void;
};

// Map event types to CSS classes
const typeClassMap: Record<string, string> = {
  GBM: styles["event-gbm"],
  PCI: styles["event-pci"],
  Torch: styles["event-torch"],
  "Big Events": styles["event-big-events"],
  Conference: styles["event-conference"],
};

export default function EventCalendar({ events, onSelectEvent }: Props) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  // Navigation functions
  const goToPreviousMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const goToNextMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const goToToday = () => {
    const now = new Date();
    setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));
  };

  // Get today’s date once
  const today = new Date();

  return (
    <div className={styles["calendar-container"]}>
      {/* Navigation */}
      <div className={styles["calendar-nav"]}>
        <button onClick={goToPreviousMonth}>
          <ChevronLeft size={20} /> Back
        </button>
        <h3 className={styles["calendar-month"]}>{formatMonthYear(currentMonth)}</h3>
        <div className="flex items-center gap-2">
          <button onClick={goToToday}>Today</button>
          <button onClick={goToNextMonth}>
            Next <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className={styles["calendar-grid"]}>
        {/* Weekdays */}
        <div className={styles["weekdays"]}>
          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
            (day) => (
              <div key={day} className={styles["weekday"]}>
                {day}
              </div>
            )
          )}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: startingDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className={styles["calendar-day"]} />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const currentDate = new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth(),
              day
            );

            const dayEvents = getEventsForDate(currentDate, events);
            const hasEvents = dayEvents.length > 0;

            const isToday =
              today.getFullYear() === currentDate.getFullYear() &&
              today.getMonth() === currentDate.getMonth() &&
              today.getDate() === currentDate.getDate();

            return (
              <div
                key={day}
                className={`${styles["calendar-day"]} 
                            ${hasEvents ? styles["has-events"] : ""} 
                            ${isToday ? styles["today"] : ""}`}
              >
                <div className="font-bold text-lg text-gray-700 mb-2">{day}</div>

                <div className="space-y-1 overflow-hidden">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => onSelectEvent(event)}
                      className={`${styles["day-event"]} ${typeClassMap[event.type]}`}
                    >
                      <div className={styles["day-event-title"]}>{event.title}</div>
                      <div className={styles["day-event-info"]}>
                        <Clock size={12} /> {event.time}
                      </div>
                      <div className={styles["day-event-info"]}>
                        <MapPin size={12} /> {event.location}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}