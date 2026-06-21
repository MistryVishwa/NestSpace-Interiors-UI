# AGENTS.md

## Quick Commands

```bash
pnpm dev          # Dev server at localhost:3000
pnpm build        # Production build
pnpm lint         # ESLint (the only code quality check available)
```

There is **no typecheck or test script** configured. TypeScript strict mode is on but `next.config.mjs` sets `ignoreBuildErrors: true`, so `pnpm build` will succeed even with TS errors. Lint is the only gate.

## Stack

- Next.js 16.2 (App Router), React 19.2, Tailwind CSS v4.2, TypeScript 5.7
- **pnpm** only (not npm). Workspace file exists but this is a single-package repo.
- shadcn/ui components (new-york style) in `components/ui/`. These are Radix UI wrappers — do not refactor them into different primitives.
- `@/*` path alias maps to project root (configured in tsconfig.json).

## Code Conventions

- **`cn()` from `lib/utils.ts`** is the standard way to merge Tailwind classes. Always use it instead of raw template literals or `clsx` alone.
- All colors are defined as CSS custom properties in `app/globals.css` using OKLCH color space, with light/dark variants. Use `--primary`, `--accent`, etc. — do not add raw hex/rgb colors.
- Dark mode uses the `class` strategy via `next-themes`. Toggle is in `ThemeProvider`.
- Custom animation utility classes (`reveal`, `luxury-card`, `glass`, `premium-card`, etc.) are defined in `globals.css` — check before creating new ones.
- Fonts: Inter (sans), Playfair Display (serif), Poppins (display) — loaded via `next/font/google` in `app/layout.tsx`.

## Commits

Enforced by Husky + commitlint via `.husky/commit-msg`. Must follow Conventional Commits:

```
<type>(<optional scope>): <short description>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`. Subject max 72 chars, lowercase type, no period.

## Skills

| Skill | What it does in this repo |
|-------|--------------------------|
| `conventional-commit` | Generates properly formatted commit messages following Conventional Commits spec (`feat`, `fix`, etc.) — enforced by Husky here |
| `seo-audit` | Audits pages for SEO issues: meta tags, Core Web Vitals, crawlability, indexing, on-page problems |
| `shadcn` | Adds, fixes, and styles shadcn/ui components — the UI library used throughout `components/ui/` |
| `typescript-advanced-types` | Applies generics, mapped types, and utility types to keep TypeScript strict-mode code type-safe |
| `wcag-audit-patterns` | Audits components against WCAG 2.2 accessibility rules and provides fixes |

## Gotchas

- `next.config.mjs` disables TypeScript build errors and unoptimized images — this is intentional for the current project state.
- No CI workflows exist yet (`.github/` only has issue templates and a PR template).
- Branch convention: `feat/<name>`, `fix/<name>` off `main`. One issue assigned per contributor.
- PRs must target `main` and use the PR template in `.github/pull_request_template.md`.
