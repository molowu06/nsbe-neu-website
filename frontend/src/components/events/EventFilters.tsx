"use client";

import { Filter, CalendarDays, List } from "lucide-react";
import styles from "../../../styles/event.module.css";

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
      {/* View Toggle */}
      <div className={styles["view-toggle"]}>
        <button
          onClick={() => onViewChange("calendar")}
          className={`${styles["view-btn"]} ${viewMode === "calendar" ? styles["active"] : ""}`}
        >
          <CalendarDays size={18} />
          Calendar
        </button>
        <button
          onClick={() => onViewChange("list")}
          className={`${styles["view-btn"]} ${viewMode === "list" ? styles["active"] : ""}`}
        >
          <List size={18} />
          List
        </button>
      </div>

      {/* Filter Buttons */}
      <div className={styles["filter-buttons"]}>
        <Filter size={20} className={styles["filter-icon"]} />
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`${styles["filter-btn"]} ${
              selectedFilter === filter ? styles["active-filter"] : ""
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}