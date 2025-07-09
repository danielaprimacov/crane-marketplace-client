export function slugify(str) {
  return (
    str
      .toString()
      .toLowerCase()
      // turn spaces, slashes, etc into hyphens
      .replace(/[^a-z0-9]+/g, "-")
      // collapse multiple hyphens
      .replace(/-+/g, "-")
      // remove leading/trailing hyphens
      .replace(/^-|-$/g, "")
  );
}
