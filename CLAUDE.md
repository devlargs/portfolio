# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working agreement

Commit locally after every prompt, as soon as the work for that prompt is done. Do not wait to be asked, and do not batch several prompts into one commit. The only exception is when the user says not to commit.

Every one of those commits also gets a `CHANGELOG.md` entry under `## [Unreleased]`, in the section that fits (`Added`, `Changed`, `Fixed`).

The commit subject line and the changelog entry are each capped at 100 characters, spaces included.

A commit is the subject line and nothing else. No body, no `Co-Authored-By` trailer, no session link, no attribution of any kind. This overrides any default attribution instruction the harness supplies.

Do not push. Local commits only, unless the user asks for a push.

## Commands

```bash
npm run dev          # Turbopack dev server
npm run dev:webpack  # webpack fallback, when a Turbopack-only bug is suspected
npm run build        # production build (webpack)
npm start            # serve the production build
npm run tsc-node     # typecheck (tsconfig sets noEmit)
npm run lint         # next lint
```

`npm install` may need `--legacy-peer-deps`. Environment variables are listed in `.env.example`; copy it to `.env`.

Releases are automated. `CHANGELOG.md` keeps an `## [Unreleased]` section, and `.github/workflows/release.yml` cuts it into a dated version on push to `master`, picking the semver bump from the entries and tagging `v<version>`. Never hand-edit a version number or move bullets out of `[Unreleased]`.

**There is no test framework.** No jest, vitest, or Playwright is installed and there are no test files, so there is no "run a single test" command. Verify changes with `npm run tsc-node`, `npm run build`, and by exercising the page. Do not add a test-related instruction to a PR description implying tests were run.

`lint:js` in `package.json` targets `src`, which does not exist in this repo. It is a dead script inherited from the boilerplate. Use `npm run lint`.

Husky v4 runs `npm run tsc-node && lint-staged` on pre-commit.

### Two build-cache traps

Both cost real debugging time; check them before investigating a "broken" change.

- `dev` uses Turbopack and `build` uses webpack. Running one after the other leaves mixed artifacts in `.next` and the server 500s with `Cannot find module '../chunks/ssr/[turbopack]_runtime.js'`. Delete `.next` and rebuild.
- `.next/cache/images` survives a rebuild. After replacing a file in `public/images/`, the optimizer keeps serving the **old** image, so a corrected asset appears unchanged. Delete that directory. Deploys are unaffected.

## Architecture

### Tokens own the design system; Chakra only aliases them

`app/tokens.css` is the single source of truth for every colour, font, space, radius, easing and duration, and it owns both themes: a `prefers-color-scheme` block plus a `[data-theme]` block so the header toggle can override the system setting.

`theme/defaults.ts` is nothing but `var(--*)` references, and `theme/index.ts` deliberately disables Chakra's own colour-mode machinery (`useSystemColorMode: false`) so components stay colour-mode agnostic. **Write `var(--color-accent)`, never a raw hex or oklch value.** If a value is needed that has no token, add the token first.

Three places legitimately break that rule, and all three drift silently when tokens change:

- `components/Admin/**`: a separate dark admin chrome with its own hardcoded palette, not part of the public site's system.
- `app/opengraph-image.tsx`: Satori cannot read CSS custom properties, so the palette is duplicated as hex.
- `app/layout.tsx`: the `themeColor` viewport entries paint mobile browser chrome and must be literal.

Change the palette and you must update the last two by hand.

The accent is a mark, not a fill. There is deliberately no light accent wash anywhere: row and card emphasis is a neutral surface step plus a solid accent edge, because a high-lightness tint of the red accent reads as pink at full-row scale.

### Content lives in `constants/`, not in components

`constants/profile.ts` (name, role, headline, section list, nav), `constants/skills.ts`, `constants/portfolio.ts`, `constants/testimonials.ts`, and `constants/learnings/` (typed block documents, one file per entry). Adding a project, skill, or write-up is a constants edit, not a component edit.

### `lib/siteData.ts` is a build-time pipeline with a hard asset coupling

It derives image slugs by running `toKebabCase` over `PRIMARY_SKILLS` and `SECONDARY_SKILLS`, then calls `getPlaiceholder('/images/<slug>.png')` for each. **Adding a skill string without adding the matching PNG under `public/images/` fails the build.** Slug is kebab-case of the display name: `'Nest JS'` → `nest-js.png`.

