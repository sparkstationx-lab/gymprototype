# Gym 3D Interactive Website Prototype

A modern 3D Gym Website prototype converted to a Vite + React + TypeScript project, fully configured for local development, GitHub hosting, and one-click Vercel deployment.

## Features
- **3D Interactive Dumbbell**: Built with Three.js WebGL, dynamically traveling and rotating across sections as you scroll.
- **GSAP & ScrollTrigger Animations**: Smooth staggered reveals, parallax image effects, hero zoom-outs, and responsive marquee ticker.
- **Fully Responsive Layout**: Built with Tailwind CSS and custom design rules, optimized for desktop, tablet, and mobile browsers.
- **Zero CDN Dependencies**: All packages installed locally via npm (`three`, `gsap`, `@types/three`, etc.).

## Getting Started

### Installation
```bash
npm install
```

### Development
Start the local Vite dev server on port 3000:
```bash
npm run dev
```

### Production Build
Build for production with TypeScript compilation and Vite bundler:
```bash
npm run build
```

### Preview Build
Preview the production build locally:
```bash
npm run preview
```

## Deployment

### Vercel
1. Push this repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com).
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
