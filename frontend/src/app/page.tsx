import Image from "next/image";
import EventsSection from "@/app/components/events-section";

export default function Home() {
  return (
    <main>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero-wrapper">
        <div className="hero-container">

          {/* Left — text */}
          <div className="hero-text">
            <h1>
              Welcome to 
            </h1>
            <h1>
              <span className="hero-highlight">BESS</span>
            </h1>
            <p className="hero-subtitle">
              Northeastern Black Engineering Student Society — Empowering Black
              engineers to excel academically, succeed professionally, and
              positively impact the community.
            </p>
          </div>

          {/* Right — collage */}
          <div className="hero-image">
            <Image
              src="/images/nsbe-collage.png"
              alt="BESS members collage"
              fill
              style={{ objectFit: "fill", objectPosition: "center 0%" }}
              priority
            />
          </div>

        </div>
      </section>


      {/* ── WHO WE ARE ───────────────────────────────────── */}
      <section className="section-light">
        <div className="white-card">
          <h3>COMMUNITY. EXCELLENCE. SCHOLARSHIP.</h3>
          <p>
            The mission of the National Society of Black Engineers is to increase the
            number of culturally responsible Black Engineers who excel academically, succeed
            professionally, and positively impact the community.
          </p>

          <a href="#" className="hero-btn-primary">
            Learn More →
          </a>
        </div>
      </section>


      {/* ── PHOTO ROW ────────────────────────────────────── */}
      <section className="photo-row">
        <div className="photo-row-grid">
          <div className="photo-row-item">
            <div className="photo-row-image">
              <Image src="/images/homepage1.png" alt="BESS photo 1" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="photo-row-banner" style={{ backgroundColor: "#c8860a" }}>
              <h4>Build Community</h4>
              <p>Connect with Black engineers who share your passion for excellence and making a difference.</p>
            </div>
          </div>
          <div className="photo-row-item">
            <div className="photo-row-image">
              <Image src="/images/homepage2.png" alt="BESS photo 2" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="photo-row-banner" style={{ backgroundColor: "#273c16" }}>
              <h4>Excel Academically</h4>
              <p>Access study groups, mentorship, and resources to help you thrive at Northeastern.</p>
            </div>
          </div>
          <div className="photo-row-item">
            <div className="photo-row-image">
              <Image src="/images/homepage3.png" alt="BESS photo 3" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="photo-row-banner" style={{ backgroundColor: "#1a1a1a" }}>
              <h4>Succeed Professionally</h4>
              <p>Land internships and co-ops through our network of industry partners and career events.</p>
            </div>
          </div>
        </div>
        <div className="photo-row-footer">
          <a href="#" className="hero-btn-primary">Become a Member →</a>
        </div>
      </section>


      {/* ── UPCOMING EVENTS ──────────────────────────────── */}
      <EventsSection />

    </main>
  );
}