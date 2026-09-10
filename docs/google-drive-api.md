# Google Drive API

## Overview

The website uses the Google Drive API to give members access to photos from NSBE events.

After each event, photos are uploaded to a shared Google Drive folder. The website retrieves those photos so members can easily browse, view, and download them without needing direct access to Google Drive.

---

## What It's Used For

The Google Drive API powers the Photo Gallery section of the website.

Examples include photos from:

- General Body Meetings (GBMs)
- Pre-Collegiate Initiative (PCI) events
- TORCH meetings
- Conferences
- Social events
- Community service events
- Special chapter events

---

## How It Works

```
Photos uploaded to Google Drive
              ↓
       Google Drive API
              ↓
    Website retrieves folders
              ↓
 Members browse and download photos
```

Once photos are uploaded to the appropriate Google Drive folder, they become available through the website without needing to upload them separately.

---
## Environment Variables

To access photos stored in Google Drive, you'll also need to add the required credentials to your `.env.local` file.

Example:

```env
GOOGLE_API_KEY=your_api_key_here
GOOGLE_DRIVE_FOLDER_ID=your_folder_id_here
```

These values allow the website to connect to the correct Google Drive folder and retrieve event photos.

> **Note:** Never commit API keys or other sensitive credentials to the repository. Store them in your local `.env.local` file and configure them separately in your deployment environment.

---

## Benefits

Using the Google Drive API allows us to:

- Store photos in one central location
- Avoid uploading the same images twice
- Make event photos easily accessible to members
- Keep the website organized as our photo library grows

---

## Folder Organization

We recommend organizing photos by event and semester.

Example:

```
Photos
│
├── Fall 2026
│   ├── First GBM
│   ├── PCI Resume Workshop
│   ├── TORCH Meeting
│   └── Community Service
│
└── Spring 2027
    ├── NSBE Week
    ├── Elections
    └── End of Year Banquet
```

Keeping a consistent folder structure makes it easier for both members and developers to find content.

---

## Future Improvements

Possible enhancements include:

- Featured photo albums
- Album cover images
- Download entire albums
- Photo captions

---

## Common Issues

If photos are not appearing:

- Verify the Google Drive folder permissions.
- Check that the folder ID is correct.
- Confirm the API credentials are valid.
- Ensure photos have been uploaded to the correct folder.
