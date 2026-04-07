
const events = [
  {
    id: 1,
    name: "BESS General Body Meeting",
    date: "2026-03-05",
    time: "6:00 PM – 7:30 PM",
    location: "Snell Library, Room 123 · Northeastern University",
    description:
      "Join us for our biweekly GBM! We'll cover upcoming opportunities, introduce new initiatives, and have time to connect with fellow members.",
    rsvpUrl: "https://forms.gle/8T2UEV4s8kTSTdct9",
  },
  {
    id: 2,
    name: "Resume & LinkedIn Workshop",
    date: "2026-03-12",
    time: "5:30 PM – 7:00 PM",
    location: "Interdisciplinary Science & Engineering Complex · ISEC 136",
    description:
      "Get your resume and LinkedIn profile ready for co-op and internship season. Industry professionals will provide live feedback.",
    rsvpUrl: "https://forms.gle/8T2UEV4s8kTSTdct9",
  },
  {
    id: 3,
    name: "NSBE Regional Conference",
    date: "2026-03-21",
    time: "All Day",
    location: "Boston Convention & Exhibition Center",
    description:
      "Connect with Black engineers from across the region. Featuring keynotes, networking sessions, and a career fair with top employers.",
    rsvpUrl: "https://forms.gle/8T2UEV4s8kTSTdct9",
  },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return {
    weekday: date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
    day: date.getDate(),
    month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
  };
}

export default function EventsSection() {
  return (
    <section className="events-section">
      <h2 className="events-heading">UPCOMING EVENTS</h2>

      <div className="events-grid">
        {events.map((event) => {
          const { weekday, day, month } = formatDate(event.date);
          return (
            <div key={event.id} className="event-card">

              {/* Date badge */}
              <div className="event-date-badge">
                <span className="event-weekday">{weekday}</span>
                <span className="event-day">{day}</span>
                <span className="event-month">{month}</span>
              </div>

              {/* Content */}
              <div className="event-content">
                <h3 className="event-name">{event.name}</h3>

                <div className="event-meta">
                  <span className="event-meta-item">
                    {/* Clock icon */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {event.time}
                  </span>
                  <span className="event-meta-item">
                    {/* Pin icon */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {event.location}
                  </span>
                </div>

                <p className="event-description">{event.description}</p>

                <a
                  href={event.rsvpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event-rsvp-btn"
                >
                  Add To Calender →
                </a>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}