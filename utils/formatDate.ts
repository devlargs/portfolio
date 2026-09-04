const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

const formatDate = (iso: string): string => formatter.format(new Date(iso));

export default formatDate;
