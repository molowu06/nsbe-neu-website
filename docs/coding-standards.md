# Coding Standards

This document outlines coding practices and conventions for contributors working on the NSBE Northeastern website.

---

## General Guidelines

- Write readable and maintainable code
- Avoid unnecessary complexity
- Use meaningful names for variables, functions, and components
- Comment code only when additional context is needed
- Keep files organized and easy for other developers to understand

---

## Naming Conventions

### Components

Use **PascalCase** for React components and component files.

Example:

```tsx
EventCard.tsx
MemberDashboard.tsx
```

---

### Variables and Functions

Use **camelCase** for variables, functions, and methods.

Example:

```tsx
const eventList = []

function fetchEvents() {}
```

---

### Constants

Use **UPPERCASE** for constant values.

Example:

```tsx
const MAX_EVENTS = 10
```

---

## React Guidelines

### Components

When creating React components:

- Keep components small and focused on one responsibility
- Use props instead of creating duplicate components
- Reuse existing components when possible
- Separate logic from UI when appropriate

Example:

Good:

```tsx
<EventCard event={event} />
```

Instead of creating multiple versions:

```tsx
<EventCardForHome />

<EventCardForEventsPage />
```

---

## Git Practices

Commit messages should clearly describe the purpose of a change.

### Good Commit Messages

```text
feat: add event filtering

fix: repair calendar loading issue

docs: update onboarding guide
```

### Avoid

```text
changes

update

stuff

fixed things
```

---

## TypeScript Guidelines

- Define types for component props
- Avoid using `any` unless absolutely necessary
- Use interfaces or types to describe data structures
- Keep type definitions organized and reusable

Example:

```tsx
interface EventProps {
  title: string
  date: string
  location: string
}

function EventCard({ title, date, location }: EventProps) {
  return (...)
}
```
