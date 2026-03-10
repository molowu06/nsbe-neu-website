export type ArticleItem = {
    id: string 
    title: string
    date: string
    category: string
}

export type EventSection = {
    title: string
    description: string
    image?: string
    links?: { text: string; url: string }[]
}

// Weekly newsletter
export type WeeklyNewsletterItem = {
    id: string
    date: string  // e.g., "February 17, 2026"
    events: EventSection[]
}

// Photo archive
export type PhotoArchiveItem = {
    id: string
    title: string
    date: string
    coverImage: string
    photoCount: number
}