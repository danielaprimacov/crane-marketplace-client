import { useEffect, useRef, useState } from "react";

import { getContainedImageBounds } from "../../utils/helpers";

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

  const imageAreaRef = useRef(null);

  const selectedImage = crane?.images?.[selectedImageIndex];

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
    setIsZoomed(true);
  };

  const handleImageMouseLeave = () => {
    setIsZoomed(false);
    setIsPointerOnImage(false);
  };

  const handleImageMouseMove = (event) => {
    if (!imageAreaRef.current) return;
    if (!imageMeta.width || !imageMeta.height) return;

    const rect = imageAreaRef.current.getBoundingClientRect();

    const { visibleWidth, visibleHeight, offsetX, offsetY } =
      getContainedImageBounds(rect, imageMeta.width, imageMeta.height);

    const rawX = event.clientX - rect.left;
    const rawY = event.clientY - rect.top;

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

  return (
    <div className="relative bg-white lg:row-span-2 min-h-[320px] lg:min-h-0">
      {crane.images?.length ? (
        <div className="flex h-full gap-3 px-3 pt-3 pb-4">
          {/* Thumbnails */}
          <div className="w-[56px] shrink-0 flex flex-col gap-3 overflow-y-auto px-1">
            {crane.images.slice(0, 5).map((image, i) => (
              <button
                key={`${image}-${i}`}
                type="button"
                onMouseEnter={() => handleThumbnailHover(i)}
                onClick={() => handleThumbnailHover(i)}
                className={`relative h-[48px] w-[48px] cursor-pointer overflow-hidden rounded-lg border transition ${
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
            ))}

            {crane.images.length > 5 && (
              <button
                type="button"
                onClick={onOpenFullView}
                className="h-[48px] w-[48px] rounded-lg border border-black/10 bg-gray-50 text-xl font-medium text-gray-600 hover:bg-gray-100 transition"
              >
                {" "}
                +{crane.images.length - 5}
              </button>
            )}
          </div>
          <div className="min-w-0 flex-1 flex flex-col">
            <div
              ref={imageAreaRef}
              className="relative min-h-0 flex-1 overflow-hidden bg-white cursor-pointer"
              onMouseEnter={handleImageMouseEnter}
              onMouseLeave={handleImageMouseLeave}
              onMouseMove={handleImageMouseMove}
            >
              <img
                src={selectedImage}
                alt={crane.title}
                onClick={onOpenFullView}
                onLoad={handleImageLoad}
                draggable="false"
                className="absolute inset-0 w-full h-full object-contain select-none"
              />

              {/* Hover Lens */}
              {isZoomed && isPointerOnImage && (
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
              className="mt-3 self-center cursor-pointer text-sm text-[#007185] hover:text-[#c7511f] hover:underline"
            >
              Click to see full view
            </button>
          </div>

          {/* Zoom Preview */}
          {isZoomed && isPointerOnImage && (
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
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          No image available
        </div>
      )}
    </div>
  );
}

export default CraneGallery;
