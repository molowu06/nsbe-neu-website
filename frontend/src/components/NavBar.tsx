"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/navbar.module.css";

const NavBar = () => {
  const [membershipOpen, setMembershipOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href="/">
          <Image 
              src="/logo/navbar_logo.png"
              alt="NSBE Logo" 
              width={160}
              height={160}
            />
          </Link>
          <h3><strong>BESS - NSBE Northeastern Chapter</strong> </h3>
      </div>

      <ul className={styles.links}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/event">Events</Link></li>
        <li><Link href="/newsletter">Newsletter</Link></li>
        <li
          className={styles.dropdown}
          onMouseEnter= {() => setMembershipOpen(true)}
          onMouseLeave= {() => setMembershipOpen(false)}
        >
          <button
            className= {styles.dropdownTrigger}
            onClick= {() => setMembershipOpen(false)}
          >
            Membership
            <span
              className={`${styles.arrow} ${membershipOpen ? styles.arrowOpen : ""}`}
            >
              ▾
            </span>
          </button>

          {/* the dropdown menu, renders when membershipOpen is true */}
          {membershipOpen && (
            <ul className={styles.dropdownMenu}>
              <li>
                <Link 
                  href="/membership"
                  onClick={() => setMembershipOpen(false)}
                >
                  BESS Members
                </Link>
              </li>
              <li>
                <Link
                  href="/membership/MembershipNSBE"
                  onClick={() => setMembershipOpen(false)}
                >
                  National NSBE Membership
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li
          className={styles.dropdown}
          onMouseEnter= {() => setAboutOpen(true)}
          onMouseLeave= {() => setAboutOpen(false)}
        >
          <button
            className= {styles.dropdownTrigger}
            onClick= {() => setAboutOpen(false)}
          >
            About
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
