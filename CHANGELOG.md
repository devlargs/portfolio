# Changelog

## [Unreleased]

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
- Repository guidance now records the commit-per-prompt and changelog-entry rules.

### Fixed

- The contact form's reCAPTCHA now appears and is checked before a message is sent.
- The Apollo capability mark was invisible against the light background.
- Section index labels no longer overlap the body text when you point at them.
- The admin page no longer comes up blank when browser storage is unavailable, and shows a visible state while it checks your session.
- The Supabase SMTP write-up had the wrong rate limit, and its curl example ran the lines together.
