export function slugify(str) {
  return (
    str
      .toString()
      .trim()
      .toLowerCase()
      // turn spaces, slashes, etc into hyphens
      .replace(/[^a-z0-9]+/g, "-")
      // collapse multiple hyphens
      .replace(/-+/g, "-")
      // remove leading/trailing hyphens
      .replace(/^-|-$/g, "")
  );
}

export function formatPrice(value) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value ?? 0);
}

export function getMinMax(items, getter) {
  if (!items.length) return [0, 0];
  const values = items.map(getter).filter((v) => typeof v === "number");
  if (!values.length) return [0, 0];
  return [Math.min(...values), Math.max(...values)];
}

export function getContainedImageBounds(rect, imageWidth, imageHeight) {
  const containerWidth = rect.width;
  const containerHeight = rect.height;

  const imageRatio = imageWidth / imageHeight;
  const containerRatio = containerWidth / containerHeight;

  let visibleWidth;
  let visibleHeight;
  let offsetX;
  let offsetY;

  if (imageRatio > containerRatio) {
    visibleWidth = containerWidth;
    visibleHeight = containerWidth / imageRatio;
    offsetX = 0;
    offsetY = (containerHeight - visibleHeight) / 2;
  } else {
    visibleHeight = containerHeight;
    visibleWidth = containerHeight * imageRatio;
    offsetY = 0;
    offsetX = (containerWidth - visibleWidth) / 2;
  }

  return { visibleWidth, visibleHeight, offsetX, offsetY };
}
