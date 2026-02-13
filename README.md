# Daniel Olusheki — Personal Portfolio

A minimal, dark-themed personal portfolio website built with React, Vite, Tailwind CSS, and TypeScript. Features a bento-grid layout, animated text effects, a live LeetCode stats widget, and light/dark mode toggle.

**Live site:** [olusheki.lovable.app](https://olusheki.lovable.app)

---

## Using This as a Template

To adapt this site for your own portfolio, update the following:

### 1. Content (`src/pages/Index.tsx`)

All portfolio content lives in data arrays at the top of this file:

- **`HELLO_PHRASES`** — Rotating greeting text
- **`experienceItems`** — Work experience and awards
- **`projectItems`** — Featured projects (supports images, links, descriptions)
- **`skillItems`** — Skills grouped by category
- **`courseItems`** — Relevant coursework
- **`aboutItems`** — About Me modal content

Update the bio paragraph and footer links (email, LinkedIn, GitHub) in the JSX below the data arrays.

### 2. Resume

Replace `public/Daniel_Olusheki_Resume.pdf` with your own resume file and update the link in the footer if the filename changes.

### 3. Images

Add project images to `src/assets/` and import them at the top of `Index.tsx`. Reference them via the `image` field in `projectItems`.

### 4. LeetCode Widget

Update the username in `src/hooks/useLeetCodeStats.ts` to your own LeetCode profile, or remove the `<LeetCodeCard />` component if not needed.

### 5. Theme & Styling

- Colors and design tokens are defined in `src/index.css`
- Tailwind config is in `tailwind.config.ts`
- The site supports light and dark modes via `<ThemeToggle />`

### 6. Metadata

Update the `<title>` and meta tags in `index.html`.

---

## Development

```sh
npm i
npm run dev
```

Built with [Lovable](https://lovable.dev).
