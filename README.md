# Northeastern's National Society of Black Engineers Website
Welcome to the official website repository for the National Society of Black Engineers (NSBE) at Northeastern University.

This website serves as the central hub for chapter members, prospective members, alumni, sponsors, and the executive board. It provides information about events, committees, leadership, newsletters, sponsorship opportunities, and other chapter resources.

---

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase
- Google Calendar API
- Google Drive API
- Vercel
## Getting Started

### Prerequisites

Before running the project, install:

- Node.js
- npm
- Git

### Clone the Repository

```bash
git clone <repository-url>
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file inside the `frontend` directory and add the required environment variables.

(See `docs/setup.md` for the complete configuration.)

### Start the Development Server

```bash
npm run dev
```

Then visit

```
http://localhost:3000
```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

---

## Project Structure

```
frontend/
├── src/
├── data/
├── lib/
├── public/
├── types/
└── docs/
```

---
## Contributing

Members of the NSBE DOT Software Team are encouraged to contribute through feature branches and pull requests.

Before contributing:

1. Pull the latest changes.
2. Create a feature branch.
3. Test your changes locally.
4. Submit a Pull Request for review.

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
