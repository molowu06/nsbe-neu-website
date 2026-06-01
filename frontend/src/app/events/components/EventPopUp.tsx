"use client";

import { useEffect, useRef } from "react";
import { X, Clock, MapPin } from "lucide-react";
import { EventType } from "../../../../types/index";
import { addEventToCalendar } from "../../../../lib/calendar";
/*
Props:
- event: the selected event to display in the popup
- onClose: function to close the popup (controlled by parent)
*/
type Props = {
  event: EventType;
  onClose: () => void;
};

const typeBgMap: Record<string, string> = {
  GBM: "#dbeafe",
  PCI: "#e8d1ce",
  Torch: "#cee6d9",
  AEx: "#eadcff",
  "Big Events": "#e7dfc7",
  Conference: "#fef3c7",
};

const typeTextMap: Record<string, string> = {
  GBM: "#1e40af",
  PCI: "#C8102E",
  Torch: "#1F5E3B",
  AEx: "#6f3589",
  "Big Events": "#D4AF37",
  Conference: "#D4AF37",
};

export default function EventPopUp({ event, onClose }: Props) {
  
  const overlayRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose();
  }

  const bg = typeBgMap[event.type] || "#f3f4f6";
  const textColor = typeTextMap[event.type] || "#374151";
  const startDate = new Date(event.startDate);
  const formattedDate = startDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const endDate = event.endDate ? new Date(event.endDate) : null;

  const timeRange =
    event.time === "All Day"
      ? "All Day"
      : endDate
      ? `${startDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })} – ${endDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`
      : event.time;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
        padding: "1rem",
      }}
    >
      {/* ----- POPUP CONTAINER ----- */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "1rem",
          maxWidth: "480px",
          width: "100%",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          overflow: "hidden",
          animation: "fadeIn 0.2s ease",
        }}
      >
        {/* ----- HEADER (colored by event type) ----- */}
        <div
          style={{
            backgroundColor: bg,
            padding: "1.25rem 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            {/* Event type label */}
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: textColor,
              }}
            >
              {event.type}
            </span>

            {/* Event title */}
            <h2
              style={{
                fontSize: "1.35rem",
                fontWeight: 700,
                color: "#111827",
                marginTop: "0.25rem",
                lineHeight: 1.3,
              }}
            >
              {event.title}
            </h2>
          </div>

          {/* Close (X) button */}
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.25rem",
              color: "#6b7280",
              flexShrink: 0,
            }}
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        {/* ----- EVENT DETAILS ----- */}
        <div style={{ padding: "1.25rem 1.5rem" }}>

          {/* Date + Time */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.75rem",
              color: "#374151",
              fontSize: "0.95rem",
            }}
          >
            <Clock size={18} style={{ color: "#D4AF37", flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 600 }}>{formattedDate}</div>
              <div style={{ color: "#6b7280" }}>{timeRange}</div>
            </div>
          </div>

          {/* Location */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.25rem",
              color: "#374151",
              fontSize: "0.95rem",
            }}
          >
            <MapPin size={18} style={{ color: "#D4AF37", flexShrink: 0 }} />
            <span>{event.location || "Location TBA"}</span>
          </div>

          {/* ----- ACTION BUTTONS ----- */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              onClick={() => addEventToCalendar(event)}

              /*
              Adds event to user's calendar (Google/ICS)
              */
              style={{
                padding: "0.6rem 1.25rem",
                backgroundColor: "#1f2b46",
                color: "white",
                borderRadius: "100px",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.5px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#1d2e10")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#273c16")
              }
            >
              Add to Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}