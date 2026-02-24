import EBoardSection from "./components/EBoardSection";

export default function AboutPage() {
  return (
    <main>
      {/* BANNER */}
      <section className="bg-gray-900 text-white py-4 px-4 sm:px-6">
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
              About BESS-NSBE
            </h1>
            <p className="text-base sm:text-lg text-gray-300">
              Our mission, history, and the leaders driving our chapter forward
            </p>
          </div>
        </div>
      </section>

      {/* HISTORY */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="flex-1">
            {/* history header */}
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Our History</h2>

            {/* NSBE national history */}
            <p className="text-gray-600 mb-2 sm:mb-4 text-sm sm:text-base">
              The National Society of Black Engineers (NSBE) is one of the largest
              student-governed organizations in the world, with over 500 collegiate
              chapters across the country supporting Black engineers at every stage
              of their academic journey.
            </p>

            {/* BESS history */}
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Northeastern's chapter, the Black Engineering Student Society (BESS),
              was founded on April 18, 1974 by Harold C. Hunte and Harold Blake,
              two students who saw the need for community among Black engineers on
              campus. In 1975, BESS became an official NSBE collegiate chapter, and
              has been a pillar of support for Black engineering students at
              Northeastern ever since.
            </p>

            {/* bolded section */}
            <p className="font-bold text-gray-900 text-sm sm:text-base">
              For over 50 years, NSBE and BESS have been committed to the academic
              and professional success of Black engineering students and professionals.
            </p>
          </div>

          {/* history picture */}
          <div className="flex-1 w-full max-w-xs sm:max-w-sm md:max-w-full">
            <img
              src="/images/bess-eboard.jpg"
              alt="BESS-NSBE EBoard"
              className="w-full rounded-lg shadow-md object-cover transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* MISSION & VISION CARDS */}
      <section className="bg-gray-50 py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-4 md:gap-6">
          {/* mission card - gold background */}
          <div className="flex-1 bg-[#BF8836] rounded-2xl p-6 sm:p-8 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-4">Our Mission</h3>
            {/* mission statement */}
            <p className="text-white text-sm sm:text-base">
              To increase the number of culturally responsible Black Engineers
              who excel academically, succeed professionally, and positively
              impact the community.
            </p>
          </div>

          {/* vision card - dark background */}
          <div className="flex-1 bg-gray-900 rounded-2xl p-6 sm:p-8 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-4">Our Vision</h3>
            {/* vision statement */}
            <p className="text-gray-300 text-sm sm:text-base">
              To build on a 50-year legacy by creating a chapter where every
              member thrives academically, professionally, and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* ADVISOR */}
      <section className="bg-white py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          {/* left side: advisor photo */}
          <div className="flex-shrink-0 mb-6 md:mb-0">
            <img
              src="/headshots/dean-harris.jpg"
              alt="Dean Harris"
              className="w-48 h-48 sm:w-64 sm:h-64 rounded-full object-cover object-top shadow-lg mx-auto md:mx-0 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
            />
          </div>

          {/* right side: name, title, bio */}
          <div className="flex-1 text-center md:text-left">
            {/* Section label */}
            <p className="text-amber-500 font-semibold uppercase tracking-wide text-xs sm:text-sm mb-2">
              Our Advisor
            </p>
            {/* Replace with full name */}
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1">
              Dean Richard Harris
            </h2>
            {/* Title */}
            <p className="text-gray-500 mb-2 sm:mb-4 text-xs sm:text-base">
              Associate Dean of Engineering, Northeastern University
            </p>
            {/* Advisor bio */}
            <p className="text-gray-600 text-xs sm:text-base">
              Dean Harris serves as the faculty advisor for BESS-NSBE at
              Northeastern University. He has been a dedicated supporter of
              Black engineering students on campus, helping guide the chapter
              in its mission to foster academic excellence and professional
              development.
            </p>
          </div>
        </div>
      </section>
      <EBoardSection />
    </main>
  );
}
