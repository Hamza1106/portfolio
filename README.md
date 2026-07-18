<div align="center">

# ⚡ Future Forge

### The portfolio of Hamza Akhtar — AI Automation Expert & Creative Developer

A cinematic, story-driven single-page portfolio. Built as a fast, static React SPA — no server, no SSR, just a fully client-rendered experience with 3D, motion, and a built-in AI assistant.

</div>

---

## ✨ Highlights

- **Storybook hero intro** — an animated narrative sequence that eases visitors into the page
- **3D project vault** — a metal cabinet UI holding interactive project "boxes," each opening into a full case study
- **Live 3D planet** — a `react-three-fiber` scene rendered inside the contact section
- **Built-in AI agent** — a floating chat widget (powered by Groq's Llama 3.3) that answers visitor questions about Hamza's skills, projects, and how to hire him
- **Fully responsive** — collapsible mobile nav, fluid breakpoints across hero, projects, and contact sections
- **Zero backend** — a pure static SPA, deployable anywhere that serves static files

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Routing | TanStack Router (file-based, client-side only) |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| 3D | react-three-fiber · drei · three.js |
| Data fetching | TanStack Query |
| AI | Groq API (Llama 3.3 70B) |
| UI primitives | Radix UI |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm (or bun)

### Installation

\`\`\`bash
git clone <your-repo-url>
cd future-forge-portfolio-spa
npm install
\`\`\`

### Environment variables

Create a `.env` file in the project root:

\`\`\`env
VITE_GROQ_API_KEY=your_groq_api_key_here
\`\`\`

> Get a free API key at [console.groq.com](https://console.groq.com). Without this key, the AI chat widget will show a fallback error message — the rest of the site works fine regardless.

### Run locally

\`\`\`bash
npm run dev
\`\`\`

Visit **http://localhost:3000**.

### Build for production

\`\`\`bash
npm run build
\`\`\`

Outputs a fully static site to `dist/` — ready for any static host.

### Preview the production build

\`\`\`bash
npm run preview
\`\`\`

---

## 📁 Project Structure

\`\`\`
├── public/                        # Static assets (favicon, robots.txt)
├── src/
│   ├── assets/                    # Images, textures, 3D models (.glb)
│   ├── components/                # All UI components
│   │   ├── ui/                    # shadcn/Radix primitives
│   │   └── StreamlitWidget.tsx    # Floating AI assistant
│   ├── data/                      # Static project/content data
│   ├── hooks/                     # Custom hooks
│   ├── lib/                       # Utilities
│   ├── routes/                    # TanStack Router file-based routes
│   ├── App.tsx                    # Root app shell
│   ├── main.tsx                   # Vite entry point
│   ├── router.tsx                 # Router instance
│   └── styles.css                 # Global styles & Tailwind theme
├── index.html                     # SPA entry HTML
├── vite.config.ts                 # Vite configuration
└── vercel.json                    # SPA rewrite rules for deployment
\`\`\`

---

## ☁️ Deployment (Vercel)

This project deploys as a **static site** — no server runtime required.

1. Push the repo to GitHub
2. Import it into [Vercel](https://vercel.com/new)
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Add the environment variable `VITE_GROQ_API_KEY` under **Project Settings → Environment Variables**
7. Deploy 🚀

The included `vercel.json` handles SPA routing so refreshing any page never 404s.

---

## 🔒 Security Note

The AI assistant calls the Groq API directly from the browser, meaning the API key is bundled client-side and visible in network requests. For production use at scale, consider proxying the request through a lightweight serverless function so the key never leaves the server.

---

## 🔗 Connect with Hamza

- **Fiverr:** [fiverr.com/orbit_flow](https://www.fiverr.com/orbit_flow)
- **GitHub:** [github.com/Hamza1106](https://github.com/Hamza1106)
- **LinkedIn:** [linkedin.com/in/hamza-akhtar-8ab424415](https://linkedin.com/in/hamza-akhtar-8ab424415/)
- **Email:** hamzaqureshi0128@gmail.com

---

<div align="center">
Crafted with code, coffee, and a little bit of AI magic ☕✨
</div>