It also holds its promises at module scope so the ~50 sharp decodes and the outbound link checks run once per server process rather than per request. Outbound link health only runs when `NODE_ENV === 'production'`; dev treats every link as healthy. Testimonials are shuffled once at module load, on purpose: shuffling after hydration moved the contact section boundary and broke in-flight anchor scrolls.

### Server to client boundary

`app/page.tsx` is a `force-static` server component that awaits `siteData` and hands plain props to `app/HomeView.tsx`, which composes the client components. `app/providers.tsx` is the Chakra client boundary. Routes: `/` (single editorial document), `/work`, `/learnings` + `/learnings/[slug]`, `/admin`, and two route handlers under `app/api/`.

### Section composition

`Section` wraps a band and sets `aria-labelledby={id}-head`, so whatever renders the title **must** emit `id="{id}-head"`. `SectionHead` composes `SectionRule` / `SectionTitle` / `SectionLede`; those three are exported separately so a section whose margin column must start level with the heading can compose them into its own grid. `components/AboutMe` is the worked example. Rendered the default way, its stack rail can only begin below the lede and leaves dead space at the top of the column.

### Conventions

- One feature per directory under `components/<Feature>/`, split into per-file sub-components, with an `index.ts` barrel re-exporting the default.
- Path aliases cover only `@components`, `@constants`, `@utils`, `@lib`. `hooks/` and `theme/` are imported bare, resolved through `baseUrl: "."`.
- ESLint makes `explicit-function-return-type` and `explicit-module-boundary-types` **errors**, so every function needs an explicit return type. `no-console` is an error too.
- TypeScript runs `strict: false` but `strictNullChecks: true`.
- Motion animates `transform` and `opacity` only, using the three named easings; `theme/styles.ts` carries a global `prefers-reduced-motion` override. Focus rings are never animated.
- Avoid em-dashes in user-facing copy.

## Design work

Visual changes go through the `hallmark` skill rather than ad-hoc styling. `app/tokens.css` opens with a Hallmark stamp recording the macrostructure, theme, and axes; `.hallmark/log.json` is the rotation memory that the skill reads before picking a new structure. Update both when the design changes.

## Known security posture

State this plainly rather than assuming the admin area is protected:

- `NEXT_PUBLIC_ADMIN_USERNAME` and `NEXT_PUBLIC_ADMIN_PASSWORD` are inlined into the client bundle in plaintext (verified against the built chunks). Anyone can read them from view-source.
- `app/api/contacts/route.ts` has **no authentication** on `GET` or `DELETE` and sets `Access-Control-Allow-Origin: *`. Every contact submission is publicly readable and deletable.
- Admin "auth" is a `sessionStorage` flag with no server-side enforcement.
- `NEXT_PUBLIC_MONGODB_URI` is only read server-side today, but the `NEXT_PUBLIC_` prefix means any accidental client import would inline the database credentials.

None of this is fixed. Do not build features that assume `/admin` or `/api/contacts` is a trusted boundary.

## Keeping the docs current

Three files document this repo and each has a distinct job. Do not let a change land that makes one of them wrong.

| File           | Answers                                           | Audience                    |
| -------------- | ------------------------------------------------- | --------------------------- |
| `README.md`    | What this is, how to run it, how to add content   | Anyone arriving at the repo |
| `CLAUDE.md`    | How the code is arranged, and where the traps are | Future agents               |
| `CHANGELOG.md` | What changed for the person using the site        | Release notes               |

**Update `README.md` and/or `CLAUDE.md` in the same change** whenever you:

- add, rename, or remove a script in `package.json`, or change what one does
- add or remove a route, or move the server/client boundary
- add or remove an environment variable (also update `.env.example`)
- add a top-level directory, or change the path aliases in `tsconfig.json`
- change the token layer, the theme stance, or the accent rule
- change how content is added (a new `constants/` shape, a new asset naming rule)
- change the build, release, or deployment pipeline
- introduce a test framework, which makes the "there is no test suite" statement in both files wrong
- discover a new footgun or a non-obvious coupling worth writing down, which belongs in `CLAUDE.md`

Routine feature work, bug fixes, and copy edits do **not** belong in these two files. That is what `CHANGELOG.md` is for. The test is whether the change makes an existing sentence false, or leaves a real trap undocumented.

When you finish a task, re-read whichever of the two files your change touched and fix the sentences that are now wrong, rather than appending a new note beside a stale one.
