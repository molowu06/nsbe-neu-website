"use client";

import { useState, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { fetchGoogleEvents } from "@/lib/googleCalendar";
import { EventType } from "../../../types/event";
import EventCalendar from "./EventCalendar";
import EventCard from "./EventCard";
import EventFilters from "./EventFilters";
import EventPopUp from "./EventPopUp";
import styles from "../../../styles/event.module.css";

function getStartOfWeek(date: Date) {
  const d = new Date(date);
  const day = d.getDay(); // Sunday = 0
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatMonthYear(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function formatWeekRange(startDate: Date) {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);

  const startMonth = startDate.toLocaleDateString("en-US", { month: "short" });
  const startDay = startDate.getDate();
  const endMonth = endDate.toLocaleDateString("en-US", { month: "short" });
  const endDay = endDate.getDate();
  const year = endDate.getFullYear();

  return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
}

export default function Events() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [listRangeMode, setListRangeMode] = useState<"month" | "week">("month");
  const [currentWeekStart, setCurrentWeekStart] = useState(
    getStartOfWeek(new Date())
  );

  const filters = [
    "All",
    "GBM",
    "PCI",
    "Torch",
    "AEx",
    "Big Events",
    "Conference",
  ];

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

  const goToPreviousMonth = () => {
    setListRangeMode("month");
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setListRangeMode("month");
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const goToThisWeek = () => {
    if (listRangeMode === "week") {
      // toggle OFF → go back to month view
      setListRangeMode("month");
    } else {
      // toggle ON → switch to this week
      const now = new Date();
      setListRangeMode("week");
      setCurrentWeekStart(getStartOfWeek(now));
      setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    }
  };

  const calendarEvents = events;

  const listEvents = events
    .filter((event) => {
      const eventDate = new Date(event.startDate);

      if (listRangeMode === "week") {
        const weekEnd = new Date(currentWeekStart);
        weekEnd.setDate(weekEnd.getDate() + 7);
        return eventDate >= currentWeekStart && eventDate < weekEnd;
      }

      return (
        eventDate.getFullYear() === currentMonth.getFullYear() &&
        eventDate.getMonth() === currentMonth.getMonth()
      );
    })
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

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
      <section className="bg-gray-900 text-white py-4 px-4 sm:px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-2 md:gap-8">
          <img
            src="/images/bess-logo.png"
            alt="BESS Logo"
            className="w-32 sm:w-36 md:w-48 object-contain flex-shrink-0 mb-1 md:mb-0 transition-transform duration-300 shadow-md hover:-translate-y-1 hover:shadow-lg"
          />
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
              <button className="bg-[#1f2b46] text-[#ffffff] px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-[#C19B2E] transition-colors">
                Invite Only
              </button>
            </div>
          </div>
        </div>
      </section>

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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {loading ? (
          <p className="text-center py-12 text-gray-600">Loading events...</p>
        ) : viewMode === "calendar" ? (
          <EventCalendar
            events={filteredCalendarEvents}
            onSelectEvent={setSelectedEvent}
          />
        ) : (
          <div className="space-y-6">
            <div className={styles["calendar-nav"]}>
              <button
                onClick={goToPreviousMonth}
                className={styles["prev-btn"]}
              >
                <ChevronLeft size={25} /> Back
              </button>

              <h3 className={styles["calendar-month"]}>
                {listRangeMode === "week"
                  ? formatWeekRange(currentWeekStart)
                  : formatMonthYear(currentMonth)}
              </h3>

              <div className={styles["button-group"]}>
                <button
                  onClick={goToThisWeek}
                  className={
                    listRangeMode === "week"
                      ? styles["today-btn"]   // gold when active
                      : styles["filter-btn"]  // neutral when inactive
                  }
                >
                  This Week
                </button>

                <button
                  onClick={goToNextMonth}
                  className={styles["next-btn"]}
                >
                  Next <ChevronRight size={25} />
                </button>
              </div>
            </div>

            {filteredListEvents.length > 0 ? (
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
                {listRangeMode === "week"
                  ? "No events found for this week."
                  : "No events found for this month."}
              </p>
            )}
          </div>
        )}
      </div>

      {selectedEvent && (
        <EventPopUp
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}