import { FloatingDateInput } from "../ui/form/FloatingFields";

function AvailabilityRange({ field, values, setValues, label }) {
  const startKey = `${field}Start`;
  const endKey = `${field}End`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => {
      const next = {
        ...prev,
        [name]: value,
      };

      if (name === startKey && prev[endKey] && value > prev[endKey]) {
        next[endKey] = "";
      }

      return next;
    });
  };

  return (
    <div className="flex gap-6 my-8 flex-col sm:flex-row">
      <div className="flex-1">
        <FloatingDateInput
          id={startKey}
          name={startKey}
          label={`${label} From`}
          value={values[startKey] || ""}
          onChange={handleChange}
        />
      </div>

      <div className="flex-1">
        <FloatingDateInput
          id={endKey}
          name={endKey}
          label={`${label} To`}
          value={values[endKey] || ""}
          min={values[startKey] || undefined}
          disabled={!values[startKey]}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default AvailabilityRange;
