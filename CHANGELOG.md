# Changelog

## [Unreleased]

## [0.2.3] (2026-09-05)

### Changed

- Stripped every comment out of the source, leaving only the lint directives the tooling needs.

## [0.2.2] (2026-09-04)

### Changed

- Reading progress is now a ring on a back-to-top button in the corner, instead of a line under the header.
- The line under the header is kept on write-ups, where knowing how much is left actually helps.

## [0.2.1] (2026-09-04)

### Changed

- Releases no longer trigger a redundant deploy, since the release commit changes nothing on the site.

## [0.2.0] (2026-09-04)

### Added

- A hamburger menu on phones, opening an index of destinations that lists each one with its address.
- A progress bar across the top of the page while a new page loads, which stays hidden if the page is instant.
- Write-ups now show the date they were published, next to the reading time.
- Search results can now show a breadcrumb trail and a date for each write-up, and list pages describe what they list.
- A GitHub link in the colophon, which also tells search engines the profile and the site are the same person.
- Comments on every write-up, signed in with GitHub, so a note lands in this repo's discussions.

### Changed

- The site now opens in dark mode for everyone, with light available from the header toggle.
- The theme toggle is now a sun and moon icon that turns as it swaps, instead of a filled dot.
- The social share card is drawn on the dark palette, matching the site you land on.
- The theme toggle's tap area now meets the 44px minimum, without changing how big the button looks.
- Secondary capabilities now read exactly like primary ones: same mark size, type and column grid.
- Recommendations now name the person first and set the quote in smaller type, so it reads as a quote.

## [0.1.0] (2026-09-04)

### Added

- A work page listing every engagement, client and personal, with dead links flagged instead of left to fail.
- A learnings section of short write-ups, each on its own page.
- Dark mode, following your system setting by default, with a toggle in the header to override it.
- A section index rail on wide screens that tracks where you are in the page.
- A reading progress bar in the header.
- Social share cards, a sitemap and a robots file, so shared links preview properly.
- Expo and React Native in the primary capabilities list.
- A learnings write-up on building an Electron workspace browser as a Rambox alternative.

### Changed

- Rebuilt the site as a single editorial document, with new typography and section rhythm.
- New colour palette: cold paper with a deep oxblood accent, replacing the warm cream and brick red.
- Row hover states now use a neutral surface shift and an accent edge instead of a pale colour wash.
- NestJS and Express are now primary capabilities, and Ant Design has moved to secondary.
- The About section's stack notes start level with the heading, closing the empty space above them.
- Both learnings write-ups rewritten in a plainer, more opinionated voice.
- Repository guidance now keeps commit messages to a single subject line.
- Rebuilt the styling on plain CSS, cutting about 27kB of JavaScript from every page.
- Repository guidance now records the commit-per-prompt and changelog-entry rules.

### Fixed

- The contact form's reCAPTCHA now appears and is checked before a message is sent.
- The Apollo capability mark was invisible against the light background.
- Section index labels no longer overlap the body text when you point at them.
- The admin page no longer comes up blank when browser storage is unavailable, and shows a visible state while it checks your session.
- The Supabase SMTP write-up had the wrong rate limit, and its curl example ran the lines together.
