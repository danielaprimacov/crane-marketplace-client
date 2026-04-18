function CranePricingFields({ form, updateField }) {
  if (form.status === "for sale") {
    return (
      <div className="relative">
        <input
          id="salePrice"
          name="salePrice"
          type="number"
          min={0}
          value={form.salePrice}
          onChange={(e) => updateField("salePrice", e.target.value)}
          required
          placeholder=" "
          className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black"
        />
        <label
          htmlFor="salePrice"
          className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
        >
          Sale Price (€)
        </label>
      </div>
    );
  }

  if (form.status === "for rent") {
    return (
      <>
        <div className="relative">
          <input
            id="rentAmount"
            name="rentAmount"
            type="number"
            min={0}
            value={form.rentAmount}
            onChange={(e) => updateField("rentAmount", e.target.value)}
            required
            placeholder=" "
            className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black"
          />
          <label
            htmlFor="rentAmount"
            className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
          >
            Rent Amount (€)
          </label>
        </div>

        <div className="relative">
          <select
            id="rentInterval"
            name="rentInterval"
            value={form.rentInterval}
            onChange={(e) => updateField("rentInterval", e.target.value)}
            required
            className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-8 focus:outline-none focus:border-black"
          >
            <option value="" disabled>
              -- Interval --
            </option>
            <option value="hour">Hour</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
          <label
            htmlFor="rentInterval"
            className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-focus:-top-6 peer-focus:text-base"
          >
            Interval
          </label>
        </div>
      </>
    );
  }
}

export default CranePricingFields;
