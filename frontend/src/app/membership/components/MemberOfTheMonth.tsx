// frontend/src/components/MemberOfTheMonth.tsx
"use client";

import { useState, useEffect } from "react";
import { FaTrophy } from "react-icons/fa";
import { supabase } from "../../../../lib/supabase";

// ── Types ───────────────────────────────────────────────
interface MemberOfMonthData {
  full_name: string;
  major: string | null;
  year: string | null;
  points: number;
  quote: string | null;
  image: string | null;
  month: string;
}

export default function MemberOfTheMonth() {
  const [member, setMember] = useState<MemberOfMonthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMember() {
      // get the row where is_current = true
      // .single() tells Supabase to return one object instead of an array
      const { data, error } = await supabase
        .from("member_of_the_month")
        .select("full_name, major, year, points, quote, image, month")
        .eq("is_current", true)
        .single();

      if (error) {
        console.error("Supabase error:", error.message);
        setLoading(false);
        return;
      }

      setMember(data);
      setLoading(false);
    }

    fetchMember();
  }, []);

  // don't render anything while loading or if no current member is set
  if (loading) {
    return (
      <section className="py-12 px-4 bg-yellow-50">
        <p className="text-center text-gray-500">Loading Member of the Month...</p>
      </section>
    );
  }

  if (!member) return null;

  return (
    <section className="py-12 px-4 bg-yellow-50 ">
      <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* gold header bar */}
        <div className="bg-[#BF8836] px-6 py-4 flex items-center gap-3">
          <FaTrophy className="text-white text-3xl" />
          <h2 className="text-3xl font-bold text-white">Member of the Month</h2>
        </div>

        {/* white body */}
        <div className="bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* photo */}
          {member.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.image}
              alt={member.full_name}
              className="w-36 h-36 rounded-full object-cover object-[60%_50%] flex-shrink-0"
            />
          )}

          {/* info */}
          <div className="text-center sm:text-left">
            <h3 className="text-3xl font-bold text-gray-900">
              {member.full_name}
            </h3>

            {(member.major || member.year) && (
              <p className="text-gray-600 mt-1">
                {member.major}{member.major && member.year ? " · " : ""}{member.year}
              </p>
            )}

            <div className="flex items-center justify-center sm:justify-start gap-2 mt-3">
              <FaTrophy className="text-[#BF8836] text-xl" />
              <span className="text-2xl font-bold text-[#BF8836]">
                {member.points} Points
              </span>
            </div>

            {member.quote && (
              <p className="mt-3 text-gray-700">
                &ldquo;{member.quote}&rdquo;
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}