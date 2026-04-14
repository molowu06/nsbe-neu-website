"use client";

import { useEffect, useState } from "react";

type GivingDayData = {
  raised: number;
  donors: number;
  goal: number;
  lastUpdated?: string;
  live?: boolean;
  fallback?: boolean;
};

export default function GivingDaySection() {
  const [data, setData] = useState<GivingDayData | null>(null);

  useEffect(() => {
    async function loadGivingDayData() {
      try {
        const res = await fetch("/api/giving-day");
        if (!res.ok) {
          throw new Error(`API request failed: ${res.status}`);
        }

        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Failed to load Giving Day data:", error);
      }
    }

    loadGivingDayData();

    const interval = setInterval(loadGivingDayData, 60000);
    return () => clearInterval(interval);
  }, []);

  const raised = data?.raised ?? 3988;
  const donors = data?.donors ?? 167;
  const goal = data?.goal ?? 10000;
  const percent = Math.min((raised / goal) * 100, 100);

  return (
    <section className="donate-section">
      <div className="donate-grid">
        <div>
          <h2 className="donate-heading">Support BESS on Giving Day</h2>

          <p className="donate-text">
            Every donation helps fund conferences, professional development,
            and opportunities for Black engineers at Northeastern. Be part of
            the impact and support BESS today.
          </p>

          <a
            href="https://givingday.northeastern.edu/s/fund-details?dc=DN4507-83"
            target="_blank"
            rel="noopener noreferrer"
            className="donate-btn"
          >
            Donate Now
          </a>
        </div>

        <div className="donate-card">
          <div className="donate-card-inner flex flex-col overflow-hidden text-white">
            <div className="giving-card-video">
              <video
                src="/videos/Giving-Day-Video.mp4"
                controls
                preload="metadata"
                playsInline
              />
            </div>

            <div className="flex flex-col justify-center p-5 flex-1">
              <div className="grid grid-cols-3 text-center mb-5">
                <div>
                  <p className="text-xl font-bold">
                    ${raised.toLocaleString()}
                  </p>
                  <p className="text-xs opacity-80">Raised</p>
                </div>

                <div>
                  <p className="text-xl font-bold">{donors}</p>
                  <p className="text-xs opacity-80">Donors</p>
                </div>

                <div>
                  <p className="text-xl font-bold">
                    {Math.round(percent)}%
                  </p>
                  <p className="text-xs opacity-80">Goal</p>
                </div>
              </div>

              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#D4AF37] transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <p className="text-center mt-2 text-xs opacity-80">
                Goal: ${goal.toLocaleString()}
              </p>

              {data?.lastUpdated && (
                <p className="text-center mt-2 text-[10px] opacity-60">
                  Updated {new Date(data.lastUpdated).toLocaleTimeString()}
                </p>
              )}

              {data?.fallback && (
                <p className="text-center mt-1 text-[10px] opacity-50">
                  Showing last known totals
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}