export const NO_IMAGE_URL =
  "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

export function getValidImages(images) {
  if (!Array.isArray(images)) return [];

  return images.filter((image) => {
    if (!image) return false;

    if (typeof image === "string") {
      return image.trim() !== "" && image !== NO_IMAGE_URL;
    }

    const imageUrl = image.url || image.secure_url;

    return Boolean(
      imageUrl && imageUrl.trim() !== "" && imageUrl !== NO_IMAGE_URL
    );
  });
}

export function getImageUrl(image) {
  if (!image) return null;

  if (typeof image === "string") {
    return image;
  }

  return image.url || image.secure_url || null;
}
