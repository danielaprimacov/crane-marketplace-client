function CraneImageUploadField({ images, uploading, onFileChange }) {
  return (
    <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
      {/* Input + floating label */}
      <div className="relative w-full sm:w-auto">
        <input
          id="imageFile"
          name="imageFile"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          disabled={uploading}
          className="peer block w-full h-10 bg-transparent border-b border-b-black/20 focus:outline-none focus:border-black transition hidden"
        />
        <label
          htmlFor="imageFile"
          className="w-full sm:auto inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer hover:bg-red-500 transition"
        >
          {uploading ? "Uploading…" : "Upload Image"}
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Crane ${i}`}
            className="w-16 h-16 sm:h-20 sm:w-20 object-cover rounded"
          />
        ))}
      </div>
    </div>
  );
}

export default CraneImageUploadField;
