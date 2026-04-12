// app/donate/page.tsx

export const metadata = {
  title: "Donate",
  description:
    "Support BESS-NSBE and help empower the next generation of Black engineers.",
};

/* ── Testimonial data ────────────────────────────────── */
const testimonials = [
  {
    name: "Hawa Bah",
    year: "2028",
    major: "Computer Science & Computer Engineering",
    quote:
        "BESS gave me a family on campus when I needed one most. I wouldn't be the engineer I am today without this community.",
    image: "/headshots/hawa-headshot.jpeg ",
  },
  {
    name: "Mimo Olowu",
    year: "2028",
    major: "Computer Science & Computer Engineering",
    quote:
      "Being part of BESS showed me I belong in engineering. The people here push you to be better and have your back while doing it.",
    image: "/headshots/mimo-headshot.jpeg",
  },
];

export default function DonatePage() {
  return (
    <main>
      {/* ── BANNER ─────────────────────────────────────── */}
        <section className="bg-gray-900 text-white py-4 px-4 sm:px-4">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-2 md:gap-8">
            {/* logo */}
            <img
                src="/images/bess-logo.png"
                alt="BESS Logo"
                className="w-32 sm:w-36 md:w-48 object-contain flex-shrink-0 mb-1 md:mb-0 transition-transform duration-300 shadow-md hover:-translate-y-1 hover:shadow-lg"
            />
            {/* text */}
            <div className="text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Donate to Northeastern NSBE
                </h1>
                <p className="text-base sm:text-lg text-gray-300">
                Your generosity will help empower the next generation of Black engineers
                </p>
                <div className="mt-8 font-bold ">
                
                {/* donate button */}
                <a
                href="https://givingday.northeastern.edu/s/fund-details?dc=DN4507-83"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#BF8836] text-white text-base rounded-md px-4 py-2"
                >
                    Donate Now →
                </a>
            </div>
            </div>
            
            </div>
        </section>

      {/* ── GIVING DAY VIDEO ───────────────────────────── */}
        <section className="py-16 px-4 sm:px-6 bg-white">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                    Giving Day
                </h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                    See how your contributions make a difference in the lives of our
                    members and community
                </p>

            {/* video container — 16:9 aspect ratio */}
            <div className="relative w-full overflow-hidden rounded-xl shadow-lg"
                style={{ aspectRatio: "16 / 9" }}>
                <video
                className="absolute inset-0 w-full h-full object-cover"
                controls
                playsInline
                preload="metadata"
                poster=""
                >
                <source src="/videos/Giving-Day-Video.mp4" type="video/mp4" />

                Your browser does not support this video format.
                </video>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">
            What Our Members Say
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Hear from the students whose lives have been impacted by your support
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* headshot */}
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-28 h-28 rounded-full object-cover object-top mb-5 border-4 border-[#BF8836]"
                />

                {/* name */}
                <h3 className="text-xl font-bold text-gray-900">{t.name}</h3>

                {/* year & major */}
                <p className="text-sm text-[#BF8836] font-semibold mt-1 mb-4">
                  Class of {t.year} · {t.major}
                </p>

                {/* quote */}
                <p className="text-gray-600 italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DONATE CTA ─────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Every dollar supports scholarships, conference travel, community
            outreach, and professional development for our members.
          </p>

          {/* Replace # with actual Giving Day donation link */}
          <a
            href="https://givingday.northeastern.edu/s/fund-details?dc=DN4507-83"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#BF8836] text-white text-lg font-bold rounded-md px-8 py-3 transition-all duration-300 hover:bg-[#a87530] hover:shadow-lg hover:-translate-y-0.5"
          >
            Donate Now →
          </a>
        </div>
      </section>
    </main>
  );
}