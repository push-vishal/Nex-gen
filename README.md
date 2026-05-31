# Next-Gen Student Learning Dashboard

A high-fidelity, interactive, and responsive student learning dashboard prototype. Built with Next.js App Router (React Server Components), styled using a cosmic dark-mode theme in Tailwind CSS, and animated with Framer Motion. Data is fetched in real-time from a Supabase PostgreSQL database.

---

## 🚀 Key Features

*   **Bento Grid Layout:** A premium, asymmetrical grid structuring widgets cleanly across desktop, tablet, and mobile dimensions.
*   **Zero Layout Shift (CLS):** Pre-rendered custom Suspense skeletons guarantee layout stability while fetching data.
*   **Rich Interaction Design:** Card hover scales, glowing border transformations, and sliding active indicators powered by Framer Motion's spring-physics and layout animations.
*   **RSC Data Fetching:** Dynamic, secure database retrieval via Next.js Server Components with direct caching disabled (`revalidate = 0`).
*   **Fail-safe Demo Mode:** If Supabase keys are missing or invalid, the custom error boundary intercepts the error and lets you launch the dashboard in a fully interactive local **Mock Demo Mode**.

---

## 🛠️ Tech Stack

*   **Framework:** Next.js 16 (App Router)
*   **Database:** Supabase (PostgreSQL)
*   **Styling:** Tailwind CSS v4 (Cosmic Theme)
*   **Animations:** Framer Motion (Spring Physics & layoutId)
*   **Icons:** Lucide React

---

## 📁 Architecture & File Structure

```text
├── app/
│   ├── error.tsx        # Custom Error Boundary with setup guide & Demo Mode toggle
│   ├── globals.css      # Tailwind v4 configuration, global dark-mode styles, and glow animations
│   ├── layout.tsx       # Root document layout, SEO headers, and fonts
│   ├── loading.tsx      # Exact-ratio pulsing skeletons to prevent layout shift
│   └── page.tsx         # Async Server Component: fetches live course data from Supabase
├── components/
│   ├── ActivityTile.tsx # Learning consistency heatmap contribution grid with hover tooltips
│   ├── BentoGrid.tsx    # Semantic grid container with staggered layout entrance animations
│   ├── CourseCard.tsx   # Individual course tile with spring physics hovers and animated progress bars
│   ├── HeroTile.tsx     # Large greeting panel with interactive daily learning streak indicator
│   └── Sidebar.tsx      # Responsive sidebar (collapses to icons on tablet; converts to bottom nav on mobile)
├── lib/
│   ├── supabase.ts      # Supabase client instantiation with fallback diagnostics
│   └── types.ts         # TypeScript schema definitions for data payloads
├── supabase_seed.sql    # Database schema creation and initial mock data insertion script
├── .env.example         # Template environment file
└── .env.local           # Local environment credentials (ignored from VCS)
```

---

## ⚙️ Setup & Installation

### 1. Clone & Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1.  Create a free project on [Supabase](https://supabase.com).
2.  Navigate to the **SQL Editor** in your Supabase dashboard and click **New Query**.
3.  Paste the contents of [supabase_seed.sql](file:///C:/Users/Vishal/Desktop/Nex-Gen/supabase_seed.sql) and run it. This will create the `courses` table, configure public read policies, and insert sample data.
4.  Copy the **Project URL** and **API Key (Anon)** from your project settings.

### 3. Setup Environment Variables

Rename `.env.example` to `.env.local` and enter your Supabase keys:

```ini
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-api-key
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your dashboard.

---

## 🧠 Architectural Insights

### The Server / Client Split
*   **Server Component (`app/page.tsx`):** Acts as the data entry point. It makes a secure network fetch to Supabase on the server side, keeping database credentials protected and eliminating client-side fetch waterfalls.
*   **Client Components (`components/*`):** Handle interactive states, custom animations, drag/hover events, and local reactive state (like clicking the learning streak to trigger animations or hovering over heatmap blocks to view SVG tooltip popovers).

### Overcoming Challenges
*   **TypeScript Incompatibility:** In Framer Motion, transition properties like `type: 'spring'` can sometimes be typed generically as `string`, conflicting with rigid union typing. Resolving this required strict TypeScript `Variants` typing annotations to lock down keyframe transition shapes.
*   **Zero Layout Shift:** To prevent shifting when database queries resolve, we constructed exact-aspect skeleton grids in `app/loading.tsx` so the viewport remains stable throughout the loading pipeline.
