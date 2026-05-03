import { useEffect, useRef, useState } from "react";
import { getContainedImageBounds } from "../../utils/helpers";

import { NO_IMAGE_URL } from "../../utils/imageHelpers";
import { useAvailableImageUrls } from "../../hooks/useAvailableImageUrls";

const LENS_SIZE = 140;
const HOVER_PREVIEW_SCALE = 2;

function CraneGallery({
  crane,
  selectedImageIndex,
  setSelectedImageIndex,
  onOpenFullView,
}) {
  // zoom states
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [imageMeta, setImageMeta] = useState({ width: 0, height: 0 });
  const [isPointerOnImage, setIsPointerOnImage] = useState(false);
  const [canHoverZoom, setCanHoverZoom] = useState(false);

  const imageAreaRef = useRef(null);

  const { imageUrls, loading: loadingImages } = useAvailableImageUrls(
    crane?.images
  );

  const selectedImage = imageUrls[selectedImageIndex];
  const hasSelectedImage = Boolean(selectedImage);

  useEffect(() => {
    if (!imageUrls.length) return;

    if (selectedImageIndex >= imageUrls.length) {
      setSelectedImageIndex(0);
    }
  }, [imageUrls.length, selectedImageIndex, setSelectedImageIndex]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const handler = (event) => setCanHoverZoom(event.matches);

    setCanHoverZoom(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    setZoomPosition({ x: 50, y: 50 });
    setLensPosition({ x: 0, y: 0 });
    setIsZoomed(false);
    setIsPointerOnImage(false);
  }, [selectedImageIndex]);

  const handleImageLoad = (event) => {
    setImageMeta({
      width: event.currentTarget.naturalWidth,
      height: event.currentTarget.naturalHeight,
    });
  };

  const handleImageMouseEnter = () => {
    if (!canHoverZoom || !hasSelectedImage) return;
    setIsZoomed(true);
    setIsPointerOnImage(false);
  };

  const handleImageMouseLeave = () => {
    if (!canHoverZoom) return;
    setIsZoomed(false);
    setIsPointerOnImage(false);
  };

  const handleImageMouseMove = (event) => {
    if (!canHoverZoom || !hasSelectedImage) return;
    if (!imageAreaRef.current) return;
    if (!imageMeta.width || !imageMeta.height) return;

    const containerRect = imageAreaRef.current.getBoundingClientRect();

    const bounds = getContainedImageBounds(
      containerRect,
      imageMeta.width,
      imageMeta.height
    );

    if (!bounds) return;

    const { visibleWidth, visibleHeight, offsetX, offsetY } = bounds;

    const rawX = event.clientX - containerRect.left;
    const rawY = event.clientY - containerRect.top;

    const isInsideVisibleImage =
      rawX >= offsetX &&
      rawX <= offsetX + visibleWidth &&
      rawY >= offsetY &&
      rawY <= offsetY + visibleHeight;

    setIsPointerOnImage(isInsideVisibleImage);

    if (!isInsideVisibleImage) return;

    const percentX = ((rawX - offsetX) / visibleWidth) * 100;
    const percentY = ((rawY - offsetY) / visibleHeight) * 100;

    const halfLens = LENS_SIZE / 2;

    const lensCenterX = Math.max(
      offsetX + halfLens,
      Math.min(offsetX + visibleWidth - halfLens, rawX)
    );

    const lensCenterY = Math.max(
      offsetY + halfLens,
      Math.min(offsetY + visibleHeight - halfLens, rawY)
    );

    setZoomPosition({
      x: Math.max(0, Math.min(100, percentX)),
      y: Math.max(0, Math.min(100, percentY)),
    });

    setLensPosition({
      x: lensCenterX - halfLens,
      y: lensCenterY - halfLens,
    });
  };

  const handleThumbnailHover = (index) => {
    setSelectedImageIndex(index);
    setIsZoomed(false);
    setIsPointerOnImage(false);
  };

  if (loadingImages) {
    return (
      <div className="flex min-h-[320px] items-center justify-center bg-white text-gray-400">
        Loading images…
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
        <div className="order-2 flex w-full gap-3 overflow-x-auto px-1 pb-1 xl:order-1 xl:w-[62px] xl:flex-col xl:overflow-y-auto xl:overflow-x-hidden">
          {imageUrls.slice(0, 5).map((image, i) => {
            return (
              <button
                key={`${image}-${i}`}
                type="button"
                onMouseEnter={() => handleThumbnailHover(i)}
                onClick={() => handleThumbnailHover(i)}
                className={`relative h-[56px] w-[56px] shrink-0 overflow-hidden rounded-lg border transition ${
                  selectedImageIndex === i
                    ? "border-blue-500 ring-1 ring-blue-300"
                    : "border-black/10 hover:border-black/30"
                }`}
              >
                <img
                  src={image}
                  alt={`${crane.title} ${i + 1}`}
                  className="h-full w-full object-cover"
                  draggable="false"
                />
              </button>
            );
          })}

          {imageUrls.length > 5 && (
            <button
              type="button"
              onClick={onOpenFullView}
              className="h-[56px] w-[56px] shrink-0 rounded-lg border border-black/10 bg-gray-50 text-xl font-medium text-gray-600 hover:bg-gray-100 transition"
            >
              {" "}
              +{imageUrls.length - 5}
            </button>
          )}
        </div>
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
                alt={crane.title}
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
