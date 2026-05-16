import { getImageUrl } from "../../../utils/craneHelpers";

function CraneImageUploadField({
  images = [],
  uploading,
  onFileChange,
  onRemoveImage,
}) {
  const safeImages = Array.isArray(images) ? images : [];

  return (
    <div className="mb-8">
      {/* Input + floating label */}
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="w-full sm:w-auto">
          <input
            id="imageFile"
            name="imageFile"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            disabled={uploading}
            className="hidden"
          />
          <label
            htmlFor="imageFile"
            className={`w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer hover:bg-red-500 transition ${
              uploading
                ? "cursor-not-allowed bg-gray-400"
                : "cursor-pointer bg-red-600 hover:bg-red-500"
            }`}
          >
            {uploading ? "Uploading…" : "Upload Image"}
          </label>
        </div>
      </div>
      {safeImages.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {safeImages.map((image, index) => {
            const imageUrl =
              typeof image === "string"
                ? image
                : image?.url ||
                  image?.secure_url ||
                  getImageUrl({ images: [image] });

            if (!imageUrl) return null;

            return (
              <div
                key={`${imageUrl}-${index}`}
                className="group relative overflow-hidden rounded-lg border border-black/10"
              >
                <img
                  src={imageUrl}
                  alt={`Crane ${index + 1}`}
                  className="h-28 w-full object-cover sm:h-32"
                />

                {onRemoveImage && (
                  <button
                    type="button"
                    onClick={() => onRemoveImage(index)}
                    className="absolute right-2 top-2 rounded bg-black/70 px-2 py-1 text-xs text-white cursor-pointer opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100"
                  >
                    Remove
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CraneImageUploadField;
