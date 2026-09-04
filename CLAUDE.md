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

Two guards keep that release commit from looping, and they are separate mechanisms in separate files. `release.yml` skips its own run with a `!startsWith(github.event.head_commit.message, 'chore: release v')` job condition, and `vercel.json`'s `ignoreCommand` cancels the Vercel build for the same prefix. **`ignoreCommand` inverts the usual shell convention: exit 0 skips the build, exit 1 runs it.** Getting that backwards silently stops every deploy, and the symptom is a green pipeline with a stale site. If the release commit subject in `release.yml` ever changes, both guards match on the literal prefix and both must change with it.

**There is no test framework.** No jest, vitest, or Playwright is installed and there are no test files, so there is no "run a single test" command. Verify changes with `npm run tsc-node`, `npm run build`, and by exercising the page. Do not add a test-related instruction to a PR description implying tests were run.

`lint:js` in `package.json` targets `src`, which does not exist in this repo. It is a dead script inherited from the boilerplate. Use `npm run lint`.

Husky v4 runs `npm run tsc-node && lint-staged` on pre-commit.

### Three build-cache traps

All three cost real debugging time; check them before investigating a "broken" change.

- `dev` uses Turbopack and `build` uses webpack. Running one after the other leaves mixed artifacts in `.next` and the server 500s with `Cannot find module '../chunks/ssr/[turbopack]_runtime.js'`. Delete `.next` and rebuild.
- `.next/cache/images` survives a rebuild. After replacing a file in `public/images/`, the optimizer keeps serving the **old** image, so a corrected asset appears unchanged. Delete that directory. Deploys are unaffected.
- Killing a `build` or a `start` mid-write leaves a **truncated** `.next/routes-manifest.json`. It fails two different ways depending on when you look: a running server answers 404 for routes the build clearly listed, and the next `next start` dies with `TypeError: routesManifest.dataRoutes is not iterable`. Neither points at the manifest. Check it with `node -e "console.log(Object.keys(require('./.next/routes-manifest.json')).length)"` — a healthy one has 12 keys, a truncated one has 6. Delete `.next` and rebuild.

## Architecture

### Tokens own the design system; CSS Modules consume them

There is no CSS-in-JS runtime and no UI library. Styling is CSS custom properties plus CSS Modules, and nothing else.

`app/tokens.css` is the single source of truth for every colour, font, space, radius, easing and duration, and it owns both themes. **Dark is the default**, declared on bare `:root`; light lives in a single `:root[data-theme='light']` block that only the header toggle sets. The system preference is deliberately not consulted, so a first visit is always dark and there is no `prefers-color-scheme` query in the repo. **Write `var(--color-accent)`, never a raw hex or oklch value.** If a value is needed that has no token, add the token first.

`app/globals.css` carries the base reset and the document styles. **The reset is load-bearing, not decoration.** It zeroes element margins, list padding and heading sizes, and every component in the tree is written against that clean slate, setting its own spacing. Delete it and user-agent margins reappear under a thousand explicit spacing rules. Its rules are wrapped in `:where()` so they carry zero specificity: any bare element selector, and any module class, overrides them without an `!important`.

`.page-wrap` in `app/globals.css` is the one deliberately global class. Every full-width band centres its contents on it. Vertical padding stays with the band, in that band's own module.

Breakpoints are plain `min-width` media queries at **30em / 48em / 87.5em**. The first two are the values the old responsive props resolved to, so they are load-bearing for parity, not arbitrary.

Three places legitimately break that rule, and all three drift silently when tokens change:

- `components/Admin/adminTokens.css`: a separate dark admin chrome with its own palette, not part of the public site's system. Declared on `:root` rather than a wrapper class so the dialog and the toasts, which portal onto `document.body`, inherit it.
- `app/opengraph-image.tsx`: Satori cannot read CSS custom properties, so the dark palette is duplicated as hex.
- `app/layout.tsx`: the `themeColor` viewport entry paints mobile browser chrome and must be literal. It is a single dark value, not a media-keyed pair, because the site no longer follows the system setting.

Change the palette and you must update the last two by hand.

The accent is a mark, not a fill. There is deliberately no light accent wash anywhere: row and card emphasis is a neutral surface step plus a solid accent edge, because a high-lightness tint of the red accent reads as pink at full-row scale.

### Content lives in `constants/`, not in components

`constants/profile.ts` (name, role, headline, section list, nav), `constants/skills.ts`, `constants/portfolio.ts`, `constants/testimonials.ts`, and `constants/learnings/` (typed block documents, one file per entry). Adding a project, skill, or write-up is a constants edit, not a component edit.

### `lib/siteData.ts` is a build-time pipeline with a hard asset coupling

