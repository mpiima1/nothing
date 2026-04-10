# AGENTS.md - OpenCode Session Guide for Nothing Store

## Core Concept
This is a **satirical e-commerce platform selling nothing**. It's performance art/commentary on consumer culture, marketing hype, and modern capitalism. **Preserve all satirical text**—it's the core joke, not decoration.

**Original file:** `nothing.js` → Should become `components/NothingStore.js`

## Project Structure (Target State)
```
nothing-store/
├── app/
│   ├── layout.js          # Root layout with metadata
│   └── page.js            # Entry point importing NothingStore
├── components/
│   ├── NothingStore.js    # Main satirical component (from nothing.js)
│   ├── AnimatedVoid.jsx   # Shader-like background effect
│   ├── EnhancedButton.jsx # Hover glow effects
│   ├── ProductCard.jsx    # Extracted product cards
│   ├── CartDrawer.jsx     # Slide-out cart
│   └── Certificate.jsx    # PDF certificate display
├── lib/
│   ├── products.js        # Product config (env-based)
│   ├── currency.js        # Currency formatting (USD/EUR/GBP/JPY)
│   └── pdf.js             # PDF generation with jspdf
├── styles/
│   └── globals.css        # Tailwind + custom animations
├── public/
├── .env.local.example
├── vercel.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## Security & Dependencies

**Critical Security Update (Dec 2025):** All Next.js apps must be patched against [CVE-2025-55184](https://github.com/vercel/next.js/security/advisories/GHSA-5j59-xgg2-r9c4) (DoS) and [CVE-2025-55183](https://github.com/vercel/next.js/security/advisories/GHSA-w37m-7fhw-fmv9) (Source Code Exposure).

### Installed Versions (All Secure & Patched)
```json
{
  "next": "16.2.2",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "lucide-react": "1.7.0",
  "jspdf": "4.2.1"
}
```

### Setup & Installation
```bash
npm install                # Installs all dependencies
npm install next@latest react@latest react-dom@latest --save
```

### Development
```bash
npm run dev                # Start dev server at localhost:3000
npm run build              # Production build (required before deploy)
npm run start              # Start production server
npm run lint               # ESLint checks
npm audit                  # Check for security vulnerabilities
```

### Security Updates
```bash
npx fix-react2shell-next   # Check/install Next.js patches
npm audit fix              # Install security fixes
```

### Vercel Deployment
```bash
vercel login               # Authenticate with Vercel
vercel                     # Deploy to production (creates vercel.json)
vercel --prod              # Deploy to production URL
```

## Vercel Deployment Notes

`vercel.json` (auto-generated, but ensure):
- Build command: `next build`
- No custom settings needed — auto-detects
- Set env vars in Vercel dashboard (matching `.env.local.example`)

**Deploy workflow:**
1. `npm run build` (verify locally)
2. `vercel` (login if needed, deploy to preview)
3. `vercel --prod` (promote to production URL)
4. Copy production URL for distribution

## Environment Variables (All prefixed with NEXT_PUBLIC_)

### Required
```env
NEXT_PUBLIC_STORE_NAME="Nothing Store"
NEXT_PUBLIC_CURRENCY="USD"          # Options: USD, EUR, GBP, JPY
NEXT_PUBLIC_CURRENCY_SYMBOL="$"     # Auto-mapped based on currency
NEXT_PUBLIC_PRODUCT_VARIANTS="premium,deluxe,ultimate,start"
```

### Optional
```env
NEXT_PUBLIC_DEMO_MODE="true"          # Show demo mode warnings
NEXT_PUBLIC_ENABLE_ANALYTICS="false"  # Disable analytics
```

### Deprecated
- `NEXT_PUBLIC_SALES_TODAY` — REMOVED: Sales counter now auto-generates a random prime (100-2000) on each page load

**Template:** `.env.local.example` must document all variables.

## Architecture Notes

### No Real Dependencies
- **No backend** — everything is client-side
- **No email service** — confirmation message is text-only satire
- **No actual PDF generation** — jsPDF creates simple certificate
- **No payment processing** — checkout is immediate
- All "realism" is surface-level to enhance the satire

### State Management
- Single `NothingStore` component manages all state: `cart`, `view`, `orderData`
- Views: `store` (default), `checkout`, `confirmation`
- Cart state persists within session only

### Product Data Flow
1. Products array in `lib/products.js` (can override with `NEXT_PUBLIC_PRODUCT_VARIANTS`)
2. `NothingStore` imports from `lib/products.js`
3. Each product has: `id`, `name`, `price`, `description`, `features[]`
4. **Feature text is sacred satire** — don't change "100% invisible", etc.

### Currency Formatting
- Uses `Intl.NumberFormat` for locale-aware display
- Default USD ($), supports EUR (€), GBP (£), JPY (¥)
- Format via `lib/currency.js`: `formatPrice(amount, currency)`

## Component Extraction Pattern

When enhancing, **extract to smaller components**:
- Product cards → `ProductCard.jsx`
- Buttons → `EnhancedButton.jsx`
- Cart logic → `CartDrawer.jsx`
- Certificate → `Certificate.jsx` (display + PDF download)

**Preserve:** Each file should have comment explaining satirical intent.

## Visual Style (Borrow from 21st.dev aesthetic)

### Color Palette
- Background: `bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900`
- Accent: Purple gradients (`from-purple-500 to-pink-500`)
- Cards: `bg-white/10` with `backdrop-blur-lg` (glassmorphism)

### Animations (in `styles/globals.css`)
```css
@keyframes shimmer {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
```
Use Tailwind `animate-` classes, not heavy animation libraries.

### Hover Effects
- Buttons: `hover:bg-purple-700` + subtle glow
- Cards: `hover:scale-105` + border glow `hover:border-purple-500`
- Keep animations smooth but not over-polished (still absurd)

## Satirical Elements (DO NOT REMOVE)

### Essential Text — All Must Remain
- "Absolutely nothing, but make it premium"
- "Artisanal emptiness", "Hand-crafted void", "Infinite shelf life"
- "Quantum-grade vacuum", "Philosophical implications included"
- "Your Nothing being carefully packaged"
- **[ NOTHING CAPTURED ]** — the visual punchline
- Legal disclaimer paragraph at checkout
- Footer: "All rights (to nothing) reserved"

### Microcopy Enhancements
- Empty cart: "Your cart is as empty as your purchase"
- Processing: "Processing your Nothing..."
- Sales counter: "X Nothings Sold Today"
- Product scarcity: "Limited stock: ∞"

### Tone
- **Deadpan professionalism** — treat nothing like luxury product
- **Never break fourth wall** — don't say "this is a joke"
- **Corporate speak** — marketing language for absurd claims
- Visual polish ≠ seriousness — make it look real to make the joke land

## Phased Implementation Approach

**Stop/resume safely at any phase checkpoint:**

| Phase | What Gets Created | Checkpoint |
|-------|-------------------|------------|
| 1: Scaffolding | package.json, vercel.json, tailwind.config.js, directory structure | `npm run dev` works |
| 2: Component Migration | NothingStore.js, ProductCard.jsx, EnhancedButton.jsx | All satirical text preserved |
| 3: Currency | lib/currency.js, .env.local.example | Currency selector badge works |
| 4: Animated Void | components/AnimatedVoid.jsx, globals.css animations | Background has subtle motion |
| 5: Cart Drawer | components/CartDrawer.jsx | Slide-out cart with animations |
| 6: PDF Cert | components/Certificate.jsx, lib/pdf.js | Downloadable PDF certificate |
| 7: Features | Microcopy enhancements, sales counter, scarcity badges | Enhanced UX |
| 8: Deployment | README.md, vercel deploy | Live on Vercel |

**Git commit after each step:** Every change MUST be committed before proceeding. Use descriptive commit messages following conventional commits format:
- `feat:` for new functionality
- `fix:` for bug fixes
- `refactor:` for code restructuring
- `docs:` for documentation
- `style:` for formatting changes
- `chore:` for maintenance tasks

Example: `git commit -m "feat: add currency formatting with Intl.NumberFormat support"`

## Testing & Verification

### Manual Testing Checklist
- [ ] Cart adds/removes products
- [ ] Checkout form validates (name + email required)
- [ ] Currency symbol changes based on env variable
- [ ] PDF certificate downloads successfully
- [ ] Mobile responsive (test on mobile view)
- [ ] All satirical text still present
- [ ] Animations work but not distracting

### Build Verification
```bash
npm run build              # Must succeed without errors
npm run lint               # Should have no ESLint errors
npm start                  # Production build runs correctly
```

## Gotchas & Common Mistakes

### ❌ What NOT to Do
- Don't change product feature text (it's the joke)
- Don't add real payment/checkout (breaks the satire)
- Don't over-polish visuals (still absurd)
- Don't add backend or analytics (keeps it simple)
- Don't use framer-motion (adds bloating)
- Don't import external images except via public/
- Don't use outdated Next.js versions (<16.0.10)
- **Never commit secrets, keys, or .env files** - only `.env.local.example` template goes in repo

## Critical Security Fixes

### Recent Security Vulnerabilities (Dec 2025)
- **CVE-2025-55184**: DoS via RSC protocol (patched in 16.0.10+)
- **CVE-2025-55183**: Source code exposure in RSC (patched in 16.0.10+)
- **CVE-2025-67779**: Complete DoS fix (patched in 16.0.10+)

**Action Required:** Upgrade to Next.js >=16.0.10 or latest 15.x (15.6.0+)

### ✅ Best Practices
- Always create `.env.local.example` when adding env vars
- Commit after each phase
- Test `npm run build` before deploying
- Keep component extraction in mind (extract when repeating patterns)
- Use CSS animations, not JS libraries
- Write TODOs in code for next person: `// TODO: Enhance microcopy here`

## File Order for Investigation

1. **First:** `README.md` (when exists), `.env.local.example`, package.json
2. **Then:** `tailwind.config.js`, `vercel.json`, `next.config.js`
3. **Then:** `app/page.js`, `components/NothingStore.js`
4. **Then:** `lib/*.js` (products, currency, pdf)
5. **Finally:** `styles/globals.css` for visual details

## Questions to Ask If Stuck

Only ask if the repo doesn't clarify:
1. Should product feature text be modified or preserved as-is?
2. Is there a preferred color palette deviation from current purple/slate?
3. Should PDF certificates use actual signatures or remain generic?

(Answer: Feature text preserved. Purple/slate preferred. Generic OK.)

## Vercel Deployment Notes

`vercel.json` (auto-generated, but ensure):
- Build command: `next build`
- No custom settings needed — auto-detects
- Set env vars in Vercel dashboard (matching `.env.local.example`)

**Deploy workflow:**
1. `npm run build` (verify locally)
2. `vercel` (login if needed, deploy to preview)
3. `vercel --prod` (promote to production URL)
4. Copy production URL for distribution

## Maintenance Pattern

**When enhancing:**
1. Read relevant component (e.g., `NothingStore.js`)
2. Check if pattern repeats → extract to new component
3. Update `lib/products.js` first (single source of truth)
4. Test locally: `npm run dev`
5. Commit: `git commit -m "feat: updated X"`
6. Verify satirical elements intact

**When fixing:**
1. Find error source (console error, build fail)
2. Check if it's dependency version issue
3. Check `styles/globals.css` for broken animations
4. Check env vars in Vercel dashboard
5. Rebuild and retest
