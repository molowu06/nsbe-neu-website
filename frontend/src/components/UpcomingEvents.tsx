"use client";

import { useEffect, useState } from "react";
import { formatDate } from "../app/events/components/EventUtils";
import { fetchGoogleEvents } from "../../lib/googleCalendar";
import { EventType } from "../../types/index";
import { addEventToCalendar } from "../../lib/calendar";


export default function UpcomingEvents() {
  /*
  Stores all events fetched from Google Calendar
  */
  const [events, setEvents] = useState<EventType[]>([]);

  /*
  Loading state while events are being fetched
  */
  const [loading, setLoading] = useState(true);

  /*
  Fetch events once when component mounts
  */
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

  /*
  Get today's date and reset time to midnight
  This makes date comparison cleaner when filtering upcoming events
  */
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  /*
  Create a list of the next 3 upcoming events:
  1. Keep only events today or later
  2. Sort by soonest date first
  3. Take only the first 3
  */
  const upcomingEvents = events
    .filter((event) => new Date(event.startDate) >= today)
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )
    .slice(0, 3);

  return (
    <section className="events-section">
      {/* Section title */}
      <h2 className="events-heading">UPCOMING EVENTS</h2>

      {/* Loading state */}
      {loading ? (
        <p>Loading events...</p>

      ) : upcomingEvents.length === 0 ? (
        /* Empty state */
        <p>No upcoming events right now.</p>

      ) : (
        /* Event cards grid */
        <div className="events-grid">
          {upcomingEvents.map((event) => {
            /*
            Format event start date for the left-side badge
            */
            const { weekday, day, month } = formatDate(event.startDate);

            return (
              <div key={event.id} className="event-card">
                {/* ===== DATE BADGE ===== */}
                <div className="event-date-badge">
                  <span className="event-weekday">{weekday}</span>
                  <span className="event-day">{day}</span>
                  <span className="event-month">{month}</span>
                </div>

                {/* ===== EVENT CONTENT ===== */}
                <div className="event-content">
                  {/* Event title */}
                  <h3 className="event-name">{event.title}</h3>

                  {/* Time + location */}
                  <div className="event-meta">
                    <span className="event-meta-item">
                      {event.startTime || "All Day"}
                    </span>

                    <span className="event-meta-item">
                      {event.location || "Location TBA"}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="event-description">
                    {event.description || "More details coming soon."}
                  </p>

                  {/* Add event to user's calendar */}
                  <button
                    className="event-rsvp-btn"
                    onClick={(e) => {
                      /*
                      Prevents card click behavior from triggering
                      Only runs calendar action
                      */
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