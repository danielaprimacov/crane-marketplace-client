import { MAX_VISIBLE_THUMBNAILS } from "../../../constants/craneGallery.constants";

function CraneThumbnails(
  imageUrls = [],
  selectedImageIndex = 0,
  craneTitle = "Crane image",
  onSelect = () => {},
  onOpenFullView = () => {}
) {
  const safeImageUrls = Array.isArray(imageUrls) ? imageUrls : [];

  const visibleImages = safeImageUrls.slice(0, MAX_VISIBLE_THUMBNAILS);
  const hiddenImagesCount = Math.max(
    0,
    safeImageUrls.length - MAX_VISIBLE_THUMBNAILS
  );

  return (
    <div className="order-2 flex w-full gap-3 overflow-x-auto px-1 pb-1 xl:order-1 xl:w-[62px] xl:flex-col xl:overflow-y-auto xl:overflow-x-hidden">
      {visibleImages.map((image, index) => {
        const isActive = selectedImageIndex === index;

        return (
          <button
            key={`${image}-${index}`}
            type="button"
            onMouseEnter={() => onSelect(index)}
            onClick={() => onSelect(index)}
            className={`relative h-[56px] w-[56px] shrink-0 overflow-hidden rounded-lg border transition ${
              isActive
                ? "border-blue-500 ring-1 ring-blue-300"
                : "border-black/10 hover:border-black/30"
            }`}
          >
            <img
              src={image}
              alt={`${craneTitle || "Crane image"} ${index + 1}`}
              className="h-full w-full object-cover"
              draggable="false"
            />
          </button>
        );
      })}

      {hiddenImagesCount > 0 && (
        <button
          type="button"
          onClick={onOpenFullView}
          className="h-[56px] w-[56px] shrink-0 rounded-lg border border-black/10 bg-gray-50 text-xl font-medium text-gray-600 hover:bg-gray-100 transition"
        >
          <span>+{hiddenImagesCount}</span>
        </button>
      )}
    </div>
  );
}

export default CraneThumbnails;
