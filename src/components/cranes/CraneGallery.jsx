import { useEffect } from "react";

import { NO_IMAGE_URL } from "../../utils/imageHelpers";
import useCraneGalleryZoom from "../../hooks/usCraneGalleryZoom";
import { useAvailableImageUrls } from "../../hooks/useAvailableImageUrls";

import {
  LENS_SIZE,
  HOVER_PREVIEW_SCALE,
} from "../../constants/craneGallery.constants";

import LoadingState from "../ui/LoadingState";
import CraneThumbnails from "./gallery/CraneThumbnails";

function CraneGallery({
  crane,
  selectedImageIndex,
  setSelectedImageIndex,
  onOpenFullView,
}) {
  const { imageUrls, loading: loadingImages } = useAvailableImageUrls(
    crane?.images
  );

  const safeSelectedImageIndex =
    selectedImageIndex < imageUrls.length ? selectedImageIndex : 0;

  const selectedImage = imageUrls[safeSelectedImageIndex];
  const hasSelectedImage = Boolean(selectedImage);

  const {
    imageAreaRef,
    isZoomed,
    zoomPosition,
    lensPosition,
    isPointerOnImage,
    canHoverZoom,
    handleImageLoad,
    handleImageMouseEnter,
    handleImageMouseLeave,
    handleImageMouseMove,
    resetZoom,
  } = useCraneGalleryZoom({
    selectedImageIndex,
    hasSelectedImage,
  });

  useEffect(() => {
    if (!imageUrls.length) return;

    if (selectedImageIndex >= imageUrls.length) {
      setSelectedImageIndex(0);
    }
  }, [imageUrls.length, selectedImageIndex, setSelectedImageIndex]);

  const handleThumbnailSelect = (index) => {
    setSelectedImageIndex(index);
    resetZoom();
  };

  if (loadingImages) {
    return (
      <div className="relative flex min-h-[320px] items-center justify-center bg-white xl:row-span-2 xl:min-h-[520px]">
        <LoadingState
          title="Loading images..."
          message="We are checking the available crane images."
        />
      </div>
    );
  }

  if (!hasSelectedImage) {
    return (
      <div className="relative min-h-[320px] bg-white xl:row-span-2 xl:min-h-0">
        <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 px-4 py-8 text-center">
          <img
            src={NO_IMAGE_URL}
            alt="No image available"
            className="h-40 w-40 object-contain opacity-60"
            draggable="false"
          />

          <p className="text-sm text-gray-400">No image available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white xl:row-span-2 min-h-[320px] xl:min-h-0">
      <div className="h-full flex flex-col gap-4 px-3 pt-3 pb-4 xl:flex-row xl:gap-8 xl:px-6 xl:pb-0">
        {/* Thumbnails */}
        <CraneThumbnails
          imageUrls={imageUrls}
          selectedImageIndex={safeSelectedImageIndex}
          craneTitle={crane?.title || "Crane image"}
          onSelect={handleThumbnailSelect}
          onOpenFullView={onOpenFullView}
        />
        <div className="order-1 min-w-0 flex-1 flex flex-col xl:order-2 xl:justify-center">
          <div
            ref={imageAreaRef}
            className="relative h-[260px] sm:h-[320px] sm:px-4 md:h-[380px] xl:h-[360px] xl:px-8 overflow-hidden bg-white cursor-pointer flex items-center justify-center"
            onMouseEnter={handleImageMouseEnter}
            onMouseLeave={handleImageMouseLeave}
            onMouseMove={handleImageMouseMove}
          >
            {hasSelectedImage ? (
              <img
                src={selectedImage}
                alt={crane.title || "Crane image"}
                onClick={onOpenFullView}
                onLoad={handleImageLoad}
                draggable="false"
                className="h-full w-full cursor-pointer object-contain select-none"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                No image available
              </div>
            )}

            {/* Hover Lens */}
            {hasSelectedImage &&
              canHoverZoom &&
              isZoomed &&
              isPointerOnImage && (
                <div
                  className="pointer-events-none absolute border border-black/20 bg-white/20 shadow-sm hidden xl:block"
                  style={{
                    width: `${LENS_SIZE}px`,
                    height: `${LENS_SIZE}px`,
                    left: `${lensPosition.x}px`,
                    top: `${lensPosition.y}px`,
                  }}
                />
              )}
          </div>
          <button
            type="button"
            onClick={onOpenFullView}
            className="mt-4 self-center cursor-pointer text-sm text-[#007185] hover:text-[#c7511f] hover:underline"
          >
            Click to see full view
          </button>
        </div>

        {/* Zoom Preview */}
        {hasSelectedImage && canHoverZoom && isZoomed && isPointerOnImage && (
          <div className="absolute top-0 left-full ml-4 hidden xl:block z-30 h-full w-[620px] overflow-hidden rounded-lg border border-black/10 bg-white shadow-2xl">
            <div
              className="h-full w-full bg-no-repeat"
              style={{
                backgroundImage: `url(${selectedImage})`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundSize: `${HOVER_PREVIEW_SCALE * 100}%`,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CraneGallery;
