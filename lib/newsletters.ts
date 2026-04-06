import type { WeeklyNewsletterItem, monthlyArchiveItem, PhotoArchiveItem } from "@/types"

export const weeklyNewsletters: WeeklyNewsletterItem[] = [
    {
        id: "feb-17-2026",
        date: "February 17, 2026",
        events: [
            {
                title: "Shadow Initiative",
                description: "Are you interested in joining the NSBE E-Board? The Shadow Initiative is an opportunity to learn how to do an E-Board position of your choosing.",
                image: "/Shadow-Initiative.png",
                links: [{ text: "Sign Up", url: "https://forms.gle/qnm5xe6uC9sKfa7f6" }]
            },
            {
                title: "Mentorship Program",
                description: "Connect with experienced engineers and build valuable relationships through our mentorship program.",
                image: "/Mentorship-Program.png",
                links: [{ text: "Join", url: "https://forms.gle/qnm5xe6uC9sKfa7f6" }]
            },
            {
                title: "Tutoring Sessions",
                description: "Get help with your coursework from fellow NSBE members. All engineering disciplines welcome!",
                image: "/Tutoring-Session.png",
                links: [{ text: "Schedule", url: "https://forms.gle/qnm5xe6uC9sKfa7f6" }]
            },
            {
                title: "Boston Mixer",
                description: "Network with NSBE members from across the Boston area. Food and refreshments provided!",
                image: "/Boston-Mixer.png",
                links: [{ text: "RSVP", url: "https://forms.gle/qnm5xe6uC9sKfa7f6" }]
            },
            {
                title: "Shark Tank Competition",
                description: "Pitch your startup idea to a panel of judges for a chance to win funding and mentorship!",
                image: "/Shark-Tank.png",
                links: [{ text: "Register", url: "https://forms.gle/qnm5xe6uC9sKfa7f6" }]
            },
        ]
    },
    {
        id: "feb-10-2026",
        date: "February 10, 2026",
        events: [
            {
                title: "Sample Event",
                description: "This is a placeholder for the previous week.",
                links: [{ text: "Learn More", url: "#" }]
            },
        ]
    }
]

export const monthlyArchives: monthlyArchiveItem[] = [
    // February 2026
    {
        id: "feb-2026",
        title: "February 2026",
        date: "5 newsletters",
        coverImage: "",
        photoCount: 0
    },
    // January 2026
    {
        id: "jan-2026",
        title: "January 2026",
        date: "4 newsletters",
        coverImage: "",
        photoCount: 0
    },
    // December 2025
    {
        id: "dec-2025",
        title: "December 2025",
        date: "4 newsletters",
        coverImage: "",
        photoCount: 0
    },
]

export const photoArchives: PhotoArchiveItem[] = [
    {
        id: "fall-career-fair-2025",
        title: "Fall 2025 Career Fair",
        date: "October 15, 2025",
        coverImage: "/placeholder.jpg",
        photoCount: 45
    },
    {
        id: "thanksgiving-social-2025",
        title: "Thanksgiving Social",
        date: "November 22, 2025",
        coverImage: "/placeholder.jpg",
        photoCount: 32
    },
    {
        id: "homecoming-2025",
        title: "Homecoming Week 2025",
        date: "October 5, 2025",
        coverImage: "/placeholder.jpg",
        photoCount: 67
    },
]