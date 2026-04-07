"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, DollarSign } from "lucide-react";
import { fetchGoogleEvents } from "@/lib/googleCalendar";
import { EventType } from "../../../types/event";
import EventCalendar from "./EventCalendar";
import EventCard from "./EventCard";
import EventFilters from "./EventFilters";
import EventPopUp from "./EventPopUp";

export default function Events() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const filters = ["All", "GBM", "Big Events", "PCI", "Torch", "Conference"];

  // Calendar (past + future events)
  const calendarEvents = events.filter((event) => true);

  // List view (only upcoming events)
const today = new Date();
today.setHours(0, 0, 0, 0);

const listEvents = events
  .filter((event) => new Date(event.startDate) >= today)
  .sort(
    (a, b) =>
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  )
  .slice(0, 8);

  // Fetch Google Calendar events
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

  // Apply filters
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


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gray-900 text-white py-4 px-4 sm:px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-2 md:gap-8">
          {/* logo — left */}
          <img
            src="/images/bess-logo.png"
            alt="BESS Logo"
            className="w-32 sm:w-36 md:w-48 object-contain flex-shrink-0 mb-1 md:mb-0 transition-transform duration-300 shadow-md hover:-translate-y-1 hover:shadow-lg"
          />
          {/* text — right */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Events
            </h1>
            <p className="text-base sm:text-lg text-gray-300">
              Stay connected with our community through workshops, meetings, and
              social events
            </p>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="py-8 bg-gradient-to-br from-amber-50 to-amber-100 border-y-4 border-[#D4AF37]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex-shrink-0 p-3 sm:p-4 bg-[#D4AF37] rounded-xl flex items-center justify-center">
              <Calendar size={28} className="text-[#000000]" />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#000000] mb-1">
                Soiree Black
              </h2>
              <p className="text-gray-700 text-sm sm:text-base mb-3">
              Celebrate with us to honor the achievements, leadership, and impact of our members and supporters
              </p>

              <div className="flex flex-wrap gap-4 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <Calendar className="text-[#D4AF37]" size={16} />
                  <span>Sunday, April 12th | 6:00 - 9:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-[#D4AF37]" size={16} />
                  <span>Cabral Center</span>
                </div>
              
              </div>
            </div>

            <div className="flex-shrink-0 self-center sm:self-start">
              <button className="bg-[green] text-[#ffffff] px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-[#C19B2E] transition-colors">
                RSVP
              </button>
            </div>
          </div>
        </div>
      </section>

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

      <p className="text-center text-sm text-gray-500 mb-2">
        Click on an event to see its full details
      </p>

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
                event={event}
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

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventPopUp
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}