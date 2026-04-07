// components/Leaderboard.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { FaTrophy, FaSearch } from "react-icons/fa";
import { supabase } from "@/lib/supabase";

// --- types ---
interface Member {
  full_name: string;
  points: number;
}

interface RankedMember extends Member {
  rank: number;
}

// --- rank badge colors ---
function rankBadgeClasses(rank: number): string {
  switch (rank) {
    case 1:
      return "bg-yellow-500 text-white"; //gold
    case 2:
      return "bg-gray-400 text-white"; // silver
    case 3:
      return "bg-yellow-700 text-white"; // bronze
    default:
      return "bg-gray-600 text-white";
  }
}

export default function Leaderboard() {
  // --- state ---
  const [members, setMembers] = useState<RankedMember[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- fetch members from supabase ---
  useEffect(() => {
    async function fetchMembers() {
      // only getting the two columns necessary, sorted by points descending
      const { data, error } = await supabase
        .from("members")
        .select("full_name, points")
        .order("points", { ascending: false });

      if (error) {
        console.error("Supabase error: ", error.message);
        setError("Failed to load leaderboard data.");
        setLoading(false);
        return;
      }

      // assign ranks based on the sorted order
      const ranked: RankedMember[] = (data || []).map((m, i) => ({
        ...m,
        rank: i + 1,
      }));

      setMembers(ranked);
      setLoading(false);
    }

    fetchMembers();
  }, []);

  // --- filter by search query ---
  const filteredMembers = useMemo(() => {
    if (!query.trim()) return members;
    const q = query.toLowerCase();
    return members.filter((m) => m.full_name.toLowerCase().includes(q));
  }, [query, members]);

  // --- spotlight logic ---
  // single search match -> spotlight that person
  // otherwise -> spotlight the #1 ranked member
  const spotlightMember: RankedMember | null =
    filteredMembers.length == 1
      ? filteredMembers[0]
      : members.length > 0
        ? members[0]
        : null;

  // --- loading state ---
  if (loading) {
    return (
      <section className="py-12 px-4">
        <p className="text-center text-gray-500">Loading leaderboard...</p>
      </section>
    );
  }

  // --- error state ---
  if (error) {
    return (
      <section className="py-12 px-4">
        <p className="text-center text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* --- section header --- */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <FaTrophy className="text-[#BF8836] text-3xl" />
          <h2 className="text-3xl font-bold text-gray-900">
            Member Leaderboard
          </h2>
        </div>
        <p className="text-center text-gray-500 mb-8">2026 Points Standings</p>

        {/* two column layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* --- LEFT: spotlight + search --- */}
          <div className="lg:w-1/3 w -full">
            <div className="bg-gray-900 border border-[#BF8836] rounded-xl p-6 flex flex-col items-center">
              {/* spotlight name */}
              <h3 className="text-white text-2xl font-bold mb-1 text-center">
                {spotlightMember?.full_name ?? "-"}
              </h3>

              {/* spotlight points */}
              <p className="text-[#BF8836] text-5xl font-extrabold mb-6">
                {spotlightMember?.points ?? 0} pts
              </p>

              {/* search input */}
              <div className="relative w-full">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#BF8836] transition-colors"
                />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-900 text-xl font-bold mb-1">
                The point system is as follows:
              </p>
              <ul className="text-black text-lg font-medium space-y-1 pl-8">
                  <li>• LARGE EVENT = 0.5 pts</li>
                  <li>• GENERAL BODY MEETING = 1 pt</li>
                  <li>• AEX MEETING = 1 pt</li>
                  <li>• PCI EVENT = 2 pts</li>
                  <li>• TORCH EVENT = 3 pts</li>
              </ul>
            </div>
          </div>

          {/* --- RIGHT: ranked list --- */}
          <div className="lg:w-2/3 w-full flex flex-col gap-3 max-h-[600px] overflow-y-auto">
            {filteredMembers.length === 0 ? (
              <div className="bg-gray-900 border border-[#BF8836] rounded-xl p-6 text-center text-gray-400">
                No members found for &quot;{query}&quot;
              </div>
            ) : (
              filteredMembers.map((member) => (
                <div
                  key={member.full_name}
                  className="bg-gray-900 border border-[#BF8836] rounded-xl px-5 py-4 flex items-center justify-between hover:bg-gray-800 transition-colors"
                >
                  {/* left side: rank badge + name  */}
                  <div className="flex items-center gap-4">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${rankBadgeClasses(member.rank)}`}
                    >
                      {member.rank}
                    </span>
                    <span className="text-white font-medium">
                      {member.full_name}
                    </span>
                  </div>

                  {/* right side: points */}
                  <span className="text-white font-semibold">
                    {member.points} pts
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
