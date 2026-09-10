# Components

This document provides an overview of reusable React components used throughout the NSBE Northeastern website.

---

## Component Structure

Components are located in:

src/components/

Each component should have:
- A clear purpose
- Reusable functionality
- Consistent styling
- Proper TypeScript types

---

## Navigation Components

### Navbar

**Purpose:**  
Provides navigation between website pages.

**Used on:**
- Home
- About
- Events
- Membership
- Photos

**Features:**
- Desktop navigation
- Mobile menu
- Dropdown menus

---

### Footer

**Purpose:**
Displays website footer information.

Includes:
- Social media links
- Contact information
- Copyright information

---

## Event Components

### EventCard

**Purpose:**
Displays individual event information.

Displays:
- Event name
- Date
- Location
- Event type
- Description

Used on:
- Events page
- Home page featured events section

---

### Calendar

**Purpose:**
Displays upcoming NSBE events in calendar format.

Features:
- Monthly calendar view
- Event selection
- Filtering by event type

---

## Member Components

### MemberCard

**Purpose:**
Displays member information.

Displays:
- Name
- Major
- Graduation year
- Attendance points

Used on:
- Membership page

---

## Component Guidelines

When creating new components:

- Keep components reusable
- Avoid duplicating code
- Use TypeScript props
- Keep styling consistent
- Document complex components
