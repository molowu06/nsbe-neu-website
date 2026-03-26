"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {FaBars, FaTimes } from "react-icons/fa";
import styles from "../../styles/navbar.module.css";

const NavBar = () => {
  // menuOpen state for hamburger toggle
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // close mobile menu when clicking outside the nav
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setAboutOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // close mobile menu  is window resizes past mobile breakpoint
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // helper to close everything when a link is clicked
  const closeAll = () => {
    setMenuOpen(false);
    setAboutOpen(false);
  }

  return (
    // ref is for outside-click detection
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
          <h3><strong>BESS - NSBE Northeastern Chapter</strong> </h3>
      </div>

      {/* hamburger button - only visible on mobile via CSS */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes size={24}/> : <FaBars size={24} />}
      </button>

      <ul className={`${styles.links} ${menuOpen ? styles.linksOpen : ""}`}>
        <li><Link href="/" onClick={closeAll}>Home</Link></li>
        <li><Link href="/event" onClick={closeAll}>Events</Link></li>
        <li><Link href="/newsletter" onClick={closeAll}>Newsletter</Link></li>
        <li>
          <Link href="/membership" onClick={closeAll}>Membership</Link>
        </li>

        <li
          className={styles.dropdown}
          onMouseEnter= {() => {
            if (window.innerWidth >= 768) setAboutOpen(true);
          }}
          onMouseLeave= {() => {
            if (window.innerWidth >= 768) setAboutOpen(false);
          }}
        >
          <button
            className= {styles.dropdownTrigger}
            onClick= {() => setAboutOpen(!aboutOpen)}
          >
            About{" "}
            <span
              className={`${styles.arrow} ${aboutOpen ? styles.arrowOpen : ""}`}
            >
              ▾
            </span>
          </button>

          {/* the dropdown menu, renders when aboutOpen is true */}
          {aboutOpen && (
            <ul className={styles.dropdownMenu}>
              <li>
                <Link 
                  href="/about"
                  onClick={() => setAboutOpen(false)}
                >
                  About BESS
                </Link>
              </li>
              <li>
                <Link
                  href="/about/eboard"
                  onClick={() => setAboutOpen(false)}
                >
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
