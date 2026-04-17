"use client";

import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { EventType } from "../../../../types/index";
import { getDaysInMonth, getEventsForDate, formatMonthYear } from "./EventUtils";
import styles from "../styles/event.module.css";

/*
Props:
- events: full list of events to display on the calendar
- onSelectEvent: function passed from parent to handle when a user clicks an event
*/
type Props = {
  events: EventType[];
  onSelectEvent: (event: EventType) => void;
};

/*
Maps each event type to a CSS class for styling.
This controls the color of event blocks in the calendar.
*/
const typeClassMap: Record<string, string> = {
  GBM: styles["event-gbm"],
  AEx: styles["event-aex"],
  PCI: styles["event-pci"],
  Torch: styles["event-torch"],
  "Big Events": styles["event-big-events"],
  Conference: styles["event-conference"],
};

export default function EventCalendar({ events, onSelectEvent }: Props) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  
  const goToPreviousMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  
  const goToNextMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  
  const goToToday = () => {
    const now = new Date();
    setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));
  };

  return (
    <div className={styles["calendar-container"]}>

      {/* ===== NAVIGATION BAR (month + controls) ===== */}
      <div className={styles["calendar-nav"]}>
        <button onClick={goToPreviousMonth}>
          <ChevronLeft size={25} /> Back
        </button>

        {/* Displays current month + year (e.g. April 2026) */}
        <h3 className={styles["calendar-month"]}>
          {formatMonthYear(currentMonth)}
        </h3>

        <div className="flex items-center gap-2">
          {/* Jump back to current month */}
          <button onClick={goToToday} className="text-lg font-medium px-3 py-1">
            Today
          </button>

          <button onClick={goToNextMonth}>
            Next <ChevronRight size={25} />
          </button>
        </div>
      </div>

      {/* ===== CALENDAR GRID ===== */}
      <div className={styles["calendar-grid"]}>

        {/* Weekday labels (top row) */}
        <div className={styles["weekdays"]}>
          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
            (day) => (
              <div key={day} className={styles["weekday"]}>
                {day}
              </div>
            )
          )}
        </div>

        {/* ===== DAYS GRID ===== */}
        <div className="grid grid-cols-7 gap-[3px] sm:gap-2">

          {/* Empty boxes before the first day (to align start day correctly) */}
          {Array.from({ length: startingDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className={styles["calendar-day"]} />
          ))}

          {/* Loop through each day of the month */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;

            // Create full date object for this specific day
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
                {/* Day number (1–31) */}
                <div className={styles["calendar-day-number"]}>{day}</div>

                {/* Events for this day */}
                <div className="space-y-1 overflow-hidden">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      onClick={() => onSelectEvent(event)}
                      className={`${styles["day-event"]} ${typeClassMap[event.type]}`}
                    >
                      {/* Event title */}
                      <div className={styles["day-event-title"]}>
                        {event.title}
                      </div>

                      {/* Event time */}
                      <div className={styles["day-event-info"]}>
                        <Clock size={12} /> {event.time}
                      </div>

                      {/* Event location */}
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