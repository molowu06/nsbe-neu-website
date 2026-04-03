"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import styles from "../../styles/navbar.module.css";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setAboutOpen(false);
        setArchiveOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when resizing
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeAll = () => {
    setMenuOpen(false);
    setAboutOpen(false);
    setArchiveOpen(false);
  };

  return (
    <nav className={styles.nav} ref={navRef}>
      <div className={styles.logo}>
        <Link href="/" onClick={closeAll}>
          <Image
            src="/logo/navbar_logo.png"
            alt="NSBE Logo"
            width={160}
            height={160}
          />
        </Link>
        <h3>
          <strong>BESS - NSBE Northeastern Chapter</strong>
        </h3>
      </div>

      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <ul className={`${styles.links} ${menuOpen ? styles.linksOpen : ""}`}>
        <li>
          <Link href="/" onClick={closeAll}>Home</Link>
        </li>

        <li>
          <Link href="/event" onClick={closeAll}>Events</Link>
        </li>

        {/* ARCHIVE DROPDOWN */}
        <li
          className={styles.dropdown}
          onMouseEnter={() => {
            if (window.innerWidth >= 768) setArchiveOpen(true);
          }}
          onMouseLeave={() => {
            if (window.innerWidth >= 768) setArchiveOpen(false);
          }}
        >
          <button
            className={styles.dropdownTrigger}
            onClick={() => setArchiveOpen(!archiveOpen)}
          >
            Archive{" "}
            <span
              className={`${styles.arrow} ${
                archiveOpen ? styles.arrowOpen : ""
              }`}
            >
              ▾
            </span>
          </button>

          {archiveOpen && (
            <ul className={styles.dropdownMenu}>
              <li>
                <Link href="/archive" onClick={closeAll}>
                  Photo Archive
                </Link>
              </li>
              <li>
                <Link href="/newsletter" onClick={closeAll}>
                  Newsletter
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li>
          <Link href="/membership" onClick={closeAll}>Membership</Link>
        </li>

        {/* ABOUT DROPDOWN */}
        <li
          className={styles.dropdown}
          onMouseEnter={() => {
            if (window.innerWidth >= 768) setAboutOpen(true);
          }}
          onMouseLeave={() => {
            if (window.innerWidth >= 768) setAboutOpen(false);
          }}
        >
          <button
            className={styles.dropdownTrigger}
            onClick={() => setAboutOpen(!aboutOpen)}
          >
            About{" "}
            <span
              className={`${styles.arrow} ${
                aboutOpen ? styles.arrowOpen : ""
              }`}
            >
              ▾
            </span>
          </button>

          {aboutOpen && (
            <ul className={styles.dropdownMenu}>
              <li>
                <Link href="/about" onClick={closeAll}>
                  About BESS
                </Link>
              </li>
              <li>
                <Link href="/about/eboard" onClick={closeAll}>
                  Executive Board &apos;25-&apos;26
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;