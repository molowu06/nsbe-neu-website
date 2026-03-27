import Image from "next/image";
import EventsSection from "../components/UpcomingEvents";
export default function Home() {
  return (
    <main>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero-wrapper">
        <div className="hero-container">

          {/* Left — text */}
          <div className="hero-text">
            <h1>
              Welcome to <span className="hero-highlight">BESS</span>
            </h1>
            <p className="hero-subtitle">
              Northeastern Black Engineering Student Society — Empowering Black
              engineers to excel academically, succeed professionally, and
              positively impact the community.
            </p>
            <div className="hero-buttons">
              <a href="https://nsbe.org/collegiate/" target="_blank" className="hero-btn-primary">
                Become a NSBE Member →
              </a>
              <a href="/about" className="hero-btn-secondary">
                About BESS
              </a>
            </div>
          </div>

          {/* Right — collage */}
          <div className="hero-image">
            <Image
              src="/images/nsbe-collage.png"
              alt="BESS members collage"
              fill
              style={{ objectFit: "cover", objectPosition: "center 0%" }}
              priority
            />
          </div>

        </div>
      </section>


      {/* ── WHO WE ARE ───────────────────────────────────── */}
      <section className="section-light py-10">
        <div className="white-card">
          <h3>COMMUNITY. EXCELLENCE. SCHOLARSHIP.</h3>
          <p>
            The mission of the National Society of Black Engineers is to increase the
            number of culturally responsible Black Engineers who excel academically, succeed
            professionally, and positively impact the community.
          </p>
        </div>
      </section>


      {/* ── UPCOMING EVENTS ──────────────────────────────── */}
      <EventsSection />

    </main>
  );
}