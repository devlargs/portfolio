/**
 * A date the way the site writes one: SEP 5, 2026.
 *
 * Pinned to UTC on purpose. These strings render on the server and again during
 * hydration, and a viewer east of the meridian would otherwise be handed a
 * different day than the one that was prerendered.
 */
const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

const formatDate = (iso: string): string => formatter.format(new Date(iso));

export default formatDate;
