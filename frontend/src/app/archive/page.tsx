"use client";

import { useState, useMemo } from "react";
import styles from "../../../styles/archive.module.css";

const albums = [
  { id: 1, title: "NSBE Regional Conference", date: "March 21, 2026", year: 2026, category: "Conference", photoCount: 42 },
  { id: 2, title: "Resume & LinkedIn Workshop", date: "March 12, 2026", year: 2026, category: "PCI", photoCount: 18 },
  { id: 3, title: "BESS General Body Meeting", date: "March 5, 2026", year: 2026, category: "GBM", photoCount: 24 },
  { id: 4, title: "BESS Banquet Night", date: "February 20, 2025", year: 2025, category: "Big Events", photoCount: 65 },
  { id: 5, title: "Study Night", date: "January 10, 2025", year: 2025, category: "GBM", photoCount: 12 },
];

export default function ArchivePage() {
  const [view, setView] = useState<"card" | "list">("card");
  const [selectedYear, setSelectedYear] = useState<number | "All">("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const years = useMemo(() => {
    return [...new Set(albums.map((a) => a.year))].sort((a, b) => b - a);
  }, []);

  const filteredByYear =
    selectedYear === "All"
      ? albums
      : albums.filter((a) => a.year === selectedYear);

  const categories = useMemo(() => {
    return ["All", ...new Set(filteredByYear.map((a) => a.category))];
  }, [filteredByYear]);

  const fullyFiltered =
    selectedCategory === "All"
      ? filteredByYear
      : filteredByYear.filter((a) => a.category === selectedCategory);

  // PROFESSIONAL BANNER LOGIC
  let bannerText = "";

  if (selectedYear === "All" && selectedCategory === "All") {
    bannerText = "All Photos";
  } else if (selectedYear !== "All" && selectedCategory === "All") {
    bannerText = `${selectedYear} Photos`;
  } else {
    bannerText = `${selectedYear} ${selectedCategory} Photos`;
  }

  return (
    <main className={styles.page}>

      {/* HEADER */}
      <div className={styles.header}>

        <div>
          <h1 className={styles.title}>Photo Archives</h1>
          <p className={styles.subtitle}>
            Browse photos from BESS events and activities
          </p>
        </div>

        {/* ALL CONTROLS INLINE */}
        <div className={styles.controlPanel}>

          {/* GRID / LIST TOGGLE */}
          <div className={styles.segmentedControl}>
            <button
              className={`${styles.segmentBtn} ${
                view === "card" ? styles.activeSegment : ""
              }`}
              onClick={() => setView("card")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
              Grid
            </button>

            <button
              className={`${styles.segmentBtn} ${
                view === "list" ? styles.activeSegment : ""
              }`}
              onClick={() => setView("list")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
              </svg>
              List
            </button>
          </div>

          {/* FILTER ICON */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className={styles.filterIcon}
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>

          {/* YEAR DROPDOWN */}
          <select
            className={styles.dropdown}
            value={selectedYear}
            onChange={(e) => {
              const value =
                e.target.value === "All"
                  ? "All"
                  : parseInt(e.target.value);
              setSelectedYear(value);
              setSelectedCategory("All");
            }}
          >
            <option value="All">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* CATEGORY FILTERS */}
          {selectedYear !== "All" && (
            <div className={styles.filterGroup}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filterTag} ${
                    selectedCategory === cat
                      ? styles.activeFilter
                      : ""
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FULL WIDTH WHITE BANNER */}
      <div className={styles.bannerWrapper}>
        <div className={styles.bannerCard}>{bannerText}</div>
      </div>

      {/* CONTENT */}
      {view === "card" ? (
        <div className={styles.grid}>
          {fullyFiltered.map((album) => (
            <div key={album.id} className={styles.card}>
              <div className={styles.cardImagePlaceholder}>
                {album.photoCount} Photos
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.category}>
                  {album.category}
                </span>
                <h3>{album.title}</h3>
                <p>{album.date}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.list}>
          {fullyFiltered.map((album) => (
            <div key={album.id} className={styles.listItem}>
              <div className={styles.listImagePlaceholder} />
              <div className={styles.listInfo}>
                <span className={styles.category}>
                  {album.category}
                </span>
                <h3>{album.title}</h3>
                <p>{album.date}</p>
              </div>
              <div className={styles.photoCount}>
                {album.photoCount} Photos
              </div>
            </div>
          ))}
        </div>
      )}

    </main>
  );
}