import Leaderboard from "@/components/Leaderboard";
import MemberOfTheMonth from "./components/MemberOfTheMonth";
import MembershipTiers from "./components/MembershipTiers";

export const revalidate = 60;

export const metadata = {
  title: "Membership",
  description: "Join NSBE and become part of a community dedicated to excellence.",
};

export default function MembershipPage() {
  return (
    <main>
      {/* BANNER */}
      <section className="bg-gray-900 text-white py-4 px-4 sm:px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-2 md:gap-8">
          {/* logo — left */}
          <img
            src="/images/bess-logo.png"
            alt="BESS Logo"
            className="w-32 sm:w-36 md:w-48 object-contain flex-shrink-0 mb-1 md:mb-0 transition-transform duration-300 shadow-md hover:-translate-y-1 hover:shadow-lg"
          />
          {/* text — right */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Membership
            </h1>
            <p className="text-base sm:text-lg text-gray-300">
              Join NSBE and become part of a community dedicated to excellence
            </p>

            <div className="mt-8 font-bold ">
              <a
              href="https://nsbe.org/collegiate/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#BF8836] text-white text-base rounded-md px-4 py-2"
              >
                Become a NSBE Member →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBER OF THE MONTH */}
      <MemberOfTheMonth />

      {/* MEMBERSHIP TIERS */}
      <MembershipTiers />

      {/* MEMBERSHIP LEADERBOARD */}
      <Leaderboard/>
      
    </main>
  );
}
