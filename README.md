# Ester R&D — Polymer Research Assistant (powered by R&A Ai)

A responsive, grid-aligned UI for polymer R&D teams to discover chemicals and polymers, triage papers & patents, run quick analyses with **Ask R&A Ai**, and save findings to a personal **Memory**. Built for web (Next.js), deployable on Vercel.

> **Core pages:** Dashboard · Molecules · Polymers · Papers · Patents · Sources · Memory · Activity · Settings

---

## ✨ Highlights

- **Domain-aware UI** for polymers:
  - Structure search (Name/CAS/SMILES; Similarity/Substructure/Exact)
  - Polymer filters by **Tg / Tm / Modulus** and process (Step-growth, ROP, ATRP, RAFT, …)
  - Feeds for **papers** (OpenAlex) and **patents** (The Lens)
- **Global action bar** on every card  
  **Ask R&A Ai** (primary) · Save to Memory · Open Source · (Add to Basket / Compare)
- **Ask-AI Drawer** with context (chemical/polymer/paper/patent) + quick prompts
- **Memory** library with notes, tags, compare, and export (CSV/BibTeX/RIS/ZIP)
- **Design Assistant** (Polymers) using your Basket to create **hypothesis** entries
- **Sources** manager with crawl health & recent errors
- **Activity / Analytics** dashboard (KPIs, charts, funnel, logs)
- **Strict alignment & responsiveness**: centered container, 12/8/1 grid, sticky bars
- **Accessibility**: keyboardable, visible focus, aria labels, WCAG AA palette

---

## 🧭 Routes

- `/dashboard` — activity feed + workbench + memory rail  
- `/molecules` — structure search, filters, detail + compare  
- `/polymers` — property/process filters, compare, **Design Assistant**  
- `/papers` — literature triage + digest  
- `/patents` — IP scanning + claims/family views  
- `/sources` — connectors (PubChem, PoLyInfo, OpenAlex, Lens, domains/RSS)  
- `/memory` — saved items, notes, compare, export (incl. **hypotheses**)  
- `/activity` — usage analytics (KPIs/charts/funnel/logs)  
- `/settings` — profile/org/roles, API/webhooks, appearance, data & exports

---

## 🧩 Tech & Conventions

- **Next.js 15** (App Router) + **Tailwind CSS**
- Pages are **server components** that read URL params via the **`searchParams` prop**.  
  Client UI lives in child components receiving props.  
  > Avoid `useSearchParams()` inside `page.tsx` to prevent CSR bailouts and Vercel build errors.
- State in URL for shareable, reload-safe views.
- Toasts for feedback; consistent button tokens (primary/secondary/subtle).
- Simple SVG charts (or Recharts if available) for Activity.

---

## 🧪 Data Sources (planned connectors)

- **PubChem** — chemical IDs & properties (PUG REST)  
- **NIMS PoLyInfo** — polymer properties, monomers & processes  
- **OpenAlex** — scholarly articles & metadata  
- **The Lens** — patents & legal status  
- **Domains / RSS** — company sites, journals, news

> Current app uses **seeded demo data**; wire real APIs in `/sources` when keys are available.

---

## 🧱 Design System

- **Container:** max-width `1280px`; `margin-inline:auto`; page padding `24px` (desktop) / `16px` (mobile)  
- **Grid:** 12 cols / 24px gutters (desktop); 8 cols / 16px (tablet); 1 col (mobile)  
- **Type:** Inter/Montserrat — H1 28/36, H2 22/30, H3 18/26, body 14/22  
- **Palette:**  
  Primary `#1E40AF`, Success `#059669`, Warning `#D97706`,  
  Page `#F8FAFC`, Card `#FFFFFF`, Border `#E2E8F0`, Ink `#0F172A/#475569`  
- **Cards:** 1px border, 10px radius, soft shadow; section spacing 32–40px; card padding 16–20px  
- **A11y:** keyboard navigation, aria-labels for icon buttons, visible focus, no color-only states

---

## 🚀 Quickstart

```bash
# Node 18+
pnpm i           # or: yarn / npm install
pnpm dev         # http://localhost:3000
pnpm build       # production build
pnpm start       # run production build locally