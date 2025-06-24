function AvailabilityRange({ field, values, setValues, label }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const startKey = `${field}Start`;
  const endKey = `${field}End`;

  return (
    <div className="availability-range">
      <label htmlFor={startKey}>{label} From:</label>
      <input
        type="date"
        id={startKey}
        name={startKey}
        value={values[startKey] || ""}
        onChange={handleChange}
      />

      <label htmlFor={endKey}>{label} To:</label>
      <input
        type="date"
        id={endKey}
        name={endKey}
        value={values[endKey] || ""}
        min={values[startKey] || undefined}
        disabled={!values[startKey]}
        onChange={handleChange}
      />
    </div>
  );
}

export default AvailabilityRange;
