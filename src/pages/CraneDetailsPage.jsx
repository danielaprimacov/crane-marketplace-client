import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { ZoomIn, ZoomOut } from "lucide-react";

import { AuthContext } from "../context/auth.context";

import Modal from "../components/Modal";
import InfoRow from "../components/InfoRow";

import goBackIcon from "../assets/icons/angle-double-small-left.png";

const API_URL = import.meta.env.VITE_API_URL;
const LENS_SIZE = 140;
const FULL_VIEW_ZOOM_SCALE = 2;

function CraneDetailsPage() {
  const [crane, setCrane] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);

  // zoom states
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [imageMeta, setImageMeta] = useState({ width: 0, height: 0 });

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPointerOnImage, setIsPointerOnImage] = useState(false);

  // full view
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);
  const [fullViewZoom, setFullViewZoom] = useState(1);
  const [fullViewOrigin, setFullViewOrigin] = useState({ x: 50, y: 50 });

  const fullViewStageRef = useRef(null);

  const imageAreaRef = useRef(null);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { craneId } = useParams();

  const selectedImage = crane?.images?.[selectedImageIndex];

  const getCrane = async () => {
    try {
      const response = await axios.get(`${API_URL}/cranes/${craneId}`);

      setCrane(response.data);
    } catch (error) {
      console.error("Failed to fetch crane:", error);
    }
  };

  useEffect(() => {
    getCrane();
  }, [craneId]);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [craneId]);

  useEffect(() => {
    setZoomPosition({ x: 50, y: 50 });
    setLensPosition({ x: 0, y: 0 });
    setIsZoomed(false);
    setIsPointerOnImage(false);
  }, [selectedImageIndex]);

  useEffect(() => {
    setFullViewZoom(1);
    setFullViewOrigin({ x: 50, y: 50 });
  }, [isFullViewOpen, selectedImageIndex]);

  if (!crane) return <p>Loading…</p>;

  const ownerId =
    typeof crane.owner === "string" ? crane.owner : crane.owner._id;

  const isOwner = user && user._id === ownerId;

  const handleDelete = async () => {
    setConfirmOpen(false);
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`${API_URL}/cranes/${craneId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/cranes/my-cranes");
    } catch (error) {
      console.error("Failed to delete crane:", error);
    }
  };

  const handleDeleteClick = () => setConfirmOpen(true);

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

    const containerWidth = rect.width;
    const containerHeight = rect.height;

    const imageRatio = imageMeta.width / imageMeta.height;
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

  const getFullViewPointerPosition = (event) => {
    if (!fullViewStageRef.current) return null;
    if (!imageMeta.width || !imageMeta.height) return null;

    const rect = fullViewStageRef.current.getBoundingClientRect();

    const containerWidth = rect.width;
    const containerHeight = rect.height;

    const imageRatio = imageMeta.width / imageMeta.height;
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

  const isFullViewZoomActive = fullViewZoom > 1;

  return (
    <div className="mt-20 mb-8 max-w-7xl mx-auto px-4">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-gray-600 hover:text-gray-900 cursor-pointer"
      >
        <img src={goBackIcon} alt="back" className="w-5 mr-2" />
        Back
      </button>

      {/* Main Card */}
      <div className="mt-8 relative">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden xl:overflow-visible lg:h-[480px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[1fr_auto] h-full">
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
                        onClick={() => setIsFullViewOpen(true)}
                        className="h-[48px] w-[48px] rounded-xl border border-black/10 bg-gray-50 text-xl font-medium text-gray-600 hover:bg-gray-100 transition"
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
                        onClick={() => setIsFullViewOpen(true)}
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
                      onClick={() => setIsFullViewOpen(true)}
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
                          backgroundSize: `${FULL_VIEW_ZOOM_SCALE * 100}%`,
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
            {/* Details */}
            <div className="px-6 pt-2 flex flex-col col-start-2 min-h-0 overflow-hidden lg:col-start-2 lg:row-start-1">
              <div className="flex justify-between items-start gap-4 flex-wrap">
                <div>
                  <h1 className="text-2xl font-bold">{crane.title}</h1>
                  <h2 className="text-gray-500 mt-1">{crane.producer}</h2>
                </div>

                <div className="text-right space-y-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mr-3 ${
                      crane.status === "for sale"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {crane.status.replace(/(^|\s)\S/g, (l) => l.toUpperCase())}
                  </span>

                  <span className="inline-block px-3 py-1 bg-black text-white rounded-md font-medium">
                    {crane.status === "for sale" && crane.salePrice != null
                      ? `${crane.salePrice} €`
                      : crane.status === "for rent" &&
                        crane.rentPrice?.amount != null
                      ? `${crane.rentPrice.amount} €/${crane.rentPrice.interval}`
                      : "Contact for price"}
                  </span>
                </div>
              </div>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 mt-6 text-sm text-gray-600">
                {[
                  ["Class Cap. (t)", crane.capacityClassNumber],
                  ["Max Cap. (t)", crane.capacity],
                  ["Max Hgt. (m)", crane.height],
                  ["Max Rng. (m)", crane.radius],
                  ["Variant", crane.variantRevision || "–"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="uppercase tracking-wide">{label}</dt>
                    <dd className="font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 min-h-0 overflow-y-auto pr-2">
                <p className=" text-gray-700 leading-relaxed">
                  {crane.description}
                </p>
              </div>
            </div>

            <div className="px-5 pb-8 lg:col-start-2 lg:row-start-2">
              <div className="pt-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <dl className="space-y-3">
                    <InfoRow label="Location:">
                      {crane.location || "Not set"}
                    </InfoRow>
                    <InfoRow label="Available:">
                      {crane.availability?.from && crane.availability?.to
                        ? `${new Date(
                            crane.availability.from
                          ).toLocaleDateString()} – ${new Date(
                            crane.availability.to
                          ).toLocaleDateString()}`
                        : "Not set"}
                    </InfoRow>
                  </dl>

                  {(!user || user.role !== "admin") && !isOwner && (
                    <Link
                      to={`/cranes/${craneId}/new-inquiry`}
                      replace
                      className="bg-orange-500 text-lg text-white py-1 px-4 cursor-pointer rounded hover:bg-orange-400 transition inline-flex items-center justify-center"
                    >
                      Send Inquiry
                    </Link>
                  )}
                </div>
              </div>

              {(user?.role === "admin" || isOwner) && (
                <div className="mt-8 flex gap-4">
                  <Link
                    to={`/cranes/edit/${craneId}`}
                    className="flex-1 bg-green-600 text-white py-2 text-center rounded hover:bg-green-500 transition"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={handleDeleteClick}
                    className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-500 transition"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Delete Crane?</h2>
        <p className="mb-6">
          Are you sure you want to delete this crane? This cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setConfirmOpen(false)}
            className="px-4 py-2 border rounded cursor-pointer hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer hover:bg-red-500 transition"
          >
            Yes, delete
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={isFullViewOpen}
        onClose={() => setIsFullViewOpen(false)}
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
    </div>
  );
}

export default CraneDetailsPage;
