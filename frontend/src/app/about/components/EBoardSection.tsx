"use client";

import Link from "next/link";
import { useState } from "react";
import { eboardMembers, EboardMember } from "../../../../data/EBoardData";

function MemberCard({ member }: { member: EboardMember }) {
  const [isHovered, setIsHovered] = useState(false);

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      style={{
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
        overflow: "hidden",
        width: "280px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image section - clickable for LinkedIn */}
      <Link
        href={member.linkedin || "#"}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", position: "relative" }}
      >
        <div
          style={{
            width: "100%",
            height: "280px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {member.image && !member.image.includes("dicebear") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.image}
              alt={member.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: isHovered ? "brightness(0.5)" : "brightness(1)",
                transition: "filter 0.3s ease",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, #334155 0%, #1e293b 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "4rem",
                fontWeight: "600",
                fontFamily: "system-ui, -apple-system, sans-serif",
                filter: isHovered ? "brightness(0.5)" : "brightness(1)",
                transition: "filter 0.3s ease",
              }}
            >
              {initials}
            </div>
          )}

          {/* LinkedIn overlay */}
          {member.linkedin && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            >
              <svg width="56" height="56" viewBox="0 0 24 24" fill="white">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
          )}
        </div>
      </Link>

      {/* Info section */}
      <div style={{ padding: "20px" }}>
        {/* Position badge */}
        <span
          style={{
            display: "inline-block",
            background: "#006400",
            color: "white",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "0.75rem",
            fontWeight: "600",
            fontFamily: "system-ui, -apple-system, sans-serif",
            marginBottom: "12px",
          }}
        >
          {member.position}
        </span>

        {/* Name */}
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: "700",
            color: "#111827",
            margin: "0 0 8px 0",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {member.name}
        </h3>

        {/* Major & Year */}
        <p
          style={{
            fontSize: "0.875rem",
            color: "#4b5563",
            margin: "0 0 12px 0",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {member.major} • {member.year} Year
        </p>

        {/* Email */}
        <a
          href={`mailto:${member.email}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.8rem",
            color: "#006400",
            textDecoration: "none",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          {member.email}
        </a>
      </div>
    </div>
  );
}

export default function EBoardSection() {
  return (
    <section
      style={{
        padding: "4rem 1rem",
        background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "2.25rem",
            fontWeight: "700",
            textAlign: "center",
            color: "#111827",
            marginBottom: "0.5rem",
          }}
        >
          Executive Board 2025-2026
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginBottom: "3rem",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: "1rem",
          }}
        >
          Meet the leaders driving our chapter&apos;s mission and vision
        </p>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
            maxWidth: "1200px",
            margin: "0 auto",
            justifyItems: "center",
            alignItems: "stretch",
            width: "100%",
          }}
        >
          {eboardMembers.map((member, index) => (
            <MemberCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
