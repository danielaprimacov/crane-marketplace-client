import { ChevronDown } from "lucide-react";

function CraneMetaFields({ form, updateField }) {
  return (
    <>
      <div className="relative mb-8">
        <input
          id="description"
          name="description"
          type="text"
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder=" "
          className="peer block w-full h-10 bg-transparent border-b border-b-black/20 focus:outline-none focus:border-black transition"
        />
        <label
          htmlFor="description"
          className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
        >
          Description
        </label>
      </div>

      <div className="relative mb-8">
        <input
          id="location"
          name="location"
          type="text"
          value={form.location}
          onChange={(e) => updateField("location", e.target.value)}
          required
          placeholder=" "
          className="peer block w-full h-10 bg-transparent border-b border-b-black/20 focus:outline-none focus:border-black transition"
        />
        <label
          htmlFor="location"
          className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
        >
          Location
        </label>
      </div>

      <div className="relative mb-8">
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={(e) => updateField("status", e.target.value)}
          required
          className="peer block w-full h-11 appearance-none bg-transparent border-b border-b-black/20 pr-10 focus:outline-none focus:border-black"
        >
          <option value="" disabled>
            -- Select Status --
          </option>
          <option value="for sale">For Sale</option>
          <option value="for rent">For Rent</option>
        </select>
        <label
          htmlFor="status"
          className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-focus:-top-6 peer-focus:text-base"
        >
          Status
        </label>
        <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-gray-500">
          <ChevronDown className="h-4 w-4" />
        </span>
      </div>
    </>
  );
}

export default CraneMetaFields;
