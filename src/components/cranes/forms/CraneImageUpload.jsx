function CraneImageUploadField({ images, uploading, onFileChange }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      {/* Input + floating label */}
      <div className="relative flex-1">
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
          className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer hover:bg-red-500 transition"
        >
          {uploading ? "Uploading…" : "Upload Image"}
        </label>
      </div>

      <div className="flex gap-2 mb-4">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Crane ${i}`}
            className="w-20 h-20 object-cover"
          />
        ))}
      </div>
    </div>
  );
}

export default CraneImageUploadField;
