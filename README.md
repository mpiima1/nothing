# Nothing Store

A satirical e-commerce platform that sells nothing, but makes it premium. Performance art disguised as a functional web store.

## What Is This?

A commentary on consumer culture, marketing hype, and modern capitalism. Every product is nothing—carefully packaged, artfully presented, and delivered with deadpan professionalism. The joke only works if you commit to the bit.

**Original file:** `nothing.js` — The source that became this Next.js project.

## Quick Start

```bash
npm install
npm run dev
```

Visit [https://s7ty3.com/](https://s7ty3.com/)

![Landing Page](https://raw.githubusercontent.com/mpiima1/nothing/main/public/landing.png)

## Features

- **Premium Nothing**: Four tiers of artisanal emptiness (Premium, Deluxe, Ultimate, Start)
- **Multi-Currency**: USD, EUR, GBP, JPY support
- **Cart System**: Full shopping cart with add/remove functionality
- **PDF Certificates**: Downloadable authenticity certificates for your Nothing

<p align="center">
  <img src="https://raw.githubusercontent.com/mpiima1/nothing/main/public/certificate.png" alt="Certificate Preview" width="500"/>
</p>

- **Random Prime Counter**: "Nothings Sold Today" uses a random prime between 100-2000 (computed fresh on each page load)

## Environment Variables

**Important:** Never commit actual `.env` files or secrets. Only `.env.local.example` (template) is in the repo.


Copy `.env.local.example` to `.env.local`:

```env
NEXT_PUBLIC_STORE_NAME="Nothing Store"
NEXT_PUBLIC_CURRENCY="USD"          # Options: USD, EUR, GBP, JPY
NEXT_PUBLIC_CURRENCY_SYMBOL="$"     # Auto-mapped based on currency
NEXT_PUBLIC_PRODUCT_VARIANTS="premium,deluxe,ultimate,start"
NEXT_PUBLIC_DEMO_MODE="true"        # Show demo mode warnings
NEXT_PUBLIC_ENABLE_ANALYTICS="false"
# GITHUB_PAGES=true                 # Set at build time for GitHub Pages deployment
```

## Project Structure

```
nothing-store/
├── app/
│   ├── layout.js          # Root layout with metadata
│   └── page.js            # Entry point importing NothingStore
├── components/
│   ├── NothingStore.js     # Main satirical component
│   ├── AnimatedVoid.jsx   # Background effect
│   ├── EnhancedButton.jsx # Hover glow effects
│   ├── ProductCard.jsx    # Product display
│   ├── CartDrawer.jsx     # Slide-out cart
│   └── Certificate.jsx    # PDF certificate
├── lib/
│   ├── products.js        # Product configuration
│   ├── currency.js        # Currency formatting
│   └── pdf.js             # PDF generation
├── styles/
│   └── globals.css        # Tailwind + animations
├── public/
├── .env.local.example
└── vercel.json
```

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint checks
npm audit        # Security audit
```

## Deployment

This project supports **dual deployment** - both Vercel and GitHub Pages from the same codebase.

### Vercel

**Live:** [https://nothing-store.vercel.app](https://nothing-store.vercel.app)

Set environment variables in the Vercel dashboard matching `.env.local.example`.

```bash
vercel           # Deploy to preview
vercel --prod    # Deploy to production
```

### GitHub Pages

The repo is configured for GitHub Pages deployment with automatic builds via GitHub Actions.

**URL:** `https://mpiima1.github.io/nothing/`

**One-Time Setup:**
1. Push code to GitHub
2. Go to repo **Settings → Pages**
3. Under "Build and deployment", select **Source: GitHub Actions**
4. Push to `main` to trigger deployment

**How it works:**
- The `GITHUB_PAGES=true` environment variable triggers static export mode
- GitHub Actions builds to the `out/` directory
- Deploys automatically on every push to `main`

**Manual Trigger:**
1. Go to **Actions** tab
2. Select "Deploy to GitHub Pages" workflow
3. Click **Run workflow**

## Technical Details

- **Framework**: Next.js 16.2.2
- **Styling**: Tailwind CSS with glassmorphism effects
- **Icons**: Lucide React
- **PDF**: jsPDF
- **State**: React useState/useCallback (client-side only)

All pricing, features, and testimonials are satirical. Your Nothing will arrive as expected: absolutely nothing.

---

*All rights (to nothing) reserved.*
