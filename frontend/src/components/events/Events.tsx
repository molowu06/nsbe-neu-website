"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, DollarSign } from "lucide-react";
import { fetchGoogleEvents } from "@/lib/googleCalendar";
import { EventType } from "../../../types/event";
import EventCalendar from "./EventCalendar";
import EventCard from "./EventCard";
import EventFilters from "./EventFilters";

export default function Events() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [, setSelectedEvent] = useState<EventType | null>(null);

  const filters = ["All", "GBM", "Big Events", "PCI", "Torch", "Conference"];

  // ===========================
  // Calendar: show all events (past + future)
  // ===========================
  const calendarEvents = events.filter((event) => true);

  // ===========================
  // List view: show only upcoming events, one card per event
  // ===========================
  const now = new Date();
  const listEvents = events.filter(
    (event) => new Date(event.startDate) >= now
  );

  // ===========================
  // Fetch Google Calendar events
  // ===========================
  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await fetchGoogleEvents();
        console.log(
          "Mapped events:",
          data.map((e) => ({ title: e.title, type: e.type }))
        );
        setEvents(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  // ===========================
  // Apply filters
  // ===========================
  const filteredCalendarEvents =
    selectedFilter === "All"
      ? calendarEvents
      : calendarEvents.filter(
          (event) =>
            event.type.trim().toLowerCase() ===
            selectedFilter.trim().toLowerCase()
        );

  const filteredListEvents =
    selectedFilter === "All"
      ? listEvents
      : listEvents.filter(
          (event) =>
            event.type.trim().toLowerCase() ===
            selectedFilter.trim().toLowerCase()
        );

  // ===========================
  // Render
  // ===========================
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Filters */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <EventFilters
          filters={filters}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          viewMode={viewMode}
          onViewChange={setViewMode}
        />
      </div>

      {/* Calendar / List */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {loading ? (
          <p className="text-center py-12 text-gray-600">Loading events...</p>
        ) : viewMode === "calendar" ? (
          <EventCalendar
            events={filteredCalendarEvents}
            onSelectEvent={setSelectedEvent}
          />
        ) : filteredListEvents.length > 0 ? (
          <div className="space-y-4">
            {filteredListEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}         // single event
                onClick={setSelectedEvent}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 py-12 bg-white rounded-lg">
            No events found for the selected filter.
          </p>
        )}
      </div>
    </div>
  );
}