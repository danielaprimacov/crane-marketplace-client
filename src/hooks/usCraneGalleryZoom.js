import { useEffect, useRef, useState } from "react";

import { getContainedImageBounds } from "../utils/helpers";
import { LENS_SIZE } from "../constants/craneGallery.constants";

function useCraneGalleryZoom({ selectedImageIndex, hasSelectedImage }) {
  const imageAreaRef = useRef(null);

  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [imageMeta, setImageMeta] = useState({ width: 0, height: 0 });
  const [isPointerOnImage, setIsPointerOnImage] = useState(false);
  const [canHoverZoom, setCanHoverZoom] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const handler = (event) => {
      setCanHoverZoom(event.matches);
    };

    setCanHoverZoom(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
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

  const resetZoom = () => {
    setIsZoomed(false);
    setIsPointerOnImage(false);
  };

  return {
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
  };
}

export default useCraneGalleryZoom;
