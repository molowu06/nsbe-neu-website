"use client";

import Image from "next/image";
import EventsSection from "../components/UpcomingEvents";

export default function Home() {
  return (
    <main>
      {/* HERO SECTION */}
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
              <a href="#" className="hero-btn-primary">
                Become a Member →
              </a>
              <a href="#" className="hero-btn-secondary">
                Learn More
              </a>
            </div>
          </div>

          {/* Right — image */}
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

      {/* WHO WE ARE */}
      <section className="section-light">
        <div className="white-card">
          <h3>COMMUNITY. EXCELLENCE. SCHOLARSHIP.</h3>
          <p>
            The mission of the National Society of Black Engineers is to increase
            the number of culturally responsible Black Engineers who excel
            academically, succeed professionally, and positively impact the
            community.
          </p>
        </div>
      </section>

      {/* PHOTO ROW SECTION */}
      <section className="photo-row">
        <div className="photo-row-grid">
          <div className="photo-row-item">
            <Image
              src="/images/homepage1.png"
              alt="BESS photo 1"
              width={400}
              height={280}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div className="photo-row-item">
            <Image
              src="/images/homepage2.png"
              alt="BESS photo 2"
              width={400}
              height={280}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <div className="photo-row-item">
            <Image
              src="/images/homepage3.png"
              alt="BESS photo 3"
              width={400}
              height={280}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="photo-row-footer">
          <a href="#" className="hero-btn-primary">
            Become a Member →
          </a>
        </div>
      </section>

      {/* EVENTS SECTION */}
      <EventsSection />
    </main>
  );
}