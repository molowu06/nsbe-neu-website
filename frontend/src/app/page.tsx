"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import EventsSection from "@/app/components/events-section";
import Link from "next/link";

export default function Home() {
  // Hero slideshow images (mixed JPG and PNG supported)
  const heroImages = [
    "/images/homepage/bess-1.jpg",
    "/images/homepage/bess-2.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // Slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1
      );
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      {/* ───────── HERO SECTION ───────── */}
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

          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-pretitle">Welcome To</span>
              <span className="hero-highlight">BESS</span>
            </h1>

            <p className="hero-subtitle">
              Northeastern's Black Engineering Student Society — Empowering Black
              engineers to excel academically, succeed professionally, and
              positively impact the community.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── WHO WE ARE ───────── */}
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

      {/* ───────── PHOTO ROW SECTION ───────── */}
      <section className="photo-row">
        <div className="photo-row-grid">
          {/* Card 1 */}
          <div className="photo-row-item">
            <Image src="/images/homepage1.png" alt="BESS photo 1" width={400} height={280} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
          </div>

          {/* Card 2 */}
          <div className="photo-row-item">
            <Image src="/images/homepage2.png" alt="BESS photo 2" width={400} height={280} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Card 3 */}
          <div className="photo-row-item">
            <Image src="/images/homepage3.png" alt="BESS photo 3" width={400} height={280} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
        <div className="photo-row-footer">
          <a href="#" className="hero-btn-primary">Become a Member →</a>
        </div>
      </section>

      {/* ───────── EVENTS SECTION ───────── */}
      <EventsSection />
    </main>
  );
}