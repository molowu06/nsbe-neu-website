# Supabase

## Overview

The NSBE website uses Supabase to store and manage the dynamic content displayed throughout the site.

Right now, we're mainly using it as a database to keep information updated without having to hardcode everything into the website. At the moment, we are **not** using Supabase for authentication or user logins, but that's something we'd like to add in the future.

---

## What We're Using Supabase For

Currently, Supabase stores:

- Executive Board information
- Member of the Month
- Member directory

As the website grows, we'd like to expand its use to support features like:

- User authentication
- Admin dashboard
- Attendance tracking
- Event management
- Member profiles

---

## members

Stores information about current NSBE members.

Potential fields include:

| Column | Description |
|---------|-------------|
| name | Member's full name |
| email | Northeastern email |
| points | attendance points |
| tier | membership type |
| graduation_year | Expected graduation year |
| email | Northeastern email |
| committee | Committee affiliation |

---

## member_of_the_month

Stores the information displayed for the Member of the Month feature.

This may include:

- Name
- Photo
- Short bio or description
- Featured month

---

## eboard-XX-XX

Stores the Executive Board information for the current/past academic year.

This typically includes:

- Name
- Position
- Photo
- Major
- Email
- LinkedIn (if applicable)

---

## How It Fits Into the Website

The website requests data from Supabase whenever a page needs information like executive board members or featured members. Instead of updating the code every time something changes, we can simply update the database and those changes will appear on the website.

```
Website
    ↓
Supabase Database
    ↓
React Components
    ↓
Website Updates
```

---

## Authentication

**Current Status:** Not implemented

One of our long-term goals is to use Supabase Authentication so executive board members or administrators can securely manage website content without editing the code directly.

Possible future authentication methods include:

- Northeastern email login
- Email and password
- Magic links
- Google sign-in

---

## Environment Variables

Supabase requires the following environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

## Future Ideas

As the website continues to grow, we'd like to explore adding:

- Admin dashboard
- Attendance system
- Role-based permissions
- Event management tools
- Member portal
