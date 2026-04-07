"use client"

import { useState, useEffect } from "react"
import { photoArchives } from "@/lib/newsletters"

type Campaign = {
    id: string
    title: string
    subject: string
    previewText: string
    sendTime: string
    archiveUrl: string
}

const NewsletterPage = () => {
    const [activeTab, setActiveTab] = useState<"newsletters" | "photos">("newsletters")
    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/newsletters")
            .then(res => res.json())
            .then(data => {
                setCampaigns(data.campaigns)
                setLoading(false)
            })
    }, [])

    const currentCampaign = campaigns[currentIndex]
    const total = campaigns.length

    return (
        <div className="bg-black min-h-screen">

            {/* Hero */}
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

            {/* Subscribe */}
            <section className="bg-black py-16 border-b border-neutral-800">
                <div className="mx-auto w-11/12 md:w-2/3 flex flex-col items-center gap-6">
                    <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="font-poppins text-2xl font-semibold text-white">Subscribe to Our Newsletter</h2>
                    <p className="font-poppins text-neutral-400 text-center">
                        Get the latest updates, event announcements, and member spotlights delivered to your inbox
                    </p>
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

            {/* Newsletter Viewer */}
            <section className="py-20 border-b border-neutral-800">
                <div className="mx-auto w-11/12 md:w-2/3 flex flex-col gap-10">

                    {loading ? (
                        <p className="font-poppins text-neutral-400 text-center">Loading newsletters...</p>
                    ) : currentCampaign ? (
                        <>
                            {/* Header */}
                            <div className="flex flex-col gap-2">
                                <h2 className="font-cormorantGaramond text-4xl font-light text-white">
                                    {currentIndex === 0 ? "This Week's Newsletter" : "Past Newsletter"}
                                </h2>
                                <p className="font-poppins text-amber-500 text-sm">
                                    {new Date(currentCampaign.sendTime).toLocaleDateString("en-US", {
                                        year: "numeric", month: "long", day: "numeric"
                                    })}
                                </p>
                                <p className="font-poppins text-white text-lg font-semibold">
                                    {currentCampaign.subject}
                                </p>
                            </div>

                            {/* Iframe */}
                            <iframe
                                src={currentCampaign.archiveUrl}
                                className="w-full rounded-lg border border-amber-500/30"
                                style={{ height: "800px" }}
                                title={currentCampaign.subject}
                            />

                            {/* Navigation */}
                            <div className="flex items-center justify-center gap-10 font-poppins text-sm">
                                <button
                                    onClick={() => setCurrentIndex(currentIndex - 1)}
                                    disabled={currentIndex === 0}
                                    className="text-amber-500 hover:text-amber-400 disabled:text-neutral-600 transition duration-150 text-2xl"
                                >
                                    ←
                                </button>
                                <span className="text-neutral-500 text-sm">
                                    {currentIndex + 1} / {total}
                                </span>
                                <button
                                    onClick={() => setCurrentIndex(currentIndex + 1)}
                                    disabled={currentIndex === total - 1}
                                    className="text-amber-500 hover:text-amber-400 disabled:text-neutral-600 transition duration-150 text-2xl"
                                >
                                    →
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="font-poppins text-neutral-400 text-center">No newsletters found.</p>
                    )}
                </div>
            </section>

            {/* Tabs */}
            <section className="bg-black py-6 border-b border-neutral-800">
                <div className="mx-auto w-11/12 md:w-2/3 flex gap-8">
                    <button
                        onClick={() => setActiveTab("newsletters")}
                        className={`font-poppins text-sm pb-2 border-b-2 transition-colors ${
                            activeTab === "newsletters"
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

            {/* Newsletter Archive Tab */}
            {activeTab === "newsletters" && (
                <section className="py-20">
                    <div className="mx-auto w-11/12 md:w-2/3 flex flex-col gap-4">
                        <h2 className="font-cormorantGaramond text-4xl font-light text-white text-center mb-8">
                            All Past Newsletters
                        </h2>
                        {campaigns.map((campaign, index) => (
                            <button
                                key={campaign.id}
                                onClick={() => {
                                    setCurrentIndex(index)
                                    window.scrollTo({ top: 0, behavior: "smooth" })
                                }}
                                className="border border-amber-500/30 rounded-lg p-6 hover:border-amber-500 transition-colors text-left w-full"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-poppins text-white text-lg font-semibold mb-1">
                                            {campaign.subject}
                                        </h3>
                                        <p className="font-poppins text-neutral-400 text-sm">
                                            {new Date(campaign.sendTime).toLocaleDateString("en-US", {
                                                year: "numeric", month: "long", day: "numeric"
                                            })}
                                        </p>
                                        {campaign.previewText && (
                                            <p className="font-poppins text-neutral-500 text-xs mt-1">
                                                {campaign.previewText}
                                            </p>
                                        )}
                                    </div>
                                    <span className="text-amber-500 text-xl">→</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {/* Photo Archives Tab */}
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
                                        <h3 className="font-poppins text-white text-lg font-semibold mb-2">{archive.title}</h3>
                                        <p className="font-poppins text-neutral-400 text-sm">{archive.date} • {archive.photoCount} photos</p>
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