It derives image slugs by running `toKebabCase` over `PRIMARY_SKILLS` and `SECONDARY_SKILLS`, then calls `getPlaiceholder('/images/<slug>.png')` for each. **Adding a skill string without adding the matching PNG under `public/images/` fails the build.** Slug is kebab-case of the display name: `'Nest JS'` → `nest-js.png`.

It also holds its promises at module scope so the ~50 sharp decodes and the outbound link checks run once per server process rather than per request. Outbound link health only runs when `NODE_ENV === 'production'`; dev treats every link as healthy. Testimonials are shuffled once at module load, on purpose: shuffling after hydration moved the contact section boundary and broke in-flight anchor scrolls.

### Server to client boundary

`app/page.tsx` is a `force-static` server component that awaits `siteData` and hands plain props to `app/HomeView.tsx`, which composes the client components. There is no provider boundary: a component is a client component only when it owns state or an effect. `components/Comments` is one such leaf: the learning page and its article stay server components, and only the giscus mount is client-side. Routes: `/` (single editorial document), `/work`, `/learnings` + `/learnings/[slug]`, `/admin`, and two route handlers under `app/api/`.

### Comments are a cross-origin iframe, and the theme has to be pushed to it

`components/Comments` mounts a [giscus](https://giscus.app) thread at the foot of every `/learnings/[slug]` page. Three things about it are not obvious:

- **The script cannot be JSX.** giscus ships as a `<script>` that replaces itself with an iframe, and a `<script>` written into JSX never executes. The tag is built and appended in a mount effect, and the container is emptied on cleanup, otherwise StrictMode's double invocation in dev leaves two threads stacked on the page.
- **`data-theme` is set from the site's theme, never `preferred_color_scheme`.** The site is dark by default and ignores the system setting, so `preferred_color_scheme` would light the widget up under a dark page for anyone whose OS is light. `hooks/useThemeMode` reads `data-theme` off `<html>` and watches it with a MutationObserver; `constants/giscus.ts` maps the two site modes onto `transparent_dark` and `light`. A theme change repaints the live iframe by `postMessage` to `https://giscus.app` rather than re-injecting the script, because remounting loses whatever is half-typed in the comment box.
- **`data-mapping` is `pathname`, so the slug is the thread key.** Renaming a published learning orphans its discussion and starts an empty one. Rename the discussion title in GitHub to match, or accept the loss.

The widget is styled with giscus's own built-in themes, so the palette is **not** duplicated a fourth time. Switching to a custom giscus stylesheet would add one more hand-maintained copy of the tokens to the list above; do not do it without deciding that is worth it.

### Section composition

`Section` wraps a band and sets `aria-labelledby={id}-head`, so whatever renders the title **must** emit `id="{id}-head"`. `SectionHead` composes `SectionRule` / `SectionTitle` / `SectionLede`; those three are exported separately so a section whose margin column must start level with the heading can compose them into its own grid. `components/AboutMe` is the worked example. Rendered the default way, its stack rail can only begin below the lede and leaves dead space at the top of the column.

### Conventions

- One feature per directory under `components/<Feature>/`, split into per-file sub-components, with an `index.ts` barrel re-exporting the default.
- Path aliases cover only `@components`, `@constants`, `@utils`, `@lib`. `hooks/` is imported bare, resolved through `baseUrl: "."`.
- Every component that has styles owns a sibling `Name.module.css`. Conditional classes go through `@utils/cx`. Values that change per instance ride in as CSS custom properties on `style`, never as a second class per value.
- ESLint makes `explicit-function-return-type` and `explicit-module-boundary-types` **errors**, so every function needs an explicit return type. `no-console` is an error too.
- TypeScript runs `strict: false` but `strictNullChecks: true`.
- Motion animates `transform` and `opacity` only, using the three named easings; `app/globals.css` carries a global `prefers-reduced-motion` override. Focus rings are never animated.
- Avoid em-dashes in user-facing copy.
- **No comments.** The codebase carries none, by preference, and that is not an oversight to correct. Do not add explanatory comments, JSDoc, section banners, or `// why` notes to code you write or touch here. The only exceptions are machine-read directives such as `eslint-disable-next-line` and `@ts-expect-error`, which are instructions to a tool rather than prose. When something genuinely needs explaining, the explanation belongs in this file or in `README.md`, where it is read on purpose instead of stumbled over.

## Design work

Visual changes go through the `hallmark` skill rather than ad-hoc styling. `.hallmark/log.json` is the rotation memory the skill reads before picking a new structure, and it is now the **only** record: the Hallmark stamp that used to head `app/tokens.css` was a comment and went with the rest of them. It carried nothing the log does not already hold. Append to the log when the design changes; do not put the stamp back.

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
