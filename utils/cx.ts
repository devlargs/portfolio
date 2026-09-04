/**
 * Joins class names, dropping anything falsy.
 *
 * Conditional classes are the one thing a CSS module cannot express, and every
 * component that has a variant needs the same three lines without it.
 */
const cx = (...parts: Array<string | false | null | undefined>): string => parts.filter(Boolean).join(' ');

export default cx;
