import { useEffect, useMemo, useState } from "react";

import { getImageUrl, getValidImages } from "../utils/imageHelpers";

export function useAvailableImageUrls(images) {
  const imageUrls = useMemo(() => {
    return getValidImages(images).map(getImageUrl).filter(Boolean);
  }, [images]);

  const [availableUrls, setAvailableUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const checkImages = async () => {
      setLoading(true);

      if (!imageUrls.length) {
        setAvailableUrls([]);
        setLoading(false);
        return;
      }

      const results = await Promise.all(
        imageUrls.map(
          (url) =>
            new Promise((resolve) => {
              const img = new Image();

              img.onload = () => resolve(url);
              img.onerror = () => resolve(null);

              img.src = url;
            })
        )
      );

      if (!cancelled) {
        setAvailableUrls(results.filter(Boolean));
        setLoading(false);
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
