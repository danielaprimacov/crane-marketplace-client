import { useEffect, useRef, useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";

import Modal from "../Modal";
import { getContainedImageBounds } from "../../utils/helpers";

const FULL_VIEW_ZOOM_SCALE = 2;

function FullViewGalleryModal({
  isOpen,
  onClose,
  crane,
  selectedImageIndex,
  setSelectedImageIndex,
}) {
  // full view
  const [fullViewZoom, setFullViewZoom] = useState(1);
  const [fullViewOrigin, setFullViewOrigin] = useState({ x: 50, y: 50 });

  const [imageMeta, setImageMeta] = useState({ width: 0, height: 0 });

  const fullViewStageRef = useRef(null);

  const selectedImage = crane?.images?.[selectedImageIndex];
  const isFullViewZoomActive = fullViewZoom > 1;

  useEffect(() => {
    setFullViewZoom(1);
    setFullViewOrigin({ x: 50, y: 50 });
  }, [isOpen, selectedImageIndex]);

  const handleImageLoad = (event) => {
    setImageMeta({
      width: event.currentTarget.naturalWidth,
      height: event.currentTarget.naturalHeight,
    });
  };

  const getFullViewPointerPosition = (event) => {
    if (!fullViewStageRef.current) return null;
    if (!imageMeta.width || !imageMeta.height) return null;

    const rect = fullViewStageRef.current.getBoundingClientRect();

    const { visibleWidth, visibleHeight, offsetX, offsetY } =
      getContainedImageBounds(rect, imageMeta.width, imageMeta.height);

    const rawX = event.clientX - rect.left;
    const rawY = event.clientY - rect.top;

    const isInsideVisibleImage =
      rawX >= offsetX &&
      rawX <= offsetX + visibleWidth &&
      rawY >= offsetY &&
      rawY <= offsetY + visibleHeight;

    if (!isInsideVisibleImage) return null;

    return {
      x: ((rawX - offsetX) / visibleWidth) * 100,
      y: ((rawY - offsetY) / visibleHeight) * 100,
    };
  };

  const handleFullViewZoomIn = () => {
    setFullViewZoom(FULL_VIEW_ZOOM_SCALE);
  };

  const handleFullViewZoomOut = () => {
    setFullViewZoom(1);
    setFullViewOrigin({ x: 50, y: 50 });
  };

  const handleFullViewImageClick = (event) => {
    const pointer = getFullViewPointerPosition(event);
    if (!pointer) return;

    if (fullViewZoom > 1) {
      setFullViewZoom(1);
      setFullViewOrigin({ x: 50, y: 50 });
      return;
    }

    setFullViewOrigin(pointer);
    setFullViewZoom(FULL_VIEW_ZOOM_SCALE);
  };

  const handleFullViewMouseMove = (event) => {
    if (fullViewZoom <= 1) return;

    const pointer = getFullViewPointerPosition(event);
    if (!pointer) return;

    setFullViewOrigin(pointer);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      widthClass="w-[95vw] max-w-6xl"
      panelClass="h-[85vh] overflow-hidden"
      contentClass="h-full p-0"
    >
      <div className="grid h-full grid-cols-[1fr_320px]">
        {/* main image */}
        <div
          ref={fullViewStageRef}
          onClick={handleFullViewImageClick}
          onMouseMove={handleFullViewMouseMove}
          className={`relative flex items-center justify-center overflow-hidden p-8 select-none transition-colors duration-200 ${
            fullViewZoom > 1 ? "bg-[#e9eef5]" : "bg-[#f7f7f7]"
          }`}
          style={{ cursor: fullViewZoom > 1 ? "zoom-out" : "zoom-in" }}
        >
          {/* Zoom controls */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-4">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleFullViewZoomIn();
              }}
              className={`flex h-14 w-14 items-center justify-center rounded-full border shadow-md transition ${
                isFullViewZoomActive
                  ? "bg-white border-black/20 text-gray-800 shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
                  : "bg-[#f1f3f5] border-black/15 text-gray-700 hover:bg-[#e9ecef]"
              }`}
              aria-label="Zoom in"
              title="Zoom in"
              disabled={isFullViewZoomActive}
            >
              <ZoomIn className="h-7 w-7" strokeWidth={2.25} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleFullViewZoomOut();
              }}
              className={`flex h-14 w-14 items-center justify-center rounded-full border shadow-md transition ${
                isFullViewZoomActive
                  ? "bg-[#f1f3f5] border-black/15 text-gray-700 hover:bg-[#e9ecef]"
                  : "bg-[#f1f3f5] border-black/15 text-gray-400"
              }`}
              aria-label="Zoom out"
              title="Zoom out"
              disabled={!isFullViewZoomActive}
            >
              <ZoomOut className="h-7 w-7" strokeWidth={2.25} />
            </button>
          </div>

          <img
            src={selectedImage}
            alt={crane.title}
            onLoad={handleImageLoad}
            className="max-h-full max-w-full object-contain select-none transition-transform duration-100 will-change-transform"
            draggable="false"
            style={{
              transform: `scale(${fullViewZoom})`,
              transformOrigin: `${fullViewOrigin.x}% ${fullViewOrigin.y}%`,
            }}
          />
        </div>

        {/* all images */}
        <div className="flex h-full flex-col border-l border-black/10 bg-white p-6">
          <div className="pr-10">
            <h2 className="text-2xl font-semibold leading-tight text-gray-900">
              {crane.title}
            </h2>

            {crane.producer && (
              <p className="mt-2 text-sm text-gray-500">{crane.producer}</p>
            )}
          </div>

          <div className="mt-6 grid grid-cols-4 gap-3 content-start overflow-y-auto">
            {crane.images?.map((image, i) => (
              <button
                key={`${image}-${i}`}
                type="button"
                onClick={() => setSelectedImageIndex(i)}
                className={`relative aspect-square overflow-hidden cursor-pointer rounded border transition ${
                  selectedImageIndex === i
                    ? "border-sky-500 ring-1 ring-sky-300"
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
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default FullViewGalleryModal;
