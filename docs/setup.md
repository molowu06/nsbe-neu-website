# Setup Guide

## Clone Repository

```bash
git clone <repository-url>
cd frontend
```

## Install Dependencies

```bash
npm install
```

## Environment Variables

Create:

```
.env.local
```

Required variables:

```
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=

GOOGLE_API_KEY=

GOOGLE_CLIENT_ID=
```
> **Note:** API keys should never be committed to GitHub. Keep them in your local `.env.local` file or your deployment platform's environment variables.

## Run

```bash
npm run dev
```

Visit

```
localhost:3000
```
