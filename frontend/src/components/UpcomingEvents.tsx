"use client";

import { useEffect, useState } from "react";
import { fetchGoogleEvents } from "@/lib/googleCalendar";
import { EventType } from "../../types/event";
import { addEventToCalendar } from "../lib/calendar";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return {
    weekday: date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
    day: date.getDate(),
    month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
  };
}

export default function EventsSection() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await fetchGoogleEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to load events:", error);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events
    .filter((event) => new Date(event.startDate) >= today)
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )
    .slice(0, 3);

  return (
    <section className="events-section">
      <h2 className="events-heading">UPCOMING EVENTS</h2>

      {loading ? (
        <p>Loading events...</p>
      ) : upcomingEvents.length === 0 ? (
        <p>No upcoming events right now.</p>
      ) : (
        <div className="events-grid">
          {upcomingEvents.map((event) => {
            const { weekday, day, month } = formatDate(event.startDate);


            return (
              <div key={event.id} className="event-card">
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
          })}
        </div>
      )}
    </section>
  );
}