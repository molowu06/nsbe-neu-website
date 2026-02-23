import EBoardSection from "./components/EBoardSection";

export default function AboutPage() {
  return (
    <main>

       {/* BANNER */}
      <section className="bg-gray-900 text-white py-4 px-6">
        <div className="max-w-5xl mx-auto flex flex-row items-center gap-8">
          {/* logo — left */}
          <img
            src="/images/bess-logo.png"
            alt="BESS Logo"
            className="w-36 md:w-48 object-contain flex-shrink-0"
          />
          {/* text — right */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About BESS-NSBE
            </h1>
            <p className="text-lg text-gray-300">
              Our mission, history, and the leaders driving our chapter forward
            </p>
          </div>
        </div>
      </section>

      {/* HISTORY */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            {/* history header */}
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our History</h2>

            {/* NSBE national history */}
            <p className="text-gray-600 mb-4">
              The National Society of Black Engineers (NSBE) is one of the largest
              student-governed organizations in the world, with over 500 collegiate
              chapters across the country supporting Black engineers at every stage
              of their academic journey.
            </p>

            {/* BESS history */}
            <p className="text-gray-600 mb-6">
              Northeastern's chapter, the Black Engineering Student Society (BESS),
              was founded on April 18, 1974 by Harold C. Hunte and Harold Blake,
              two students who saw the need for community among Black engineers on
              campus. In 1975, BESS became an official NSBE collegiate chapter, and
              has been a pillar of support for Black engineering students at
              Northeastern ever since.
            </p>

            {/* bolded section */}
            <p className="font-bold text-gray-900">
              For over 50 years, NSBE and BESS have been committed to the academic
              and professional success of Black engineering students and professionals.
            </p>
          </div>

          {/* history picture */}
          <div className="flex-1">
            <img
              src="/images/bess-eboard.jpg"
              alt="BESS-NSBE EBoard"
              className="w-full rounded-lg shadow-md object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

        </div>
      </section>

      {/* MISSION & VISION CARDS */}
          <section className="bg-gray-50 py-20 px-6">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6">

              {/* mission card - gold background */}
              <div className="flex-1 bg-[#BF8836] rounded-2xl p-8 transition-transform duration-300 hover:scale-105">
                <h3 className="text-xl font-bold text-white mb-4">Our Mission</h3>
                {/* mission statement */}
                <p className="text-white">
                  To increase the number of culturally responsible Black Engineers
                  who excel academically, succeed professionally, and positively
                  impact the community.
                </p>
              </div>

              {/* vision card - dark background */}
              <div className="flex-1 bg-gray-900 rounded-2xl p-8 transition-transform duration-300 hover:scale-105">
                <h3 className="text-xl font-bold text-white mb-4">Our Vision</h3>
                {/* vision statement */}
                <p className="text-gray-300">
                  To build on a 50-year legacy by creating a chapter where every
                  member thrives academically, professionally, and beyond.
                </p>
              </div>
            </div>
          </section>

          {/* ADVISOR */}
          <section className="bg-white py-20 px-6">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">

              {/* left side: advisor photo */}
              <div className="flex-shrink-0">
                <img
                  src="/headshots/dean-harris.jpg"
                  alt="Dean Harris"
                  className="w-64 h-64 rounded-full object-cover object-top shadow-lg"
                />
              </div>

              {/* right side: name, title, bio */}
              <div className="flex-1">
                {/* Section label */}
                <p className="text-amber-500 font-semibold uppercase tracking-wide text-sm mb-2">
                  Our Advisor
                </p>
                {/* Replace with full name */}
                <h2 className="text-3xl font-bold text-gray-900 mb-1">
                  Dean Richard Harris
                </h2>
                {/* Title */}
                <p className="text-gray-500 mb-4">
                  Associate Dean of Engineering, Northeastern University
                </p>
                {/* Advisor bio */}
                <p className="text-gray-600">
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
