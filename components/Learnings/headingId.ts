/** Stable anchor for a heading block, so a single step can be linked to. */
const headingId = (content: string): string =>
  content
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export default headingId;
