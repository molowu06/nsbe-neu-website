"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import styles from "../../../styles/archive.module.css";
import {
  fetchFolders,
  fetchPhotos,
  getDriveImageFallbackUrl,
  getDriveImageUrl,
} from "@/lib/drive";
import { FiGrid, FiList } from "react-icons/fi";

const MAIN_FOLDER_ID = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID!;

export default function ArchivePage() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState<string | "All">("All");
  const [selectedEvent, setSelectedEvent] = useState<string>("All");
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    async function loadAlbums() {
      const yearFolders = await fetchFolders(MAIN_FOLDER_ID);

      const albumPromises = yearFolders.map(async (yearFolder: any) => {
        const eventFolders = await fetchFolders(yearFolder.id);

        return Promise.all(
          eventFolders.map(async (eventFolder: any) => {
            const thumbnail = await fetchPhotos(eventFolder.id, 1);

            // Only include if there is at least one photo
            if (!thumbnail || thumbnail.length === 0) return null;

            return {
              id: eventFolder.id,
              title: eventFolder.name,
              year: yearFolder.name,
              event: eventFolder.name,
              thumbnailId: thumbnail[0]?.id || null,
            };
          })
        );
      });

      const nested = await Promise.all(albumPromises);
      const flatAlbums = nested.flat().filter(Boolean);

      setAlbums(flatAlbums);
    }

    loadAlbums();
  }, []);

  const parseYearStart = (yearString: string) => {
    const parts = yearString.split("-").map((p) => parseInt(p));
    return parts[0] || 0;
  };

  const years = useMemo(() => {
   return [...new Set(albums.map((a) => a.year))]
      .sort((a, b) => parseYearStart(b) - parseYearStart(a));
  }, [albums]);

  const filteredByYear =
    selectedYear === "All"
      ? albums
      : albums.filter((album) => album.year === selectedYear);

  const events = useMemo(
    () => [...new Set(filteredByYear.map((a) => a.event))],
    [filteredByYear]
  );

  const filteredAlbums =
    selectedEvent === "All"
      ? filteredByYear
      : filteredByYear.filter((album) => album.event === selectedEvent);

  const sortedFilteredAlbums = useMemo(() => {
    return [...filteredAlbums].sort((a, b) => {
      const yearSort = parseYearStart(b.year) - parseYearStart(a.year);

      if (yearSort !== 0) {
        return yearSort;
      }

      return String(a.title).localeCompare(String(b.title));
    });
  }, [filteredAlbums]);

  // banner text
  let bannerText = "All Photos";
  if (selectedYear !== "All" && selectedEvent === "All") {
    bannerText = `${selectedYear} Photos`;
  } else if (selectedYear !== "All" && selectedEvent !== "All") {
    bannerText = `${selectedYear} • ${selectedEvent}`;
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

        <div className={styles.controlPanel}>
          {/* GRID / LIST */}
          <div className={styles.segmentedControl}>
            <button
              className={`${styles.segmentBtn} ${
                view === "grid" ? styles.activeSegment : ""
              }`}
              onClick={() => setView("grid")}
            >
              <FiGrid /> Grid
            </button>
            <button
              className={`${styles.segmentBtn} ${
                view === "list" ? styles.activeSegment : ""
              }`}
              onClick={() => setView("list")}
            >
              <FiList /> List
            </button>
          </div>

          {/* Year Dropdown */}
          <select
            className={styles.dropdown}
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setSelectedEvent("All");
            }}
          >
            <option value="All">All Years</option>
            {years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>

          {/* Event Dropdown */}
          {selectedYear !== "All" && (
            <select
              className={styles.dropdown}
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
            >
              <option value="All">All Events</option>
              {events.map((event) => (
                <option key={event}>{event}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* BANNER */}
      <div className={styles.bannerWrapper}>
        <div className={styles.bannerCard}>{bannerText}</div>
      </div>

      {/* CONTENT */}
      {view === "grid" ? (
        <div className={styles.grid}>
          {sortedFilteredAlbums.map((album) => (
            <Link
              key={album.id}
              href={`/archive/${album.id}`}
              className={styles.card}
            >
              <div className={styles.cardImagePlaceholder}>
                {album.thumbnailId ? (
                  <img
                    src={getDriveImageUrl(album.thumbnailId)}
                    alt={album.title}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const img = e.currentTarget;

                      if (img.dataset.fallbackApplied === "true") {
                        return;
                      }

                      img.dataset.fallbackApplied = "true";
                      img.src = getDriveImageFallbackUrl(album.thumbnailId);
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)",
                    }}
                  />
                )}
              </div>

              <div className={styles.cardInfo}>
                <h3>{album.title}</h3>
                <p>{album.year}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.list}>
          {sortedFilteredAlbums.map((album) => (
            <Link
              key={album.id}
              href={`/archive/${album.id}`}
              className={styles.listItem}
            >
              <div className={styles.listImagePlaceholder}>
                {album.thumbnailId ? (
                  <img
                    src={getDriveImageUrl(album.thumbnailId)}
                    alt={album.title}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const img = e.currentTarget;

                      if (img.dataset.fallbackApplied === "true") {
                        return;
                      }

                      img.dataset.fallbackApplied = "true";
                      img.src = getDriveImageFallbackUrl(album.thumbnailId);
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)",
                    }}
                  />
                )}
              </div>

              <div className={styles.listInfo}>
                <h3>{album.title}</h3>
                <p>{album.year}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}