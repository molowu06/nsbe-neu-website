import Leaderboard from "@/components/Leaderboard";
import MemberOfTheMonth from "./components/MemberOfTheMonth";
import MembershipTiers from "./components/MembershipTiers";

export default function MembershipPage() {
  return (
    <main>
      {/* BANNER */}
      <section className="bg-gray-900 text-white py-4 px-4 sm:px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          {/* logo — left */}
          <img
            src="/images/bess-logo.png"
            alt="BESS Logo"
            className="w-32 sm:w-36 md:w-48 object-contain flex-shrink-0 mb-4 md:mb-0 transition-transform duration-300 shadow-md hover:-translate-y-1 hover:shadow-lg"
          />
          {/* text — right */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Membership
            </h1>
            <p className="text-base sm:text-lg text-gray-300">
              Join NSBE and become part of a community dedicated to excellence
            </p>
          </div>
        </div>
      </section>

      {/* MEMBER OF THE MONTH */}
      <MemberOfTheMonth />

      {/* MEMBERSHIP TIERS */}
      <MembershipTiers />

      {/* MEMBERSHIP LEADERBOARD */}
      <Leaderboard/>


      {/* HOW TO BECOME A MEMBER
      <section
        style={{
          padding: "3rem 1rem",
          background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "2.25rem",
              fontWeight: "700",
              textAlign: "center",
              color: "#111827",
              marginBottom: "0.5rem",
            }}
          >
            How to Become a National NSBE Member
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#6b7280",
              marginBottom: "3rem",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: "1rem",
            }}
          >
            Learn how to join the community
          </p>
        </div>
      </section> */}

      
    </main>
  );
}
