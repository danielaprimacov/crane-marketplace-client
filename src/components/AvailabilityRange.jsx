function AvailabilityRange({ field, values, setValues, label }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const startKey = `${field}Start`;
  const endKey = `${field}End`;

  return (
    <div className="flex gap-6 my-8">
      <div className="relative flex-1">
        <input
          type="date"
          id={startKey}
          name={startKey}
          value={values[startKey] || ""}
          onChange={handleChange}
          placeholder=" "
          className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-0 focus:outline-none focus:border-black transition"
        />
        <label
          htmlFor={startKey}
          className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
        >
          {label} From
        </label>
      </div>

      <div className="relative flex-1">
        <input
          type="date"
          id={endKey}
          name={endKey}
          value={values[endKey] || ""}
          min={values[startKey] || undefined}
          disabled={!values[startKey]}
          onChange={handleChange}
          placeholder=" "
          className="peer block w-full h-10 bg-transparent border-b border-b-black/20 mb-0 focus:outline-none focus:border-black transition disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <label
          htmlFor={endKey}
          className="absolute left-0 -top-6 text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-focus:-top-6"
        >
          {label} To
        </label>
      </div>
    </div>
  );
}

export default AvailabilityRange;
