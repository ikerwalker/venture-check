# VentureCheck

AI-powered business idea validator for college students and young entrepreneurs.

## About

VentureCheck helps entrepreneurs quickly validate business ideas using structured AI analysis. Users type an idea and receive a market assessment, a recommendation (Pursue / Refine / Pivot), and a confidence level in seconds.

## Tech Stack

- **Next.js** — frontend framework
- **Tailwind CSS** — styling
- **Supabase** — database for saved analyses
- **Vercel** — hosting and auto-deploy
- **Claude API** — AI analysis (coming in future weeks)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/venture-check.git
cd venture-check

# Install dependencies
npm install

# Create environment variables file
cp .env.example .env.local
# Fill in your Supabase credentials in .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file in the root of the project:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### Supabase Setup

Create a table called `core_outputs` with the following columns:

| Column | Type |
|---|---|
| id | int8 (primary key, auto-increment) |
| idea | text |
| analysis | text |
| recommendation | text |
| confidence | text |
| created_at | timestamptz (default: now()) |

Disable RLS (Row Level Security) on this table for development.

## Deployment

Push to the `main` branch on GitHub — Vercel auto-deploys on every push.

## Project Roadmap

| Week | Focus |
|---|---|
| Week 0 | Infrastructure Setup |
| Week 1 | Generative Core Agent |
| Week 2 | Memory Layer |
| Week 3 | Multi-step Agent |
| Week 4 | Polish |
| Week 5 | Final Demo |

## Author

Antonio T. — 2026
