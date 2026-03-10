import Image from "next/image"
import type { WeeklyNewsletterItem } from "@/types"

interface Props {
    newsletter: WeeklyNewsletterItem
}

const NewsletterViewer = ({ newsletter }: Props) => {
    return (
        <div className="flex flex-col gap-10">
            {/* Event Sections */}
            <div className="flex flex-col gap-8">
                {newsletter.events.map((event) => (
                    <div key={event.title} className="flex flex-col gap-4 border-b border-amber-500/30 pb-8">
                        <h3 className="font-cormorantGaramond text-4xl text-amber-500 font-bold">
                            {event.title}
                        </h3>
                        {event.image && (
                            <Image
                                src={event.image}
                                alt={event.title}
                                width={600}
                                height={300}
                                className="w-full object-cover rounded-lg"
                            />
                        )}
                        <p className="font-poppins text-neutral-100 leading-relaxed text-base">
                            {event.description}
                        </p>
                        {event.links && (
                            <div className="flex gap-3">
                                {event.links.map((link) => (
                                    <a
                                        key={link.text}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-amber-500 text-black px-6 py-3 font-poppins text-sm font-semibold hover:bg-amber-400 transition duration-150 rounded"
                                    >
                                        {link.text}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewsletterViewer