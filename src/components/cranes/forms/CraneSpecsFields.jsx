function CraneSpecsFields({ form, updateField }) {
  return (
    <>
      <div className="flex gap-6">
        {/* Producer */}
        <div className="relative flex-1">
          <input
            id="producer"
            name="producer"
            type="text"
            value={form.producer}
            onChange={(e) => updateField("producer", e.target.value)}
            required
            placeholder=" "
            className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black transition"
          />
          <label
            htmlFor="producer"
            className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
          >
            Producer
          </label>
        </div>

        {/* Series Code */}
        <div className="relative flex-1">
          <input
            id="seriesCode"
            name="seriesCode"
            type="text"
            value={form.seriesCode}
            onChange={(e) => updateField("seriesCode", e.target.value)}
            required
            placeholder=" "
            className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black transition"
          />
          <label
            htmlFor="seriesCode"
            className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
          >
            Series Code
          </label>
        </div>
      </div>
      <div className="flex gap-6">
        {/* class capacity */}
        <div className="relative flex-1">
          <input
            id="capacityClassNumber"
            name="capacityClassNumber"
            type="number"
            min={0}
            value={form.capacityClassNumber}
            onChange={(e) => updateField("capacityClassNumber", e.target.value)}
            required
            placeholder=" "
            className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black transition"
          />
          <label
            htmlFor="capacityClassNumber"
            className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
          >
            Class Capacity (t)
          </label>
        </div>

        {/* max capacity */}
        <div className="relative flex-1">
          <input
            id="capacity"
            name="capacity"
            type="number"
            step="0.1"
            value={form.capacity}
            onChange={(e) => updateField("capacity", e.target.value)}
            placeholder=" "
            className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black transition"
          />
          <label
            htmlFor="capacity"
            className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
          >
            Max Capacity (t)
          </label>
        </div>
      </div>

      {/* ── Next, height stays full width ── */}
      <div className="relative">
        <input
          id="height"
          name="height"
          type="number"
          step="0.1"
          value={form.height}
          onChange={(e) => updateField("height", e.target.value)}
          required
          placeholder=" "
          className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black transition"
        />
        <label
          htmlFor="height"
          className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
        >
          Max Height (m)
        </label>
      </div>

      {/* ── Now Variant + Max Radius side by side ── */}
      <div className="flex gap-6">
        {/* variant revision */}
        <div className="relative flex-1">
          <input
            id="variantRevision"
            name="variantRevision"
            type="text"
            value={form.variantRevision}
            onChange={(e) => updateField("variantRevision", e.target.value)}
            placeholder=" "
            className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black transition"
          />
          <label
            htmlFor="variantRevision"
            className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
          >
            Variant / Revision
          </label>
        </div>

        {/* max radius */}
        <div className="relative flex-1">
          <input
            id="radius"
            name="radius"
            type="number"
            step="0.1"
            value={form.radius}
            onChange={(e) => updateField("radius", e.target.value)}
            required
            placeholder=" "
            className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black transition"
          />
          <label
            htmlFor="radius"
            className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
          >
            Max Radius (m)
          </label>
        </div>
      </div>
    </>
  );
}

export default CraneSpecsFields;
