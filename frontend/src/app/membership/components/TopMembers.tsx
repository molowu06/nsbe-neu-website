// components/TopMembers.tsx

import { FaTrophy } from "react-icons/fa";

export default function TopMembers() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* header */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <FaTrophy className="text-[#BF8836] text-3xl" />
          <h2 className="text-3xl font-bold text-gray-900">Top 10 Members</h2>
        </div>
        <p className="text-center text-gray-500 mb-8">2026 Points Standings</p>

        {/* table */}
        <div className="border border-gray-200 rounded-xl  shadow-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="text-left  px-6 py-3 text-sm font-semibold">
                  Rank
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold">
                  Member
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold">
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {/* rows will go here once there's data (supabase) */}
              <td className="px-6 py-4 text-gray-600">row 1</td>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
