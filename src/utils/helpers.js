export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")     // spaces → hyphens
    .replace(/[^\w-]/g, "");  // strip non-word chars
}