# ralphlargo.com

My portfolio and writing, built as a single editorial document rather than a deck of cards.

Live at **[ralphlargo.com](https://ralphlargo.com)**.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · CSS Modules over a CSS custom-property token layer · Mongoose/MongoDB · AWS SES.

## Getting started

Node 22.x.

```bash
npm install          # add --legacy-peer-deps if peer resolution fails
cp .env.example .env # then fill it in; .env is gitignored
npm run dev
```

The dev server runs on Turbopack at http://localhost:3000.

### Environment

| Variable                         | Used for                             |
| -------------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_MONGODB_URI`        | Contact submissions store            |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA widget on the contact form |
| `RECAPTCHA_SECRET_KEY`           | Server-side reCAPTCHA verification   |
| `AWS_SES_ACCESS_KEY_ID`          | Contact email delivery               |
| `AWS_SES_SECRET_ACCESS_KEY`      | Contact email delivery               |
| `AWS_SES_REGION`                 | Contact email delivery               |
| `AWS_SES_FROM_EMAIL`             | Contact email sender                 |
| `AWS_SES_TO_EMAIL`               | Contact email recipient              |
| `NEXT_PUBLIC_ADMIN_USERNAME`     | Admin sign-in                        |
| `NEXT_PUBLIC_ADMIN_PASSWORD`     | Admin sign-in                        |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`  | Analytics; omit to disable           |
| `NEXT_PUBLIC_ENVIRONMENT`        | Environment label                    |
| `GOOGLE_SITE_VERIFICATION`       | Search Console token; omit to skip   |

## Scripts

| Script                  | What it does                                               |
| ----------------------- | ---------------------------------------------------------- |
| `npm run dev`           | Dev server (Turbopack)                                     |
| `npm run dev:webpack`   | Dev server on webpack, for isolating Turbopack-only issues |
| `npm run build`         | Production build                                           |
| `npm start`             | Serve the production build                                 |
| `npm run tsc-node`      | Typecheck                                                  |
| `npm run lint`          | Lint                                                       |
| `npm run check-updates` | Bump dependencies with `ncu`                               |

There is no test suite. Changes are verified by typecheck, build, and using the site.

## Routes

| Route                             |                                                                                     |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| `/`                               | The document: opening, about, selected work, capabilities, recommendations, contact |
| `/work`                           | Full index of every engagement, client and personal                                 |
| `/learnings`, `/learnings/[slug]` | Short write-ups, each with a giscus comment thread                                  |
| `/admin`                          | Contact submissions                                                                 |

## How it is put together

**Content is data.** Everything the site says lives in `constants/`: profile and section list, skills, portfolio entries, testimonials, and the learnings documents. Components render it; they do not contain it.

**One token layer owns the design.** `app/tokens.css` defines every colour, font, space, radius and easing as CSS custom properties, and carries both themes. Dark is the default, declared on bare `:root`; light is an explicit reader choice carried by a `[data-theme='light']` block that the header toggle sets. The system preference is deliberately not consulted. `app/globals.css` holds the base reset and the document styles, and every component styles itself with a sibling `.module.css` that reads those tokens. There is no UI library and no CSS-in-JS runtime. Components reference tokens by name and never inline a raw colour.

The accent is a mark, not a fill. Emphasis is a neutral surface step plus a solid accent edge, because a pale tint of the accent at full-row scale reads as a wash and flattens the page.

**Comments are GitHub Discussions.** Each write-up ends with a [giscus](https://giscus.app) thread keyed on the pathname, so a comment is a discussion in this repo and there is no database and no moderation queue. Configuration lives in `constants/giscus.ts`; the ids there are public identifiers, not secrets. The widget is told the theme outright rather than left on `preferred_color_scheme`, because the site does not follow the system setting.

**Build-time work happens once.** `lib/siteData.ts` generates blur placeholders for every image and, in production only, checks each outbound project link so dead ones can be labelled rather than left to fail. Both are cached at module scope so they run once per server process instead of once per request.

## Adding things

**A project.** Add an entry to `constants/portfolio.ts`. Links are health-checked at build time in production.

**A capability.** Add the display name to `constants/skills.ts` _and_ drop a matching PNG into `public/images/`. The filename is the kebab-case of the name, so `'Nest JS'` needs `nest-js.png`. The build fails without it.

**A write-up.** Add a typed document under `constants/learnings/entries/` and register it in `constants/learnings/index.ts`. Every entry needs a `published` date (`YYYY-MM-DD`); it draws the visible dateline, the article's `datePublished`, and that URL's `lastmod` in the sitemap, so a wrong one is wrong in three places. Set `updated` only on a real revision. Entries are structured blocks, not raw markdown, so headings, code, notes and field tables render consistently. The comment thread comes with it; nothing to set up per entry. Renaming a published slug starts a new thread, so rename the discussion in GitHub to match if the old comments matter.

## Releases

`CHANGELOG.md` keeps an `## [Unreleased]` section. Pushing changelog entries to `master` triggers `.github/workflows/release.yml`, which picks the semver bump from the entries, cuts the section into a dated version, tags `v<version>`, and publishes a GitHub release. Nothing to release means the workflow exits quietly.

## Two build-cache traps

Worth knowing before debugging a change that "did not apply":

- `dev` runs Turbopack and `build` runs webpack. Running one after the other can leave mixed artifacts in `.next` and the server 500s with `Cannot find module '../chunks/ssr/[turbopack]_runtime.js'`. Delete `.next`.
- `.next/cache/images` survives a rebuild, so a replaced file in `public/images/` keeps serving the old optimized copy locally. Delete that directory. Deploys are unaffected.

## Deployment

Vercel.
