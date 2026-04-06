"use client"

import { useState } from "react"
import { weeklyNewsletters, monthlyArchives, photoArchives } from "@/lib/newsletters"
import NewsletterViewer from "@/components/NewsletterViewer"

const NewsletterPage = () => {
    const [currentWeekIndex, setCurrentWeekIndex] = useState(0)
    const [activeTab, setActiveTab] = useState<"monthly" | "photos">("monthly")
    const currentWeek = weeklyNewsletters[currentWeekIndex]
    const totalWeeks = weeklyNewsletters.length

    return (
        <div className="bg-black min-h-screen">
            {/* Hero Section */}
            <section className="bg-neutral-900 py-20">
                <div className="mx-auto w-11/12 md:w-2/3 text-center">
                    <h1 className="font-cormorantGaramond text-6xl font-light text-white mb-4">
                        Newsletter & Archives
                    </h1>
                    <p className="font-poppins text-neutral-300 text-lg">
                        Stay updated with our weekly newsletters and browse past event photos
                    </p>
                </div>
            </section>

            {/* Subscribe Section */}
            <section className="bg-black py-16 border-b border-neutral-800">
                <div className="mx-auto w-11/12 md:w-2/3 flex flex-col items-center gap-6">
                    {/* Email Icon */}
                    <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    
                    <h2 className="font-poppins text-2xl font-semibold text-white">
                        Subscribe to Our Newsletter
                    </h2>
                    
                    <p className="font-poppins text-neutral-400 text-center">
                        Get the latest updates, event announcements, and member spotlights delivered to your inbox
                    </p>

                    {/* Email Form */}
                    <form
                        action="https://neu.us3.list-manage.com/subscribe/post?u=8f022d3f56b12ccfcfed63a48&id=29928" 
                        method="POST"
                        target="_blank"
                        className="flex gap-3 w-full md:w-auto"
                    >
                        <input
                            type="email"
                            name="EMAIL"
                            placeholder="Enter your email address"
                            required
                            className="flex-1 md:w-80 px-4 py-3 rounded bg-white text-black font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <button
                            type="submit"
                            className="bg-amber-500 text-black px-8 py-3 rounded font-poppins text-sm font-semibold hover:bg-amber-400 transition duration-150"
                        >
                          Subscribe
                        </button>
                    </form>
                </div>
            </section>

            {/* Weekly Newsletter Viewer */}
            <section className="py-20 border-b border-neutral-800">
                <div className="mx-auto w-11/12 md:w-2/3 flex flex-col gap-10">
                    
                    {/* Section Header */}
                    <div className="flex flex-col gap-2">
                        <h2 className="font-cormorantGaramond text-4xl font-light text-white">
                            {currentWeekIndex === 0 ? "This Week's Newsletter" : "Past Newsletter"}
                        </h2>
                        <p className="font-poppins text-amber-500 text-sm">
                            {currentWeek.date}
                        </p>
                    </div>

                    {/* Newsletter Content */}
                    <NewsletterViewer newsletter={currentWeek} />

                    {/* Week Navigation */}
                    <div className="flex items-center justify-center gap-6 font-poppins text-sm">
                        <button
                            onClick={() => setCurrentWeekIndex(currentWeekIndex + 1)}
                            disabled={currentWeekIndex === totalWeeks - 1}
                            className="text-amber-500 hover:text-amber-400 disabled:text-neutral-600 transition duration-150 text-2xl"
                        >
                            ←
                        </button>
                  
                        {currentWeekIndex > 0 && (
                            <button
                                onClick={() => setCurrentWeekIndex(currentWeekIndex - 1)}
                                className="text-amber-500 hover:text-amber-400 disabled:text-neutral-600 transition duration-150 text-2xl"
                            >
                                →
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Tabs Section */}
            <section className="bg-black py-6 border-b border-neutral-800">
                <div className="mx-auto w-11/12 md:w-2/3 flex gap-8">
                    <button
                        onClick={() => setActiveTab("monthly")}
                        className={`font-poppins text-sm pb-2 border-b-2 transition-colors ${
                            activeTab === "monthly"
                                ? "text-amber-500 border-amber-500"
                                : "text-neutral-400 border-transparent hover:text-neutral-300"
                        }`}
                    >
                        📧 Newsletter Archive
                    </button>
                    <button
                        onClick={() => setActiveTab("photos")}
                        className={`font-poppins text-sm pb-2 border-b-2 transition-colors ${
                            activeTab === "photos"
                                ? "text-amber-500 border-amber-500"
                                : "text-neutral-400 border-transparent hover:text-neutral-300"
                        }`}
                    >
                        📸 Photo Archives
                    </button>
                </div>
            </section>

            {/* Tab Content */}
            {activeTab === "monthly" && (
                <section className="py-20">
                    <div className="mx-auto w-11/12 md:w-2/3 flex flex-col gap-10">
                        <h2 className="font-cormorantGaramond text-4xl font-light text-white text-center mb-8">
                            All Past Newsletters
                        </h2>
                        
                        <div className="flex flex-col gap-4">
                            {monthlyArchives.map((archive) => (
                                <a
                                    key={archive.id}
                                    href={`#`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="border border-amber-500/30 rounded-lg p-6 hover:border-amber-500 transition-colors"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-poppins text-white text-lg font-semibold mb-1">
                                                {archive.title}
                                            </h3>
                                            <p className="font-poppins text-neutral-400 text-sm">
                                                {archive.date}
                                            </p>
                                        </div>
                                        <span className="text-amber-500 text-xl">→</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {activeTab === "photos" && (
                <section className="py-20">
                    <div className="mx-auto w-11/12 md:w-2/3 flex flex-col gap-10">
                        <h2 className="font-cormorantGaramond text-4xl font-light text-white text-center mb-8">
                            Photo Archives
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {photoArchives.map((archive) => (
                                <div key={archive.id} className="border border-amber-500/30 rounded-lg overflow-hidden hover:border-amber-500 transition-colors cursor-pointer">
                                    <div className="h-48 bg-neutral-800 flex items-center justify-center">
                                        <p className="font-poppins text-neutral-500">Photo Gallery</p>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-poppins text-white text-lg font-semibold mb-2">
                                            {archive.title}
                                        </h3>
                                        <p className="font-poppins text-neutral-400 text-sm">
                                            {archive.date} • {archive.photoCount} photos
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

        </div>
    )
}

export default NewsletterPage