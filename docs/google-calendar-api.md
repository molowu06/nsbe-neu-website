# Google Calendar API

## Overview

The website uses the Google Calendar API to display upcoming NSBE events directly from our Google Calendar.

Instead of manually updating the website every time a new event is planned, officers can simply add or edit an event in the shared Google Calendar. Those changes are automatically reflected on the website, making it much easier to keep everything up to date.

---

## What It's Used For

The Google Calendar API powers the Events page and displays upcoming chapter events, including:

- General Body Meetings (GBMs)
- Pre- Collegiate Initiative (PCI) events
- TORCH events
- Workshops
- Social events
- Community service events
- Other NSBE programming

---

## How It Works

```
E-Board Officer updates Google Calendar
            ↓
     Google Calendar API
            ↓
      Website fetches data
            ↓
 Events page updates automatically
```

Whenever an event is added, edited, or removed from the Google Calendar, those changes are reflected on the website without needing to modify the code.

---
## Environment Variables

To use the Google Calendar API locally, you'll need to add the required API credentials to your `.env.local` file.

Example:

```env
GOOGLE_API_KEY=your_api_key_here
GOOGLE_CALENDAR_ID=your_calendar_id_here
```

If these values are missing or incorrect, the Events page will not be able to retrieve upcoming events.

> **Note:** API keys should never be committed to GitHub. Keep them in your local `.env.local` file or your deployment platform's environment variables.

---

## Benefits

Using the Google Calendar API allows us to:

- Keep the website up to date automatically
- Avoid entering event information in multiple places
- Reduce manual updates for the software team
- Ensure members always see the latest event schedule

---

## Future Improvements

Potential improvements include:

- Event filtering by committee or event type
- Search functionality
- RSVP integration
- Event reminders
- Calendar view in addition to the current event list

---

## Common Issues

If events are not appearing:

- Verify the Google Calendar is public or shared correctly.
- Check that the API credentials are valid.
- Confirm the calendar ID is correct.
- Review the browser console for API errors.
