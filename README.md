# Kujira - Premium Omakase Experience

A high-end, immersive single-page website for **Kujira**, a fictional premium omakase sushi restaurant. Built with modern web technologies, featuring scroll-driven frame animations, GSAP-powered transitions, and a refined dark aesthetic inspired by Japanese minimalism.

---

## Tech Stack

| Layer        | Technology                                       |
| ------------ | ------------------------------------------------ |
| Framework    | React 19 + TypeScript                            |
| Build Tool   | Vite 7                                           |
| Styling      | Tailwind CSS 3 + Custom CSS (BEM methodology)    |
| Animation    | GSAP 3 (ScrollTrigger, timeline, scrub)          |
| UI Primitives| Radix UI + shadcn/ui (design tokens)             |
| Linting      | ESLint 9 (flat config) + typescript-eslint       |

---

## Features

- **Scroll-Driven Frame Animation** -- 151 sequenced JPEG frames rendered to a `<canvas>` element, scrubbed via GSAP ScrollTrigger for a cinematic hero experience.
- **Loading Screen with Real Progress** -- Tracks actual image preload progress before revealing the site. Images are preloaded once and shared across components (zero double-loading).
- **Responsive Navigation** -- Auto-hiding on scroll-down, with a fully functional mobile hamburger menu overlay featuring staggered entrance animations.
- **Intersection Observer Reveals** -- Philosophy and Menu sections use IntersectionObserver for performant scroll-triggered entrance animations.
- **3D Tilt Cards** -- Experience section cards feature mouse-tracking 3D rotation powered by GSAP with `overwrite: 'auto'` to prevent animation queue buildup.
- **Accessible Forms** -- Reservation form with proper `<label>` elements, `autocomplete` attributes, and ARIA labeling for screen readers.
- **Skip Navigation** -- Keyboard-accessible skip-to-content link for users who navigate without a mouse.
- **Reduced Motion Support** -- Full `prefers-reduced-motion` media query disabling all animations for users who prefer less motion.
- **Film Grain Overlay** -- Subtle SVG noise texture fixed over the viewport for visual depth.
- **Responsive Breakpoints** -- Tested layouts for mobile (< 576px), tablet (576px-1024px), and desktop (> 1024px).

---

## Installation

```bash
# Clone the repository
git clone https://github.com/FarizAdzmir/Kujira.git
cd Kujira

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview

# Run the linter
npm run lint
```

---

## Project Structure

```
Kujira/
├── public/
│   └── images/
│       ├── chef.jpeg                  # Chef portrait
│       ├── frames/                    # 151 scroll animation frames (000-150)
│       │   ├── frame_000.jpg
│       │   └── ...
│       └── menu/                      # Menu item photography
│           ├── otoro.jpeg
│           ├── uni.jpeg
│           ├── wagyu.jpeg
│           ├── amaebi.jpeg
│           ├── anago.jpeg
│           └── chef-hands.jpeg
├── src/
│   ├── components/
│   │   ├── Chef.tsx                   # Chef quote + portrait section
│   │   ├── Experience.tsx             # 3D tilt cards with GSAP
│   │   ├── Footer.tsx                 # Site footer with navigation + contact
│   │   ├── Hero.tsx                   # Canvas frame animation + ScrollTrigger
│   │   ├── LoadingScreen.tsx          # Preloader with progress tracking
│   │   ├── Menu.tsx                   # Horizontal scroll menu cards
│   │   ├── MenuCard.tsx               # Stacking card variant (unused)
│   │   ├── Navigation.tsx             # Fixed nav + mobile menu overlay
│   │   ├── Philosophy.tsx             # Brand story section
│   │   └── Reservation.tsx            # Booking form with GSAP animations
│   ├── hooks/
│   │   └── use-mobile.ts             # Responsive breakpoint hook
│   ├── lib/
│   │   └── utils.ts                  # cn() utility (clsx + tailwind-merge)
│   ├── App.tsx                        # Root component + state management
│   ├── main.tsx                       # React DOM entry point
│   └── index.css                      # Global styles + design tokens + BEM
├── index.html                         # HTML entry with SEO meta tags
├── vite.config.ts                     # Vite configuration
├── tailwind.config.js                 # Tailwind + shadcn theme tokens
├── eslint.config.js                   # ESLint flat config
├── tsconfig.json                      # TypeScript configuration
└── package.json                       # Dependencies and scripts
```

---

## Design Tokens

The project uses a dual design token system -- custom CSS properties for the Kujira brand palette and HSL-based shadcn/ui tokens for component primitives:

| Token              | Value     | Usage                        |
| ------------------ | --------- | ---------------------------- |
| `--color-black`    | `#0a0a0a` | Primary background           |
| `--color-gold`     | `#c9a962` | Brand accent, CTAs, borders  |
| `--color-cream`    | `#f5f0e6` | Primary text                 |
| `--color-cream-dark`| `#d4cfc5`| Secondary text               |
| `--color-red`      | `#8b2635` | Destructive / alert accent   |

---

## License

This project is for educational and portfolio purposes.
