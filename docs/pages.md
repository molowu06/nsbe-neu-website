# Website Pages

This document provides an overview of each page on the NSBE Northeastern website, its purpose, where its content comes from, and how to update it.

---

## Home

### Purpose

The Home page serves as the main landing page for the website. It introduces visitors to NSBE Northeastern, highlights the chapter's mission, encourages membership, showcases upcoming events, and provides quick access to important information.

### Page Sections

- Hero Section
- Mission statement
- Core values
- Membership call-to-action
- Donate section
- Upcoming Events
- Frequently Asked Questions (FAQ)

### Data Sources

Google Calendar API (Upcoming Events)

### How to Update

- Update hero images or text in the homepage component.
- Edit mission statement or other static content directly in the component or data file.
- Update FAQs in the FAQ component or data file.
- Add or edit events through the shared Google Calendar.

---

## About

### Purpose

The About page introduces visitors to NSBE and the Northeastern chapter.

It includes information about:

- What NSBE is
- What BESS is
- Our mission
- Chapter goals

The About page also contains an **Executive Board** dropdown that allows visitors to:

- View the current Executive Board
- Browse archived Executive Boards from previous academic years

### Data Sources

- Static website content
- Supabase (Executive Board information)

Current Supabase tables include:

- eboard-26-27
- eboard-25-26 (archive)

### How to Update

- Update About page content in the page component.
- Update Executive Board members in the appropriate Supabase table.
- Archived Executive Boards should remain available for previous years.

---

## Events

### Purpose

The Events page displays all upcoming chapter events throughout the semester.

The page includes:

- Featured event (highlighted at the top)
- Calendar view
- List view
- Event filters

Members can filter events by category, including:

- General Body Meetings (GBMs)
- PCI Events
- TORCH
- Other chapter programming

### Data Source

Google Calendar API

### How to Update

Events are managed entirely through the shared Google Calendar.

To update events:

1. Add or edit an event in Google Calendar.
2. The website automatically displays the changes.

No code changes are required.

---

## Membership

### Purpose

The Membership page highlights chapter members and recognizes participation throughout the academic year.

The page includes:

- Current member roster
- Attendance points leaderboard (sorted from highest to lowest)
- Member of the Month

### Data Sources

Supabase

Tables include:

- members
- member_of_the_month

### How to Update

#### Members

Update the **members** table in Supabase.

#### Attendance Points

Update attendance points within the **members** table.

The leaderboard will automatically update based on the stored values.

#### Member of the Month

Update the **member_of_the_month** table in Supabase.

---

## Photos

### Purpose

The Photos page allows members to browse and download photos from chapter events.

Photo albums may include:

- GBMs
- PCI Events
- TORCH
- Conferences
- Community Service
- Social Events
- Other chapter programming

### Data Source

Google Drive API

### How to Update

1. Upload event photos to the shared Google Drive.
2. Organize photos into the appropriate event folder.
3. The website automatically retrieves and displays the photos.

---

## Future Pages

The following pages are planned for future development:

### Programs

A dedicated page highlighting chapter programs and initiatives such as:

- PCI
- TORCH
- Mentorship
- Academic Excellence
- Other chapter programs

---

### Alumni

A page recognizing NSBE Northeastern alumni.

Potential features include:

- Alumni directory
- Career information
- Alumni spotlights
- Ways to stay connected

---

### Sponsors

A page recognizing our corporate sponsors and partners.

Potential content includes:

- Sponsor logos
- Company descriptions
- Sponsorship levels
- Links to company websites
- Information for prospective sponsors
