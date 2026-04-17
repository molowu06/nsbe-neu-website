"use client";

import { Filter, CalendarDays, List } from "lucide-react";
import styles from "../styles/event.module.css";

/*
Props:
- filters: list of filter names (ex: ["All", "GBM", "PCI", ...])
- selectedFilter: currently active filter
- onFilterChange: function to update selected filter in parent
- viewMode: current view ("calendar" or "list")
- onViewChange: function to toggle between views
*/
type Props = {
  filters: string[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  viewMode: "calendar" | "list";
  onViewChange: (mode: "calendar" | "list") => void;
};

export default function EventFilters({
  filters,
  selectedFilter,
  onFilterChange,
  viewMode,
  onViewChange,
}: Props) {
  return (
    <div className={styles["filters-container"]}>

      {/* ----- VIEW TOGGLE (Calendar vs List) ----- */}
      <div className={styles["view-toggle"]}>
        
        {/* Calendar View Button */}
        <button
          onClick={() => onViewChange("calendar")}
          className={`${styles["view-btn"]} ${
            viewMode === "calendar" ? styles["active"] : ""
          }`}
        >
          <CalendarDays size={18} />
          Calendar
        </button>

        {/* List View Button */}
        <button
          onClick={() => onViewChange("list")}
          className={`${styles["view-btn"]} ${
            viewMode === "list" ? styles["active"] : ""
          }`}
        >
          <List size={18} />
          List
        </button>
      </div>
      {/* ----- FILTER BUTTONS (GBM, PCI, etc.) ----- */}
      <div className={styles["filter-buttons"]}>
        
        {/* Filter icon for visual cue */}
        <Filter size={20} className={styles["filter-icon"]} />

        {/* Loop through all filter options */}
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`${styles["filter-btn"]} ${
              selectedFilter === filter
                ? styles["active-filter"]
                : ""
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}