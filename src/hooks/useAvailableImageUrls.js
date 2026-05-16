import { useEffect, useMemo, useState } from "react";

import { getImageUrl, getValidImages } from "../utils/imageHelpers";

const IMAGE_CHECK_TIMEOUT_MS = 5000;

function getUniqueImageUrls(images) {
  const urls = getValidImages(images).map(getImageUrl).filter(Boolean);

  return Array.from(new Set(urls));
}

function checkImageUrl(url) {
  return new Promise((resolve) => {
    const image = new Image();

    const timeoutId = window.setTimeout(() => {
      cleanup();
      resolve(null);
    }, IMAGE_CHECK_TIMEOUT_MS);

    const cleanup = () => {
      window.clearTimeout(timeoutId);
      image.onload = null;
      image.onerror = null;
    };

    image.onload = () => {
      cleanup();
      resolve(url);
    };

    image.onerror = () => {
      cleanup();
      resolve(null);
    };

    image.src = url;
  });
}

export function useAvailableImageUrls(images) {
  const imageUrls = useMemo(() => getUniqueImageUrls(images), [images]);

  const [availableUrls, setAvailableUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const checkImages = async () => {
      if (imageUrls.length === 0) {
        setAvailableUrls([]);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const results = await Promise.all(imageUrls.map(checkImageUrl));

        if (!cancelled) {
          setAvailableUrls(results.filter(Boolean));
        }
      } catch (error) {
        console.error("Failed to check image URLs:", error);

        if (!cancelled) {
          setAvailableUrls([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    checkImages();

    return () => {
      cancelled = true;
    };
  }, [imageUrls]);

  return {
    imageUrls: availableUrls,
    loading,
  };
}
