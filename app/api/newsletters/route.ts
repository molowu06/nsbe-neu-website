export async function GET() {
    const dc = process.env.MAILCHIMP_DC
    const apiKey = process.env.MAILCHIMP_API_KEY

    const res = await fetch(
        `https://${dc}.api.mailchimp.com/3.0/campaigns?status=sent&count=50&sort_field=send_time&sort_dir=DESC`,
        {
            headers: { Authorization: `Bearer ${apiKey}` },
            next: { revalidate: 3600 }
        }
    )

    const data = await res.json()

    const campaigns = data.campaigns.map((c: any) => ({
        id: c.id,
        title: c.settings.title,
        subject: c.settings.subject_line,
        previewText: c.settings.preview_text,
        sendTime: c.send_time,
        archiveUrl: c.long_archive_url,
    }))

    return Response.json({ campaigns })
}