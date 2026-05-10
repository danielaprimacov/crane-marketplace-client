export function getCraneId(crane) {
  return crane?.id || crane?._id || null;
}

export function getImageUrl(crane) {
  if (!Array.isArray(crane?.images) || crane.images.length === 0) {
    return null;
  }

  const firstImage = crane.images[0];

  if (typeof firstImage === "string") {
    return firstImage;
  }

  return firstImage?.url || firstImage?.secure_url || null;
}

export function getOwnerId(crane) {
  if (!crane?.owner) return null;

  if (typeof crane.owner === "string") {
    return crane.owner;
  }

  return crane.owner.id || crane.owner._id || null;
}

export function getCraneModel(crane) {
  return [
    crane?.seriesCode,
    crane?.capacityClassNumber ? `${crane.capacityClassNumber}t` : "",
    crane?.variantRevision?.trim(),
  ]
    .filter(Boolean)
    .join(" ");
}
