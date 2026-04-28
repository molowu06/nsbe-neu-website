"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import UpcomingEvents from "../components/UpcomingEvents";
import Link from "next/link";
import GivingDaySection from "@/components/GivingDaySection";

import FAQSection from "../components/FAQSection";

export default function Home() {
  // Hero slideshow images (mixed JPG and PNG supported)
  const heroImages = [
    "/images/homepage/bess-1.jpg",
    "/images/homepage/bess-7.jpg",
    "/images/homepage/bess-2.jpg",
    "/images/homepage/bess-4.jpg",
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
        <div className="hero-background">
          {heroImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`BESS slide ${index + 1}`}
              fill
              sizes="100vw"
              priority={index === 0}
              className={`hero-slide ${
                index === currentImage ? "active" : ""
              }`}
            />
          ))}
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-pretitle">Welcome To</span>
            <span className="hero-highlight">
              <span className="hero-highlight-northeastern">Northeastern</span>
              <span className="hero-highlight-nsbe">NSBE</span>
            </span>
          </h1>

          <p className="hero-subtitle">
            Northeastern's Black Engineering Student Society — Empowering Black
            engineers to excel academically, succeed professionally, and
            positively impact the community.
          </p>
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
          <Link href="/about" className="hero-btn-primary">
            Learn More →
          </Link>
        </div>
      </section>

      {/* ───────── PHOTO ROW SECTION ───────── */}
      <section className="photo-row">
        <div className="photo-row-grid">
          {/* Card 1 */}
          <div className="photo-row-item">
            <div className="photo-row-image">
              <Image
                src="/images/homepage1.png"
                alt="Build Community"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              className="photo-row-banner"
              style={{ backgroundColor: "#D4AF37" }}
            >
              <h4>Build Community</h4>
              <p>
                Connect with Black engineers who share your passion for excellence
                and making a difference.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="photo-row-item">
            <div className="photo-row-image">
              <Image
                src="/images/homepage2.png"
                alt="Excel Academically"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              className="photo-row-banner"
              style={{ backgroundColor: "#1f2b46" }}
            >
              <h4>Excel Academically</h4>
              <p>
                Access study groups, mentorship, and resources to help you thrive
                at Northeastern.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="photo-row-item">
            <div className="photo-row-image">
              <Image
                src="/images/homepage3.png"
                alt="Succeed Professionally"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              className="photo-row-banner"
              style={{ backgroundColor: "#1a1a1a" }}
            >
              <h4>Succeed Professionally</h4>
              <p>
                Land internships and co-ops through our network of industry
                partners and career events.
              </p>
            </div>
          </div>
        </div>

        <div className="photo-row-footer">
          <a
            href="https://nsbe.org/collegiate/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn-primary"
          >
            Become a NSBE Member →
          </a>
        </div>
      </section>

      {/* ───────── DONATION SECTION ───────── */}
      <section className="donate-section">
        <div className="donate-grid">
          {/* Left Content */}
          <div className="donate-content">
            <h2 className="donate-heading">Support Our Mission</h2>
            <p className="donate-text">
              Your contribution helps fund scholarships, professional development,
              community initiatives, and programs that empower the next generation
              of culturally responsible engineers.
            </p>
            <Link href="/donate" className="hero-btn-primary">
              Donate →
            </Link>
          </div>

          {/* Right Image */}
          <div className="donate-card">
            <div className="donate-card-inner">
              <Image
                src="/images/homepage/bess-1.jpg"
                alt="BESS community"
                fill
                style={{ objectFit: "cover", objectPosition: "center 20%" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── EVENTS SECTION ───────── */}
      <UpcomingEvents />

      {/* ───────── FAQ SECTION ───────── */}
      <FAQSection />
    </main>
  );
}