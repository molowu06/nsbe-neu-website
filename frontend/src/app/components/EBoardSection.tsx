import { eboardMembers, EboardMember } from "../../../data/EBoardData";
import Link from "next/link";
import { useState, useEffect } from "react";

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
      className="bg-white rounded-xl shadow-md overflow-hidden w-72 transition-transform duration-300"
      style={{ transform: isHovered ? "translateY(-4px)" : "translateY(0)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={member.linkedin || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative"
        style={{ position: "relative" }}
      >
        <div className="w-full h-72 relative overflow-hidden">
          {member.image && !member.image.includes("dicebear") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover transition duration-300"
              style={{
                filter: isHovered ? "brightness(0.5)" : "brightness(1)",
              }}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-white text-6xl font-bold font-sans"
              style={{
                background: "linear-gradient(135deg, #334155 0%, #1e293b 100%)",
                filter: isHovered ? "brightness(0.5)" : "brightness(1)",
                transition: "filter 0.3s ease",
              }}
            >
              {initials}
            </div>
          )}
          {member.linkedin && (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
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
      <div className="p-5">
        <span className="inline-block bg-green-900 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">
          {member.position}
        </span>
        <h3 className="text-lg font-bold text-gray-900 mb-2 font-sans">
          {member.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 font-sans">
          {member.major} • {member.year} Year
        </p>
        <a
          href={`mailto:${member.email}`}
          className="flex items-center gap-2 text-green-900 text-xs font-sans hover:underline"
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
  // Responsive columns: 1 on mobile, 2 on tablet, 4 on desktop
  return (
    <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-slate-50 to-slate-100 font-sans">
      <div className="max-w-6xl w-full mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold text-center text-gray-900 mb-2">
          Executive Board 2025-2026
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto text-base">
          Meet the leaders driving our chapter&apos;s mission and vision
        </p>
        {/* Responsive grid, allow horizontal scroll if needed */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mx-auto min-h-0 overflow-x-auto">
          {eboardMembers.map((member, index) => (
            <MemberCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
