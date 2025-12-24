# Project Context: nav.flc.io (FLC 和他的导航)

## Project Overview

**FLC 和他的导航** (Title: FLC和他的导航) is a personal navigation dashboard (similar to hao123 but modern/cool) built with **Vue 3** and **Vite**. It features a **Glassmorphism** (frosted glass) design aesthetic, powered by **Tailwind CSS v4**.

The application is designed to be:
*   **Minimalist & Modern:** Dark mode, gradients, blur effects.
*   **Data-Driven:** Content is dynamically rendered from a simple JSON file, making it easy to manage without a backend.
*   **Responsive:** Grid layout that adapts from mobile to large screens.

## Tech Stack

*   **Framework:** Vue 3 (Composition API + TypeScript)
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS v4 (using `@tailwindcss/postcss` and `@import "tailwindcss";`)
*   **Language:** TypeScript
*   **Package Manager:** npm

## Color Palette (主色系)

| 用途 | Tailwind / HEX |
|------|----------------|
| **背景基色** | `slate-900` / `#0f172a` |
| **渐变背景** | `from-slate-900 via-purple-900 to-slate-900` |
| **主题色** | `purple-500` / `rgba(168, 85, 247)` |
| **卡片背景** | `bg-white/5` (5% 白色) |
| **边框** | `border-white/10` |
| **发光效果** | `rgba(168, 85, 247, 0.15~0.3)` |
| **文字强调** | `purple-300`, `purple-400` |
| **辅助色** | `cyan-400`, `yellow-400` (代码高亮) |

## Key Files & Structure

*   **`src/App.vue`**: The main entry component.
    *   Fetches `data.json` on mount.
    *   Renders the header, sidebar, and category grid.
    *   Implements the glassmorphism card design using Tailwind utility classes (e.g., `backdrop-blur-md`, `bg-white/5`).
*   **`src/components/SideNav.vue`**: Sidebar navigation with responsive behavior.
    *   **Desktop (≥1536px)**: Fixed sidebar on the left, tracks scroll position to highlight current category.
    *   **Mobile (<1536px)**: Hamburger menu button (top-right) that opens a drawer navigation.
    *   Smooth scrolling to categories on click.
    *   Drawer has purple glassmorphism effect (`bg-purple-900/30 backdrop-blur-xl`).
*   **`src/components/BackgroundParticles.vue`**: Interactive particle background.
    *   Canvas-based subtle animation with mouse repulsion effect.
*   **`src/components/SearchBox.vue`**: Enhanced search functionality.
    *   Dropdown for selecting search engines (Google, Baidu, Bing, GitHub).
    *   Displays engine icons (favicons) in dropdown and button.
    *   Custom styled input with glass effect.
*   **`src/components/SpotlightCard.vue`**: Navigation card component.
    *   Renders individual link items with glassmorphism styling.
    *   Hover spotlight effect following mouse movement:
        *   Inner glow: `radial-gradient` overlay following `--mouse-x`, `--mouse-y` CSS variables.
        *   Border glow: `::after` pseudo-element with `rgba(168, 85, 247, 0.15)` gradient.
        *   Shadow glow: `box-shadow: 0 10px 40px -10px rgba(168, 85, 247, 0.3)` on hover.
*   **`public/data.json`**: The static database for the application.
    *   Format: `{ title, description, categories: [ { name, items: [ { title, url, icon, desc } ] } ] }`
    *   Used to configure all links displayed on the dashboard.
*   **`src/style.css`**: Global styles.
    *   Imports Tailwind CSS v4 via `@import "tailwindcss";`.
    *   Sets basic `body` styles (background color `#0f172a`).
*   **`postcss.config.js`**: PostCSS configuration using `@tailwindcss/postcss` plugin (required for Tailwind v4).
*   **`vite.config.ts`**: Standard Vite configuration with Vue plugin.

## Building and Running

### Prerequisites
*   Node.js installed.

### Commands

*   **Start Development Server:**
    ```bash
    npm run dev
    ```
    Starts the Vite dev server (usually at `http://localhost:5173`).

*   **Build for Production:**
    ```bash
    npm run build
    ```
    Runs `vue-tsc` for type checking and builds the static assets to `dist/`.

*   **Preview Production Build:**
    ```bash
    npm run preview
    ```

## Development Conventions

*   **Styling:** Use Tailwind CSS utility classes directly in templates. Avoid custom CSS in `<style>` blocks unless necessary.
*   **Data Management:** To add/remove links, edit `public/data.json`. No code changes are required for content updates.
*   **Icons:** Currently using direct URLs (Favicons) in `data.json`.
*   **Responsiveness:** Use Tailwind's responsive prefixes (`sm:`, `lg:`, `xl:`) to control grid columns.

## Recent Changes & Notes

*   **Tailwind v4 Upgrade:** The project was recently configured to use Tailwind CSS v4.
    *   `tailwind.config.js` was removed (not needed for v4).
    *   `postcss.config.js` uses `@tailwindcss/postcss`.
    *   CSS uses `@import "tailwindcss";`.
*   **Vue Style Block Removed:** The `<style>` block in `App.vue` was removed to prevent PostCSS parsing errors during the upgrade. Global styles are now in `src/style.css`.
*   **UI/UX Enhancements (Dec 2025):**
    *   **Sidebar Navigation**: Added left-side navigation for quick access to categories.
    *   **Particle Background**: Added a custom canvas particle effect for better visual depth.
    *   **Search Engine**: Added dropdown with icon support and fixed GitHub icon visibility (inverted color).
    *   **Data Enrichment**: Expanded `data.json` with more categories and items.
*   **Responsive Optimizations (Dec 23, 2025):**
    *   **Fluid Typography**: Main title uses CSS `clamp(2rem, 8vw, 3rem)` for responsive font sizing.
    *   **Hamburger Menu Navigation**: Mobile drawer navigation replaces fixed sidebar below 1536px.
        *   Breakpoint: `2xl` (1536px) chosen to prevent content overlap on medium screens.
        *   Drawer slides in from left with purple glassmorphism (`bg-purple-900/30`).
        *   Includes backdrop overlay that closes on click.

