import { FaTrophy } from "react-icons/fa";

// will be pulling this from the Supabase later, but hardcoding for visual purposes
const memberData = {
    name: 'Kabato "Kab" Burka',
    major: "Electrical Engineering",
    year: "5th year",
    points: 20.5,
    quote: '"The community of BESS has provided a wealth of knowlege"',
    image: "/images/members-of-the-month/january-kab.jpg",
};
export default function MemberOfTheMonth() {
    return (
    <section className="py-12 px-4 bg-yellow-50">
        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg">
        {/* gold header bar */}
        <div className="bg-[#BF8836] px-6 py-4 flex items-center gap-3">
            <FaTrophy className="text-white text-3xl" />
            <h2 className="text-3xl font-bold text-white">Member of the Month</h2>
        </div>

        {/* white body */}
        <div className="bg-white p-6 sm: p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* photo */}
            <img
            src={memberData.image}
            alt={memberData.name}
            className="w-36 h-36 rounded-full object-cover object-[60%_50%] flex-shrink-0"
            />

          {/* info */}
            <div className="text-center sm:text-left">
            <h3 className="text-3xl font-bold text-gray=900">
                {memberData.name}
            </h3>
            <p className="text-gray-600 mt-1">
                {memberData.major} · {memberData.year}
            </p>

            <div className="flex items-center justify-center sm:justify-start gap-2 mt-3">
                <FaTrophy className="text-[#BF8836] text-xl" />
                <span className="text-2xl font-bold text-[#BF8836]">
                {memberData.points} Points
                </span>
            </div>

            <p className="mt-3 text-gray-700">{memberData.quote}</p>
            </div>
        </div>
        </div>
    </section>
    );
}
